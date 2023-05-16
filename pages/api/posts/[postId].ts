import { NextApiRequest, NextApiResponse } from "next";
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await sleep(1000);
      return res.status(200).json([{id: 1, title: 'Delayed'}]);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured while getting post details" });
    }
  }
}
