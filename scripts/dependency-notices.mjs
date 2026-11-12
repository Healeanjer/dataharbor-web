import fs from 'node:fs/promises';
import path from 'node:path';
const lock = JSON.parse(await fs.readFile('package-lock.json', 'utf8'));
const records = [];
const notices = [];
for (const [folder, item] of Object.entries(lock.packages)) {
  if (!folder || !folder.includes('node_modules/')) continue;
  const name = folder.slice(folder.lastIndexOf('node_modules/') + 13);
  const record = {
    name,
    version: item.version,
    license: item.license || 'See package license',
    development: !!item.dev,
  };
  let entries = [];
  try {
    entries = await fs.readdir(folder);
  } catch {
    continue;
  }
  for (const filename of entries.filter((n) => /^(license|copying|notice)(\.|$)/i.test(n))) {
    const file = path.join(folder, filename);
    try {
      const text = await fs.readFile(file, 'utf8');
      notices.push(
        `\n${'='.repeat(70)}\n${name} ${item.version} — ${filename}\n${'='.repeat(70)}\n${text}`
      );
    } catch {}
  }
  records.push(record);
}
await fs.writeFile('DEPENDENCIES.json', JSON.stringify(records, null, 2) + '\n');
await fs.writeFile(
  'THIRD_PARTY_NOTICES.txt',
  'DataHarbor Web — Third-party dependency notices\n\nThe application implementation is maintained separately from the open-source frameworks and build tools listed below. Their original notices are preserved here.\n' +
    notices.join('\n')
);
console.log(
  `Recorded ${records.length} installed dependencies and ${notices.length} original license/notice files.`
);
