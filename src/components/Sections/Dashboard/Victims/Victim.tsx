import { AnimationContainer, General, Accounts, Cookies, Billing, History, Computer } from '@/components';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import { fetcher } from '@/lib';

import { CiFolderOn, CiMonitor, CiViewList, CiCreditCard1, CiLock } from 'react-icons/ci';
import { AiOutlineAim } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { FiFileText } from 'react-icons/fi';

import useSWR from 'swr';
import Head from 'next/head';
import type React from 'react';

export const VictimSection = () => {
  const router = useRouter();
  const { data, error } = useSWR(`/api/victims/${router.query.id}?index=${router.query.index}`, fetcher);
  if (!data && error)
    return (
      <>
        <div className="flex items-center justify-center py-16 w-full">
          <div className="py-6 px-3 w-full max-w-xl">
            <BiErrorCircle className="mx-auto text-6xl text-red-600 mb-3" />
            <h1 className="text-black dark:text-white font-semibold text-2xl text-center">Error</h1>
            <p className="text-gray-600 text-center">{error.info.message || ''}</p>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Head>
        <title>{data?.username ? `${data.username}'s` : ''} Victim - Lovver</title>
      </Head>
      <Tab.Group>
        <Tab.List className="select-none flex px-4 gap-6 lg:gap-0 space-x-1 bg-gray-200/70 dark:bg-[#060606] border-b dark:border-[#111] border-gray-300 p-1 overflow-auto">
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <CiFolderOn />
            General
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <CiLock />
            Accounts
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <FiFileText />
            Cookies
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <CiCreditCard1 />
            Billing
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <CiViewList />
            History
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <AiOutlineAim />
            Games
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-black dark:text-white' : 'text-gray-800 dark:text-gray-400'
              } flex justify-center items-center gap-2 w-full py-2.5 text-sm font-medium leading-5`
            }
          >
            <CiMonitor />
            Computer
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* General */}
          <Tab.Panel>
            <AnimationContainer>
              <General />
            </AnimationContainer>
          </Tab.Panel>

          {/* Accounts */}
          <Tab.Panel>
            <AnimationContainer>
              <Accounts />
            </AnimationContainer>
          </Tab.Panel>

          {/* Cookies */}
          <Tab.Panel>
            <Cookies />
          </Tab.Panel>

          {/* Billing */}
          <Tab.Panel>
            <AnimationContainer>
              <Billing />
            </AnimationContainer>
          </Tab.Panel>

          {/* History */}
          <Tab.Panel>
            <AnimationContainer>
              <History />
            </AnimationContainer>
          </Tab.Panel>

          {/* Computer */}
          <Tab.Panel>
            <AnimationContainer>
              <Computer />
            </AnimationContainer>
          </Tab.Panel>

          {/* Computer */}
          <Tab.Panel>
            <AnimationContainer>
              <Computer />
            </AnimationContainer>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
