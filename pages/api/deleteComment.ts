import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please sign in to delete a comment." });
  }

  const { user } = session;
  const { commentId } = req.body;

  try {


    return res.json({});
  } catch (err) {
    // console.log(err);
    res.status(402).json({ err: "Error has occured while deleting a comment" });
  }
}
