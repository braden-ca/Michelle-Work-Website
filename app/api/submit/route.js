import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  if (!data.borrower?.name || !data.borrower?.email || !data.signature || !data.agreedToTerms) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const submissionId = crypto.randomUUID();
  const record = {
    submissionId,
    submittedAt: new Date().toISOString(),
    ...data,
  };

  const blob = await put(
    `submissions/${submissionId}.json`,
    JSON.stringify(record, null, 2),
    {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    }
  );

  return NextResponse.json({ submissionId, url: blob.url });
}
