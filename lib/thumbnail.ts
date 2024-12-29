import puppeteer from 'puppeteer';
import sharp from 'sharp';

interface ThumbnailOptions {
  url: string;
  width: number;
  height: number;
  format: string;
}

export async function generateThumbnail({ url, width, height, format }: ThumbnailOptions): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    await page.setViewport({
      width: Math.max(width, 1024),
      height: Math.max(height, 768),
      deviceScaleFactor: 2,
    });

    await Promise.race([
      page.goto(url, { waitUntil: 'networkidle0' }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 15000))
    ]);

    const screenshot = await page.screenshot();

    return await sharp(screenshot)
      .resize(width, height, {
        fit: 'cover',
        position: 'top'
      })
      .toFormat(format as keyof sharp.FormatEnum)
      .toBuffer();

  } finally {
    await browser.close();
  }
}