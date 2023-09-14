import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_CLIENT_SECRET}`, {
  apiVersion: '2022-11-15'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query;
    if (!id || id.length < 3) throw Error('ID not valid!');
    let order = await stripe.paymentIntents.retrieve(`${id}`);
    res.status(200).json(order);
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
