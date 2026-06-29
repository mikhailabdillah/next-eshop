import client from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
    }

    const db = client.db();

    // Find the user with this specific token
    const user = await db.collection("users").findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Set emailVerified to current date and wipe the single-use token
    await db.collection("users").updateOne({ _id: user._id }, { $set: { emailVerified: new Date(), verificationToken: null } });

    // Redirect user to the login screen with a success alert flag
    const origin = new URL(req.url).origin;
    return NextResponse.redirect(`${origin}/login?verified=true`);

  } catch (error) {
    console.log(error, 'error')
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}