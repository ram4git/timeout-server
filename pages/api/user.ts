import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;
  const user = {id: 1, email: 'abc@a.com', subscriptionStatus: 'subscribed'};

  // Return user data, including the subscription status, in the response
  res.status(200).json({
    id: user?.id,
    email: user?.email,
    subscriptionStatus: user?.subscriptionStatus || "none",
  });
}
