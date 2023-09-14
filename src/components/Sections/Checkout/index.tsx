//import { useRouter } from 'next/router';
import { Product, Form } from '@/components';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib';
import { useFromStore } from '@/hooks';
import { useStore } from '@/lib';

export const CheckoutPage = () => {
  const products = useFromStore(useStore, (state) => state.cart);
  return (
    <>
      <Elements stripe={getStripe()}>
        <div className="flex flex-row flex-wrap items-center justify-center py-24 px-6 gap-4">
          <Product products={products} />
          <Form items={products} />
        </div>
      </Elements>
    </>
  );
};
