const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const projects = [
  ['Hunza Crafts', 'https://hunzacrafts.vercel.app'],
  ['Harry Films', 'https://harry-films.vercel.app'],
  ['Harry Nomad', 'https://harrynomad.vercel.app'],
  ['OmniMarket AI Suite', 'https://omnimarket.ai'],
  ['HyperTrade Commerce Engine', 'https://www.hypertrade.com'],
  ['SinoConnect B2B Hub', 'https://www.sinoconnect.com'],
  ['VentureStrat GTM Simulator', 'https://venturestrat.ai'],
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const outDir = path.join(process.cwd(), 'public', 'project-cards');
  fs.mkdirSync(outDir, { recursive: true });

  for (const [name, url] of projects) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const target = path.join(outDir, `${slug}.png`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: target, fullPage: false, animations: 'disabled' });
      console.log(`Saved ${target}`);
    } catch (error) {
      console.log(`Failed to capture ${name}: ${error.message}`);
    }
  }

  await browser.close();
})();
