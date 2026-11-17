const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const checkout = path.resolve(process.argv[2] || '.');
const manifest = require('./docs/release-20261113-assets.json');
for (const item of manifest) {
  const bytes = fs.readFileSync(path.join(checkout, item.path));
  const actual = crypto.createHash('sha256').update(bytes).digest('hex');
  if (actual !== item.sha256) throw new Error(`Asset mismatch: ${item.path}`);
}
console.log(`Verified ${manifest.length} extension assets against the release manifest.`);
