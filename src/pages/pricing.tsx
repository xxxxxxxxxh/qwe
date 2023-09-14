import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Pricing } from '@/components';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Prices: NextPageWithLayout = () => {
  return (
    <>
      <Pricing />
    </>
  );
};

Prices.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Lovver | Pricing">{page}</Layout>;
};

export default Prices;
