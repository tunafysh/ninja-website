import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest){
  const userAgent = req.headers.get("user-agent") || "";
  const basePath = path.join(process.cwd(), "public", "scripts");

  let filename = null;

  if (userAgent.includes("PowerShell")) {
    filename = "install.ps1";
  } else if (userAgent.includes("curl")) {
    filename = "install.sh";
  }

  if (!filename) {
    return NextResponse.redirect(req.nextUrl.origin + "/");
  }

  const filePath = path.join(basePath, filename);
  const content = await readFile(filePath, "utf8");

  return new NextResponse(content, {
    headers: {
      "content-type": filename.endsWith(".ps1")
        ? "text/plain"
        : "text/x-shellscript"
    }
  });
}
