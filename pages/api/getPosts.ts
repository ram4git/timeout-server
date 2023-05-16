import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = [{
      id: 1,
      content: "This is post that comes after 120 seconds of loading",
      user: { id: 1, subscriptionStatus: "Subscribed", name: "Ram", image: "" },
      createdAt: "today",
      likes: [],
      comments: []
    }]
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    await sleep(120000);
    return res.status(200).json(data);
  } catch (error) {
    res.status(403).json({ err: "Error has occured while fetching posts" })
  }
}
