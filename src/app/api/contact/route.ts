import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      read: false,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Sanity save failed:", error);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}
