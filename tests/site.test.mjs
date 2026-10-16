import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
const root = new URL("../dist/", import.meta.url);
async function htmlFiles(dir = root) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
    if (entry.isDirectory()) found.push(...(await htmlFiles(url)));
    else if (entry.name.endsWith(".html")) found.push(url);
  }
  return found;
}
test("every generated internal page and asset link resolves at the site root", async () => {
  const pages = await htmlFiles();
  assert.ok(pages.length >= 8);
  for (const file of pages) {
    const html = await readFile(file, "utf8");
    assert.match(html, /<html lang="en"/);
    assert.doesNotMatch(html, /(?:href|src)="\/web\//);
    for (const match of html.matchAll(
      /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
    )) {
      const relative = decodeURIComponent(match[1].slice(1));
      const target = new URL(
        relative.endsWith("/") ? relative + "index.html" : relative,
        root,
      );
      await access(target).catch(() =>
        assert.fail(
          `Broken link ${match[1]} in ${path.basename(file.pathname)}`,
        ),
      );
    }
    const canonical = html.match(/rel="canonical" href="([^"]+)"/);
    assert.ok(canonical?.[1].startsWith("https://rmandevs.github.io/"));
  }
});
test("draft blog content stays out of generated pages, RSS and sitemap", async () => {
  const files = [
    ...(await htmlFiles()),
    new URL("rss.xml", root),
    new URL("sitemap.xml", root),
  ];
  for (const file of files) {
    assert.doesNotMatch(
      await readFile(file, "utf8"),
      /Hello, world|hello-world|This is the first post/,
    );
  }
  await assert.rejects(access(new URL("blog/hello-world/index.html", root)));
});
test("all five original projects have content pages with a repository link", async () => {
  for (const slug of [
    "comfytosh",
    "isometric-illustrations",
    "lazy-c7n",
    "pnpm-supply-chain-hardening-skill",
    "vigia",
  ]) {
    const html = await readFile(
      new URL(`projects/${slug}/index.html`, root),
      "utf8",
    );
    assert.ok(html.includes(`https://github.com/rmandevs/${slug}`));
    assert.ok(html.includes("View on GitHub"));
  }
});
