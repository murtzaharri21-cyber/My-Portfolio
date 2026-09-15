import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const projects = [
  ["hunza-crafts", "https://hunzacrafts.vercel.app"],
  ["harry-films", "https://harry-films.vercel.app"],
  ["harry-nomad", "https://harrynomad.vercel.app"],
  ["omnimarket-ai-suite", "https://omnimarket.ai"],
  ["hypertrade-commerce-engine", "https://www.hypertrade.com"],
  ["sinoconnect-b2b-hub", "https://www.sinoconnect.com"],
  ["venturestrat-gtm-simulator", "https://venturestrat.ai"],
];

const outDir = path.join(process.cwd(), "public_vite", "project-cards");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [slug, url] of projects) {
  const target = path.join(outDir, `${slug}.png`);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: target, fullPage: false, animations: "disabled" });
    console.log(`Saved ${target}`);
  } catch (error) {
    console.log(`Failed to capture ${slug}: ${error.message}`);
  }
}

await browser.close();
