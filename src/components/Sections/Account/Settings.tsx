import type { User } from '@/interfaces';
import { useSession } from 'next-auth/react';

export const Settings = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const subscription = user?.subscription;

  return (
    <>
      <section className="pt-24 px-3 py-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-gradient-to-r from-[#060606] to-transparent border border-[#111] rounded-md">
          <div className="bg-black/30 px-4 py-3 border-b border-[#111]">
            <h2 className="text-lg text-white">{user?.username} Account Settings</h2>
          </div>
          <div className="px-4 py-3 border-b border-[#111]">
            <h3 className="py-2 text-sm font-normal">Your Username</h3>
            <input
              className="max-w-xs w-full px-3 py-2 bg-black border border-[#222] rounded"
              type="text"
              placeholder={`${user?.username}...`}
            />
          </div>
          <div className="px-4 py-3 border-b border-[#111]">
            <h3 className="py-2 text-sm font-normal">Your biography</h3>
            <input
              className="max-w-xs w-full px-3 py-2 bg-black border border-[#222] rounded"
              type="text"
              placeholder="I love u Fifi.."
            />
          </div>
          <div className="px-4 py-3">
            <h3 className="py-2 text-sm font-normal">Your Session Key</h3>
            <div className="relative h-auto max-w-full w-fit rounded-md border border-[#222] bg-black text-white py-2 pr-12 pl-3">
              <pre className="text-left m-0 font-mono text-sm">{subscription?.key.slice(0, 30).concat('...')}</pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
