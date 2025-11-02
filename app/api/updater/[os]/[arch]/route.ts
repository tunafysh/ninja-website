import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { os: String, arch: String}}) {
    let { os, arch } = await params;
    return NextResponse.json({ "message": `user uses ${os} with a ${arch} cpu`})
}