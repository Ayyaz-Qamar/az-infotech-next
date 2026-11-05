import { promises as fs } from 'fs';
import path from 'path';
export async function POST(req) {
  const b = await req.json();
  if (!b.name || !b.email || !b.message) return Response.json({ ok: false }, { status: 400 });
  const f = path.join(process.cwd(), 'data', 'inquiries.json');
  await fs.mkdir(path.dirname(f), { recursive: true });
  let a = [];
  try { a = JSON.parse(await fs.readFile(f, 'utf8')); } catch {}
  a.push({ ...b, at: new Date().toISOString() });
  await fs.writeFile(f, JSON.stringify(a, null, 2));
  return Response.json({ ok: true });
}
