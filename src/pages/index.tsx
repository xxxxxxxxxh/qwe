import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Hero, Server } from '@/components';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <Server />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Lovver | Home">{page}</Layout>;
};

export default Home;
