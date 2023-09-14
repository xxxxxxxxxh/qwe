import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useStore } from '@/lib';
import { useTranslation } from 'next-i18next';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Success: NextPageWithLayout = () => {
  const router = useRouter();
  const { clearCart } = useStore();
  const { t } = useTranslation('payments');
  const { id } = router.query;
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === 'loading') && !session) void signIn('discord');
    if (session) window.close();
  }, [session, status]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get(`/api/checkout/${id}`);
        setLoading(false);
        clearCart();
      } catch (err: any) {
        router.push('/');
        setError(err.message);
        setLoading(false);
      }
    };
    if (!id) return;
    checkSession();
  }, [id, router, clearCart]);

  if (loading) return <></>;
  if (error) return <></>;
  return (
    <>
      <div className="flex items-center justify-center py-16 w-full">
        <div className="py-6 px-3 w-full max-w-xl">
          <BsFillCheckCircleFill className="mx-auto text-6xl text-green-600 mb-3" />
          <h1 className="text-black dark:text-white font-semibold text-2xl text-center">
            {t('checkout.success_title')}
          </h1>
          <p className="text-gray-600 text-center">{t('checkout.success_desc')}</p>
        </div>
      </div>
    </>
  );
};

Success.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Lovver | Success">{page}</Layout>;
};

export default Success;
