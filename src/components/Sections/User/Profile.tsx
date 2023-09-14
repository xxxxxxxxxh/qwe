import { UserCard } from '@/components';
import { fetcher } from '@/lib';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

export const Profile = () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/users/${router.query.id}`, fetcher);

  if (error) router.push('/404');
  return (
    <>
      <Head>
        <title>{data?.username ? `${data.username}'s` : 'User'} - Lovver</title>
        <meta name="title" content={`${data?.username ? `${data.username}'s` : 'User'} - Lovver`} />
        <meta name="description" content={data?.bio} />

        <meta property="og:title" content={`${data?.username ? `${data.username}'s` : 'User'} - Lovver`} />
        <meta property="og:description" content={data?.bio} />
        <meta property="og:image" content={data?.image_url ?? '/lovver.png'} />
      </Head>
      <section className="relative pt-16">
        <div className="flex flex-col w-full max-w-[1160px] ml-auto mr-auto p-6 lg:p-10">
          <UserCard {...data} />
        </div>
      </section>
    </>
  );
};
