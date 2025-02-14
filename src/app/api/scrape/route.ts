import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    console.log(url)

    // Launch Puppeteer with valid headless mode
    const browser = await puppeteer.launch({
      headless: true, 
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Collect image URLs
    const imageUrls = new Set<string>();
    console.log(imageUrls)
    page.on("response", async (response) => {
      const contentType = response.headers()["content-type"];
      if (contentType?.startsWith("image/")) {
        imageUrls.add(response.url());
      }
    });

    // Navigate to URL
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await page.reload({ waitUntil: "networkidle2", timeout: 30000 });

    await browser.close();

    return NextResponse.json({ images: Array.from(imageUrls) });
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json(
      { error: "Failed to scrape images" },
      { status: 500 }
    );
  }
}
