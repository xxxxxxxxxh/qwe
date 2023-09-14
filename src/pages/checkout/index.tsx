import type { GetStaticProps } from 'next';
import { ReactElement, useEffect } from 'react';
import type { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '@/layout';
import { CheckoutPage } from '@/components';
import { signIn, useSession } from 'next-auth/react';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Checkout: NextPageWithLayout = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === 'loading') && !session) void signIn('discord');
    if (session) window.close();
  }, [session, status]);

  return (
    <>
      <CheckoutPage />
    </>
  );
};

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Lovver | Checkout">{page}</Layout>;
};

export default Checkout;
