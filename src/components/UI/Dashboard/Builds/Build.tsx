import type { Build } from '@/interfaces';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ModalEditWebhook } from './Modals/Edit';
import { ModalDeleteBuild } from './Modals/Delete';

import { BsDownload } from 'react-icons/bs';
import { BiLoader } from 'react-icons/bi';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { CiEdit, CiRedo, CiTrash } from 'react-icons/ci';

import Image from 'next/image';

const options = [
  { icon: CiEdit, label: 'Edit Webhook', id: 1 },
  { icon: CiRedo, label: 'Re-Build', id: 2 },
  { icon: CiTrash, label: 'Delete', id: 3 }
];

function OptionsBuild({ id }: { id: string }) {
  let [open, setOpen] = useState(false);
  let [item, setItem] = useState(0);

  const openModals = (item_id: number) => {
    setItem(item_id);
    setOpen(true);
  };
  return (
    <>
      {item === 1 && <ModalEditWebhook id={id} open={open} setOpen={setOpen} />}
      {item === 2 && <ModalDeleteBuild id={id} open={open} setOpen={setOpen} />}
      {item === 3 && <ModalDeleteBuild id={id} open={open} setOpen={setOpen} />}
      <Menu>
        <div className="flex items-center justify-end w-full relative -top-3">
          <Menu.Button className="cursor-pointer dark:hover:text-white hover:text-black text-neutral-400">
            <HiOutlineCog6Tooth />
          </Menu.Button>
        </div>
        <div className="relative right-24 top-[10px]">
          <Menu.Items className="fixed bg-black bg-opacity-90 border border-[#333] rounded-lg select-none backdrop-blur-sm">
            {options.map(({ id, label, icon: Icon }) => (
              <Menu.Item
                key={id}
                as="button"
                onClick={() => openModals(id)}
                className={`cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm text-white ${
                  label === 'Delete' ? '!text-red-500' : ''
                }`}
              >
                {Icon && <Icon className="text-gray-500 mr-2 h-5 w-5" />}
                {label}
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
    </>
  );
}

export const BuildCardSkeleton = () => {
  return (
    <>
      <div className="w-full relative inline-block overflow-hidden rounded bg-gray-100/80 dark:bg-black text-left align-bottom transition border dark:border-[#111] border-gray-300 sm:my-8 sm:max-w-md sm:align-middle">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="animate-pulse w-[50px] h-[50px] rounded-lg dark:bg-white/10 bg-black/10"></div>
          <div className="block">
            <div className="animate-pulse rounded-lg w-[5rem] h-[1rem] my-1 dark:bg-white/10 bg-black/10"></div>
            <div className="animate-pulse rounded-lg w-[3rem] h-[1rem] my-1 dark:bg-white/10 bg-black/10"></div>
          </div>
        </div>
        <div className="px-6 py-[16px] flex justify-between text-gray-400 border-t dark:border-[#111] border-gray-300">
          <div className="animate-pulse rounded-lg w-10 h-6 dark:bg-white/10 bg-black/10"></div>
          <div className="animate-pulse rounded-lg w-14 h-6 dark:bg-white/10 bg-black/10"></div>
        </div>
      </div>
    </>
  );
};

export const BuildCard = ({ id, name, icon, description, metadata }: Build) => {
  return (
    <>
      <div className="lg:w-[320px] w-full h-[158px] relative inline-block overflow-hidden rounded bg-white dark:bg-black text-left align-bottom transition border dark:border-[#111] border-gray-300 sm:my-8 sm:max-w-md sm:align-middle">
        <div className="flex items-center gap-3 px-4 py-3">
          <Image
            src={icon || '/lovver.png'}
            className="rounded-xl border dark:border-[#111] bg-black"
            alt={`${name} - Icon`}
            width={60}
            height={60}
          />
          <div className="block py-3">
            <h2 className="text-gray-900 dark:text-[#fafafa] font-semibold text-md">{name}</h2>
            <p className="text-gray-300 text-xs leading-3 max-w-[11rem] block text-ellipsis overflow-hidden whitespace-nowrap">
              {description}
            </p>
          </div>
          <OptionsBuild id={id} />
        </div>
        <div className="border-t dark:border-[#111] border-gray-300 px-4 py-[16px]">
          {metadata.status ? (
            <button
              onClick={() => window.open(`/api/builds/${id}`)}
              className="flex justify-center items-center gap-2 font-semibold text-sm cursor-pointer select-none rounded-md py-2 px-4 dark:bg-white bg-black hover:bg-opacity-70 border border-[#111] dark:text-black text-white transition duration-200 w-full"
            >
              <BsDownload />
              Download
            </button>
          ) : (
            <div className="flex items-center justify-center mt-2 gap-2">
              <BiLoader className="animate-spin text-[#888]" />
              <p className="font-mono">Building...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
