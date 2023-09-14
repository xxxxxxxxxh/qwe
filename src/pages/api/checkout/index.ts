import type { NextApiRequest, NextApiResponse } from 'next';
import type { Product, User } from '@/interfaces';
import { logger } from '@/server';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_CLIENT_SECRET}`, {
  apiVersion: '2022-11-15'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      const user = session?.user as User;
      const { items }: { items: Product[] } = req.body;
      let amount: number = 0;

      items?.map(({ price }: any) => (amount += Math.round(price) * 100));
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        payment_method_types: ['card'],
        statement_descriptor: 'Lovver | loved.lat'
      });

      logger({ items, user });

      res.status(200).json(payment);
    } catch (err: any) {
      res.status(500).json({
        statusCode: 500,
        message: err.message
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
