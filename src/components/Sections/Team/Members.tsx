import type { Member as IMember } from '@/interfaces';
import { AnimationContainer } from '@/components';
import { Member, MemberSkeleton } from '@/components';
import { fetcher } from '@/lib';
import { useTranslation, Trans } from 'next-i18next';
import { useId } from 'react';
import useSWR from 'swr';

export const Members = () => {
  const { t } = useTranslation('common');
  const { data, error } = useSWR('/api/team', fetcher, {
    refreshInterval: 60000
  });
  const members: IMember[] | null = data ? data : null;
  const id = useId();

  return (
    <>
      <section className="dark:bg-gradient-to-b from-black to-transparent">
        <div className="flex flex-col w-full max-w-[1160px] ml-auto mr-auto p-6 lg:p-10">
          <div className="flex flex-col items-center mt-[64px] text-center">
            <h1 className="text-black dark:text-white font-bold text-3xl">{t('team.our_team')}</h1>
            <p className="text-black dark:text-white text-opacity-50 text-xl font-medium">
              <Trans i18nKey="team.text" t={t}>
                Our team in charge of the development and maintenance of <b className="text-opacity-100">Lovver</b>{' '}
                services
              </Trans>
            </p>
          </div>
          <div className="w-full sm:w-auto mx-auto py-3 px-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
            {!members || error ? (
              <>
                {Array.from({ length: 3 }).map(() => (
                  <MemberSkeleton key={id} />
                ))}
              </>
            ) : (
              members
                .filter((member) => member.username)
                .map((data: IMember, index: number) => (
                  <AnimationContainer className={`${index + 1 === members.length ? 'lg:col-start-2' : ''}`} key={id}>
                    <Member {...data} />
                  </AnimationContainer>
                ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};
