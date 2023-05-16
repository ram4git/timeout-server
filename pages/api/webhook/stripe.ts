import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send("Webhook signature verification failed.");
  }

  const stripeSession = event.data.object as Stripe.Checkout.Session;

  console.log(
    "stripeSessionClientReferenceId",
    stripeSession.client_reference_id
  );

  // Sent when a customer clicks the Pay or Subscribe button in Checkout, informing you of a new purchase.
  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      stripeSession.subscription as string
    );
  }

  return res.status(200).end();
}
