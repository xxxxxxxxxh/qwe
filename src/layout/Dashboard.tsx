import type { User } from '@/interfaces';
import React from 'react';
import Head from 'next/head';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Sidebar from '@/layout/Sidebar';
import Header from '@/layout/Sidebar/Header';
import toast from 'react-hot-toast';
import { Container } from '@/components';

interface LayoutProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
}

export const Dashboard = ({
  children,
  title = 'Lovver - Dashboard',
  description = 'Lovver - Introducing the next era of Discord games.',
  keywords = 'lovver, loved, discord software, wearelegal',
  type = 'website',
  url = 'https://loved.lat',
  image
}: LayoutProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === 'loading') && !session) router.push('/');
  }, [session, status, router]);

  if ((!(status === 'unauthenticated') && !session) || !session?.user) return null;

  const user = session?.user as User;
  const { isAdmin } = user as User;
  const subscription = user?.subscription?.key;
  if (!subscription && !isAdmin) {
    router.push('/');
    toast.error('You do not have purchased premium access');
    return null;
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image ?? '/lovver.png'} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="flex grow h-screen w-screen bg-gradient-to-b from-black/[3%] to-white dark:from-black dark:to-[#0c0c0c] fixed top-0 z-10">
          <Sidebar />
          <section className="max-w-screen max-w-full grow overflow-hidden overflow-y-auto relative">
            <Header />
            {children}
          </section>
        </div>
      </Container>
    </>
  );
};
