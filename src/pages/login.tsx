import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Login: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  let { t } = useTranslation('login');

  useEffect(() => {
    if (!(status === 'loading') && !session) void signIn('discord');
    if (session) window.close();
  }, [session, status]);

  return (
    <>
      <h1 className="pt-24 text-center text-3xl font-bold">{t('redirect')}</h1>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Lovver | Login" description="Log in with your Discord account!">
      {page}
    </Layout>
  );
};

export default Login;
