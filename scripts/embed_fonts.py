"""Embed licensed Timeless fonts into the site's stylesheet at build time.

The original font files and generated stylesheet stay outside Git history.
Pass --font-dir for a local build; Pages uses the repository's build variables.
"""
import argparse
import base64
import os
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--font-dir', type=Path)
args = parser.parse_args()
fonts = (
    ('Book', 'Timeless Serif', 400, 'TIMELESS_TITLE_WOFF2'),
    ('TextBook', 'Timeless Text', 400, 'TIMELESS_TEXT_WOFF2'),
    ('TextBold', 'Timeless Text', 700, 'TIMELESS_TEXT_BOLD_WOFF2'),
)
faces = []
for filename, family, weight, variable in fonts:
    if args.font_dir:
        data = (args.font_dir / f'TimelessSerif-{filename}.woff2').read_bytes()
    else:
        value = os.environ.get(variable)
        if not value:
            raise SystemExit(f'Missing {variable}; use --font-dir for a local build.')
        data = base64.b64decode(value, validate=True)
    if data[:4] != b'wOF2':
        raise SystemExit(f'Invalid WOFF2 font: {filename}')
    encoded = base64.b64encode(data).decode('ascii')
    faces.append(
        f'@font-face{{font-family:"{family}";font-style:normal;font-weight:{weight};'
        f'font-display:swap;src:url("data:font/woff2;base64,{encoded}") format("woff2");}}'
    )
output = Path(__file__).resolve().parents[1] / 'assets/css/embedded-fonts.css'
output.write_text('\n'.join(faces) + '\n')
print('Prepared the three embedded Timeless faces.')
