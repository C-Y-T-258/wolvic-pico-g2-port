const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '../site');
const base = 'https://c-y-t-258.github.io/wolvic-pico-g2-port/';
const state = JSON.parse(fs.readFileSync(path.join(root, 'release-state.json')));
const indexNow = JSON.parse(fs.readFileSync(path.join(__dirname, 'indexnow.json'), 'utf8'));
assert.equal(indexNow.host, new URL(base).host);
assert.match(indexNow.key, /^[a-zA-Z0-9-]{8,128}$/);
assert.equal(indexNow.keyLocation, `${base}${indexNow.key}.txt`);
assert.deepEqual(indexNow.urlList, [base, `${base}en/`]);
assert.equal(fs.readFileSync(path.join(root, `${indexNow.key}.txt`), 'utf8').trim(), indexNow.key);
assert.equal(fs.readFileSync(path.join(root, 'google5e91971bbff7be04.html'), 'utf8').trim(),
  'google-site-verification: google5e91971bbff7be04.html');
assert.equal(fs.readFileSync(path.join(root, 'BingSiteAuth.xml'), 'utf8').replace(/\r\n/g, '\n').trim(),
  '<?xml version="1.0"?>\n<users>\n\t<user>085919B070E9963D3D400844A859CD84</user>\n</users>');
let links = 0;
for (const name of ['index.html', 'en/index.html']) {
  const file = path.join(root, name), html = fs.readFileSync(file, 'utf8');
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, `${name}: one H1`);
  assert.ok(html.includes('hreflang="zh-CN"') && html.includes('hreflang="en"'));
  assert.ok(html.includes(`rel="canonical" href="${base}${name.startsWith('en/') ? 'en/' : ''}"`));
  assert.ok(html.includes(`rel="sitemap" type="application/xml" href="${base}sitemap.xml"`));
  assert.ok(!/<script(?! type="application\/ld\+json")/.test(html), 'No executable page scripts');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'], 'SoftwareApplication');
  assert.equal(schema.softwareVersion, state.publishedCandidate ? '1.6.2-picog2-20261113' : '1.6.2 / 0052');
  assert.equal(schema.downloadUrl, state.apk);
  assert.equal(schema.inLanguage, name.startsWith('en/') ? 'en' : 'zh-CN');
  assert.equal(schema.sameAs, 'https://github.com/C-Y-T-258/wolvic-pico-g2-port');
  if (state.publishedCandidate) {
    assert.ok(html.includes('/releases/tag/picog2-1.6.2-0052'), 'Old release remains accessible');
    assert.ok(!html.includes('not yet published') && !html.includes('尚未公开发布'));
    assert.equal([...html.matchAll(/class="feature"/g)].length, 6, 'Six concrete adaptation results');
    for (const result of ['Hamezo', 'YouPorn', 'Quest', 'H.264 / AV1']) {
      assert.ok(html.includes(result), `${name}: missing adaptation result ${result}`);
    }
  } else {
    assert.ok(html.includes('尚未公开发布') || html.includes('not yet published'));
    assert.ok(!html.includes('/releases/download/picog2-1.6.2-20261113/'), 'Unpublished candidate has no download');
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    const target = match[2];
    if (target.startsWith('#')) assert.ok(ids.has(target.slice(1)), `${name}: ${target}`);
    else if (!/^(https?:|data:|mailto:)/.test(target)) {
      const resolved = path.resolve(path.dirname(file), target);
      assert.ok(resolved.startsWith(root + path.sep) || resolved === root, `Outside site: ${target}`);
      assert.ok(fs.existsSync(resolved), `${name}: missing ${target}`);
      if (fs.statSync(resolved).isDirectory()) assert.ok(fs.existsSync(path.join(resolved, 'index.html')));
    }
    links++;
  }
}
assert.ok(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes(`${base}sitemap.xml`));
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
assert.equal([...sitemap.matchAll(/<url>/g)].length, 2);
assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
console.log(`Verified bilingual metadata, release boundary, schema and ${links} page links/assets.`);
