import { NextRequest } from "next/server";

export function GET(req: NextRequest){
    const userAgent = req.headers.get("user-agent");

    if (userAgent?.includes("PowerShell")){
      return Response.redirect(req.nextUrl.origin+"/scripts/install.ps1")
    }
    else if (userAgent?.includes("curl")){
      return Response.redirect(req.nextUrl.origin+"/scripts/install.sh")
    }
    else {
        return Response.redirect(req.nextUrl.origin+"/")
    }
}