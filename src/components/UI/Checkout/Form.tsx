import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import type { Product } from '@/interfaces';
import { type FormEvent, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { stripeHandler } from '@/lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const CardStyle = {
  classes: {
    base: 'StripeElementIdeal',
    focus: 'StripeElementIdeal--focus'
  },
  style: {
    base: {
      padding: '10px 14px',
      iconColor: '#9b9b9b',
      color: 'white',
      fontSize: '16px',
      fontSmoothing: 'antialiased'
    },
    invalid: {
      color: '#9e2146'
    }
  }
};

export const Form = ({ items }: { items: Product[] }) => {
  type handlerType = {
    id: string;
    client_secret: string;
  };
  const router = useRouter();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation(['common', 'payments']);
  const stripe = useStripe();
  const elements = useElements();

  let no_items: string = t('common:no_items');

  const handleChange = async (e: StripeCardElementChangeEvent) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    if (!items.length) return setError(no_items);

    let { id, client_secret }: handlerType = await stripeHandler(items);
    const payload = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)!
      }
    });

    if (payload.error) setError(payload.error.message || 'Error payment!');
    router.push(`/checkout/success?id=${id}`);
  };
  return (
    <>
      <div className="w-full h-full mt-12">
        <form onSubmit={onSubmit} className="mx-auto w-full sm:w-1/2 self-center mt-5">
          <CardElement
            options={CardStyle}
            onChange={handleChange}
            className="rounded-md p-3 border text-white border-white border-opacity-10 max-h-11 w-full bg-gray-900 text-sm"
          />

          <button
            disabled={!stripe || disabled || error ? true : false}
            className="mt-3 bg-black text-white dark:bg-white dark:text-black rounded-md py-3 px-4 text-base font-semibold cursor-pointer inline-flex justify-center items-center transition-all duration-200 shadow-md w-full hover:filter hover:contrast-125 disabled:opacity-50 disabled:cursor-default"
          >
            {t('payments:checkout.confirm_order')}
          </button>
          {error && (
            <div className="text-gray-400 text-base mt-3 text-center" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
