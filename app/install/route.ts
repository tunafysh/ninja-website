import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    const userAgent = req.headers.get("user-agent");

    if (userAgent?.includes("PowerShell")){
      return NextResponse.rewrite(req.nextUrl.origin+"/scripts/install.ps1")
    }
    else if (userAgent?.includes("curl")){
      return NextResponse.rewrite(req.nextUrl.origin+"/scripts/install.sh")
    }
    else {
        return NextResponse.rewrite(req.nextUrl.origin+"/")
    }
}