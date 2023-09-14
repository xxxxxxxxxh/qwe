import type { GetStaticProps, GetStaticPathsResult } from 'next';
import type { User } from '@/interfaces';
import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Profile } from '@/components';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

const User: NextPageWithLayout = () => {
  return (
    <>
      <Profile />
    </>
  );
};

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Lovver | Profile">{page}</Layout>;
};

export default User;
