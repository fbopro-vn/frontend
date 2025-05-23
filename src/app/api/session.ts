import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  let sessionId = req.cookies.get("sessionId")?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    const response = NextResponse.json({ sessionId });
    response.cookies.set("sessionId", sessionId, { maxAge: 604800, httpOnly: true });
    return response;
  }

  return NextResponse.json({ sessionId });
}
