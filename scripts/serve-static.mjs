// Local preview server for the static-build/ folder (serves it as the domain root).
//   node scripts/serve-static.mjs   ->  http://localhost:38080/templates/en
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "static-build");
const PORT = Number(process.env.PORT || 38080);
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".json":"application/json", ".woff2":"font/woff2", ".woff":"font/woff", ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml", ".ico":"image/x-icon", ".webp":"image/webp", ".xml":"application/xml", ".txt":"text/plain" };
http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  const fp = path.join(ROOT, p);
  let target = null;
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) target = fp;           // exact file
  else if (fs.existsSync(fp + ".html")) target = fp + ".html";             // clean URL -> .html
  else if (fs.existsSync(path.join(fp, "index.html"))) target = path.join(fp, "index.html");
  if (!target) { res.writeHead(404); return res.end("404 Not Found"); }
  res.writeHead(200, { "content-type": types[path.extname(target)] || "application/octet-stream" });
  res.end(fs.readFileSync(target));
}).listen(PORT, () => console.log(`Static preview: http://localhost:${PORT}/templates/en`));
