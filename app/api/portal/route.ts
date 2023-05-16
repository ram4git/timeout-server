import stripe from "@/lib/stripe";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { user } = session || {};

  try {


    return NextResponse.redirect("", { status: 303 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
