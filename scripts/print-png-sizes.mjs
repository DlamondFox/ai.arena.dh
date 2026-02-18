import fs from 'node:fs/promises';
import path from 'node:path';

const workspace = process.cwd();
const publicDir = path.join(workspace, 'public');

const isPng = (name) => name.toLowerCase().endsWith('.png');

const readPngSize = async (filePath) => {
  const buf = await fs.readFile(filePath);
  // PNG signature (8) + IHDR length(4) + type(4) => width starts at offset 16
  // width/height are big-endian uint32.
  if (buf.length < 24) throw new Error('File too small');
  const signature = buf.subarray(0, 8);
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!signature.equals(pngSig)) throw new Error('Not a PNG');
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
};

const main = async () => {
  const entries = await fs.readdir(publicDir);
  const files = entries.filter(isPng).sort();

  const results = [];
  for (const name of files) {
    const filePath = path.join(publicDir, name);
    try {
      const { width, height } = await readPngSize(filePath);
      results.push({ name, width, height });
    } catch (e) {
      results.push({ name, error: String(e?.message || e) });
    }
  }

  console.table(results);
};

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
