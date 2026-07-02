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

    const sanityError = await writeClient
      .create({
        _type: "contactSubmission",
        name,
        email,
        message,
        read: false,
      })
      .then(() => null)
      .catch((err) => {
        console.error("Sanity save failed:", err);
        return err;
      });

    const web3FormsError = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        name,
        email,
        message,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Web3Forms submission failed");
        return null;
      })
      .catch((err) => {
        console.error("Web3Forms send failed:", err);
        return err;
      });

    if (sanityError && web3FormsError) {
      return NextResponse.json(
        { error: "Failed to save and send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
  }
}
