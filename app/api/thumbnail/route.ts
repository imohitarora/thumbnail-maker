import { NextResponse } from "next/server";
import { generateThumbnail } from "@/lib/thumbnail";
import { validateUrl } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const {
      url,
      width = 800,
      height = 600,
      format = "png",
    } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    if (!validateUrl(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const thumbnail = await generateThumbnail({ url, width, height, format });

    return new NextResponse(thumbnail, {
      headers: {
        "Content-Type": `image/${format}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Screenshot error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate thumbnail" },
      { status: 500 }
    );
  }
}
