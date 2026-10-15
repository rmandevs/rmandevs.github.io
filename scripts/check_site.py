"""Check the generated multilingual site before deploying (stdlib only)."""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.refs, self.ids = [], set()
        self.canonical = None
        self.headings = 0
        self.redirect = False
        self.lang = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'html':
            self.lang = attrs.get('lang')
        if tag == 'h1':
            self.headings += 1
        if tag == 'meta' and attrs.get('http-equiv', '').lower() == 'refresh':
            self.redirect = True
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        for key in ('href', 'src'):
            if attrs.get(key):
                self.refs.append(attrs[key])

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'public').resolve()
pages = {p: Page(p.read_text()) for p in root.rglob('*.html')}
assert root / 'index.html' in pages, 'Build the site first'
base = pages[root / 'index.html'].canonical
assert base, 'Missing home canonical URL'
site = urlsplit(base)
failures = []
refs_checked = 0

def resolve(url):
    path = unquote(urlsplit(url).path)
    if not path.startswith(site.path):
        failures.append(f'URL escapes the site base path: {url}')
        return None
    target = root / path[len(site.path):]
    return target / 'index.html' if target.is_dir() else target

for path, page in pages.items():
    if page.redirect:
        continue
    label = path.relative_to(root)
    text = path.read_text()
    if 'mr-lk-lf' in text:
        failures.append(f'{label}: stale GitHub username')
    if page.headings != 1 or page.lang not in ('en', 'es'):
        failures.append(f'{label}: expected one h1 and en/es language')
    if not page.canonical:
        failures.append(f'{label}: missing canonical')
        continue
    for ref in page.refs:
        url = urljoin(page.canonical, ref)
        parts = urlsplit(url)
        if parts.netloc != site.netloc or parts.scheme not in ('http', 'https'):
            continue
        target = resolve(url)
        refs_checked += 1
        if not target or not target.is_file():
            failures.append(f'{label}: missing {ref}')
        elif parts.fragment and target in pages and unquote(parts.fragment) not in pages[target].ids:
            failures.append(f'{label}: missing anchor {ref}')

for path in root.rglob('*.css'):
    css_url = urljoin(base, str(path.relative_to(root)))
    for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)', path.read_text()):
        url = urljoin(css_url, ref)
        if urlsplit(url).netloc == site.netloc:
            target = resolve(url)
            refs_checked += 1
            if not target or not target.is_file():
                failures.append(f'{path.name}: missing font/asset {ref}')

projects = ['comfytosh', 'isometric-illustrations', 'lazy-c7n', 'vigia', 'pnpm-supply-chain-hardening-skill']
for prefix in ('', 'es/'):
    for name in projects:
        path = root / prefix / 'projects' / name / 'index.html'
        if path not in pages or f'https://github.com/rmandevs/{name}' not in path.read_text():
            failures.append(f'{prefix}{name}: missing project or current source link')

if failures:
    raise SystemExit('\n'.join(failures))
print(f'Passed: {len(pages)} HTML pages, {refs_checked} internal links/assets, all 5 projects in both languages.')
