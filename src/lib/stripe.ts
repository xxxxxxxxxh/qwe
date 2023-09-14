import type { Product } from '@/interfaces';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

export const stripeHandler = async (items: Product[]) => {
  const { data } = await axios.post('/api/checkout', {
    items
  });
  return data;
};

export const getStripe = () => {
  let stripePromise;
  let key = process.env.NEXT_PUBLIC_STRIPE_CLIENT || '';
  if (!stripePromise) stripePromise = loadStripe(key);
  return stripePromise;
};
