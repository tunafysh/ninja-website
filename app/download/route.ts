import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

import { detectInstallPlatform, getInstallTarget, parseInstallPlatform } from "@/lib/install";

function buildDownloadName(platform: string, format: string | null, baseName: string) {
  if (!format) {
    return baseName;
  }

  const extension = baseName.includes(".") ? baseName.slice(baseName.lastIndexOf(".")) : "";
  const stem = extension ? baseName.slice(0, -extension.length) : baseName;
  return `${stem}-${platform}-${format}${extension}`;
}

export async function GET(req: NextRequest) {
  const requestedPlatform = req.nextUrl.searchParams.get("os");
  const requestedFormat = req.nextUrl.searchParams.get("format");
  const userAgent = req.headers.get("user-agent") || "";
  const platform = parseInstallPlatform(requestedPlatform) ?? detectInstallPlatform(userAgent);
  const installer = getInstallTarget(platform);
  const basePath = path.join(process.cwd(), "public", "scripts");
  const filePath = path.join(basePath, installer.fileName);
  const content = await readFile(filePath, "utf8");

  return new NextResponse(content, {
    headers: {
      "content-type": installer.contentType,
      "content-disposition": `attachment; filename="${buildDownloadName(platform, requestedFormat, installer.downloadName)}"`,
      "cache-control": "no-store",
    },
  });
}