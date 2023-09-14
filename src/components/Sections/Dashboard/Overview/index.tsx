import { Stats, Discords, Subscription } from '@/components';
export const Overview = () => {
  return (
    <>
      <section className="max-w-6xl px-4 py-2 mx-auto">
        <Stats />
        <Subscription />
        <Discords />
      </section>
    </>
  );
};
