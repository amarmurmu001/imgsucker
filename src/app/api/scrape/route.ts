import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    console.log("Scraping:", url);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    const mediaUrls = new Set<string>();

    // Collect media via network response
    page.on("response", async (response) => {
      try {
        const contentType = response.headers()["content-type"];
        if (
          contentType &&
          (contentType.startsWith("image/") ||
            contentType.startsWith("video/") ||
            contentType.startsWith("audio/"))
        ) {
          mediaUrls.add(response.url());
        }
      } catch (err) {
        console.error("Error handling response:", err);
      }
    });

    // Navigate to page
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Wait 2 seconds to let lazy-loaded content show
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Scrape DOM media (images, video, audio, background images)
    let domMedia: string[] = [];
    try {
      domMedia = await page.evaluate(() => {
        const urls = new Set<string>();

        try {
          // <img>
          document.querySelectorAll("img").forEach((img) => {
            if (img.src) urls.add(img.src);
          });

          // <video> and <source>
          document.querySelectorAll("video").forEach((video) => {
            if (video.src) urls.add(video.src);
            video.querySelectorAll("source").forEach((src) => {
              if (src.src) urls.add(src.src);
            });
          });

          // <audio> and <source>
          document.querySelectorAll("audio").forEach((audio) => {
            if (audio.src) urls.add(audio.src);
            audio.querySelectorAll("source").forEach((src) => {
              if (src.src) urls.add(src.src);
            });
          });

          // Inline background images
          document.querySelectorAll("*").forEach((el) => {
            const bg = window.getComputedStyle(el).backgroundImage;
            const match = bg?.match(/url\(["']?(.*?)["']?\)/);
            if (match && match[1]) urls.add(match[1]);
          });
        } catch (err) {
          console.error("DOM scraping error:", err);
        }

        return Array.from(urls);
      });
    } catch (err) {
      console.error("Page evaluate failed:", err);
    }

    // Merge both sources
    domMedia.forEach((url) => mediaUrls.add(url));

    await browser.close();

    return NextResponse.json({ images: Array.from(mediaUrls) });
  } catch (error) {
    console.error("Scraping failed:", error);
    return NextResponse.json(
      { error: "Failed to scrape media files." },
      { status: 500 }
    );
  }
}
