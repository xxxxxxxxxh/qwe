import { AnimationContainer } from '@/components';
import { CiFileOn } from 'react-icons/ci';
import { MdMemory } from 'react-icons/md';
import {
  HiOutlineCpuChip,
  HiOutlineFingerPrint,
  HiOutlinePhoto,
  HiOutlineSquare2Stack,
  HiWifi,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineMapPin,
  HiOutlineServerStack,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown
} from 'react-icons/hi2';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '@/lib';

export const Computer = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/victims/${router.query.id}/computer`, fetcher);

  return (
    <>
      <div className="w-full h-full px-3 py-4">
        <div className="bg-gray-100/20 dark:bg-black rounded-md border border-gray-300 dark:border-[#111] px-3 py-4">
          <div className="flex items-center gap-3 pb-2">
            <div className="bg-gray-200 dark:bg-[#0a0a0a] h-5 w-5 rounded-full border border-gray-300 dark:border-[#111]"></div>
            <h1 className="text-sm font-semibold">{data?.username ?? ''}</h1>
          </div>
          <AnimationContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2 border-t border-gray-300 dark:border-[#111]">
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineCpuChip className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">CPU</h1>
                  <p className="text-xs">{data?.cpu ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlinePhoto className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">GPU</h1>
                  <p className="text-xs">{data?.gpu ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineFingerPrint className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">Mac Address</h1>
                  <p className="text-xs">{data?.mac ?? ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineSquare2Stack className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">BIOS</h1>
                  <p className="text-xs">{data?.bios ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <MdMemory className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">RAM</h1>
                  <p className="text-xs">{data?.ram ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <CiFileOn className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">HWID</h1>
                  <p className="text-xs">{data?.hwid ?? ''}</p>
                </div>
              </div>
            </div>
          </AnimationContainer>
        </div>

        <div className="bg-gray-100/20 dark:bg-black rounded-md border border-gray-300 dark:border-[#111] px-3 py-4 mt-3">
          <AnimationContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiWifi className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">IP Address</h1>
                  <p className="text-xs">{data?.ip ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineGlobeAsiaAustralia className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">Country</h1>
                  <p className="text-xs">{data?.country ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineMapPin className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">Region</h1>
                  <p className="text-xs">{data?.region ?? ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineArrowTrendingUp className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">Latitude</h1>
                  <p className="text-xs">{data?.latitude ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineArrowTrendingDown className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">Longitude</h1>
                  <p className="text-xs">{data?.longitude ?? ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-gray-300 dark:border-[#111]">
                <HiOutlineServerStack className="text-2xl" />
                <div>
                  <h1 className="font-semibold text-lg">ISP</h1>
                  <p className="text-xs">{data?.isp ?? ''}</p>
                </div>
              </div>
            </div>
          </AnimationContainer>
        </div>
      </div>
    </>
  );
};
