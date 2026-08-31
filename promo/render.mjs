import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FPS = Number(process.env.FPS || 60);
const W = 1080, H = 1920;

const framesDir = path.join(__dirname, 'frames');
fs.rmSync(framesDir, { recursive: true, force: true });
fs.mkdirSync(framesDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(path.join(__dirname, 'storyboard.html')).href);

// GSAP comes from node_modules, so the page never needs network access.
await page.addScriptTag({ path: path.join(__dirname, 'node_modules/gsap/dist/gsap.min.js') });

// Every screenshot must be decoded before we start stepping, or early frames render blank.
await page.evaluate(async () => {
  window.__master = window.__buildTimeline();
  await Promise.all([...document.images].map(img =>
    img.complete && img.naturalWidth ? null : new Promise(r => { img.onload = r; img.onerror = r; })
  ));
  await document.fonts.ready;
});

const duration = await page.evaluate(() => window.__duration);
const total = Math.ceil(duration * FPS);
console.log(`duration ${duration.toFixed(2)}s -> ${total} frames @ ${FPS}fps`);

for (let f = 0; f < total; f++) {
  // Drive the paused timeline to an exact time: deterministic, no realtime jitter.
  // Braces matter: .time() returns the timeline, and returning it makes Playwright
  // try to serialise a circular GSAP object, which hangs.
  await page.evaluate((t) => { window.__master.time(t); }, f / FPS);
  await page.screenshot({
    path: path.join(framesDir, String(f).padStart(5, '0') + '.png'),
    animations: 'disabled',
  });
  if (f % 120 === 0) console.log(`  ${f}/${total}`);
}

console.log(`wrote ${total} frames`);
await browser.close();
