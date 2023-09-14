import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Members } from '@/components';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Team: NextPageWithLayout = () => {
  return (
    <>
      <Members />
    </>
  );
};

Team.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Lovver | Team">{page}</Layout>;
};

export default Team;
