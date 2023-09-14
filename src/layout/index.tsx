import React from 'react';
import Head from 'next/head';
import { Header } from '@/layout/Header';
import { Container } from '@/components';

interface LayoutProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
}

export const Layout = ({
  children,
  title = '🦇 Lovver',
  description = 'Lovver - Introducing the next era of Discord games.',
  keywords = 'lovver, lovver str, token discord, discord software, wearelegal, hacking, cybersecurity, malware, fud',
  type = 'website',
  url = 'https://loved.lat',
  image
}: LayoutProps) => {
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
        <div className="min-h-screen">
          <Header />
          {children}
        </div>
      </Container>
    </>
  );
};
