import type { MouseEvent } from 'react';
import type { Product } from '@/interfaces';
import { useStore } from '@/lib';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

import { BsCheckLg } from 'react-icons/bs';
import { AnimationContainer } from '@/components';
import toast from 'react-hot-toast';

const prices: Product[] = [
  {
    id: '9ad482aa-31ca-4bd2-90b1-1f03897ff706',
    name: 'Monthly Plan',
    price: 15.0,
    features: ['Max of 2 builds', 'FUD', 'Guaranteed fun!', 'Ultra Fast', 'Custom Config']
  },
  {
    id: 'a431648c-7025-4ed2-ba0f-16f13269e6b5',
    name: 'Annual Plan',
    price: 20.0,
    features: ['Max of 5 builds', 'FUD', 'Guaranteed fun!', 'Ultra Fast', 'Custom Config']
  },
  {
    id: 'a1efcf05-64ff-4e4b-8e69-88f1006e46ed',
    name: 'Lifetime Plan',
    price: 45.0,
    features: ['Unlimited builds', 'FUD', 'Guaranteed fun!', 'Ultra Fast', 'Custom Config'],
    recommended: true
  }
];

export const Prices = () => {
  const { addToCart } = useStore();
  const { t } = useTranslation(['login', 'payments']);
  const { data: session } = useSession();
  const router = useRouter();

  const onBuy = (event: MouseEvent<HTMLDivElement>, product: Product) => {
    event.stopPropagation();
    if (!session?.user) return toast.error(t('please_login'));
    addToCart(product);
    router.push(`/checkout`);
    toast.success('Product has been added to cart successfuly');
  };

  return (
    <div className="block lg:flex justify-center items-center mt-[72px] gap-3">
      {prices.map((data: Product, i: number) => (
        <AnimationContainer key={data.id}>
          <div
            onClick={(event) => onBuy(event, data)}
            className={`z-auto mb-5 lg:mb-0 relative order-${i + 1} ${
              i + 1 === 2 ? 'lg:py-[4rem]' : 'bg-opacity-50'
            } z-10 w-full lg:min-w-[340px] border border-black/10 dark:border-white/10 shadow-lg shadow-[rgba(0, 0, 0, 0.8)] rounded-md transition-all py-[40px] px-[32px] hover:scale-105 cursor-pointer bg-gray-100 dark:bg-black`}
          >
            <div className="flex flex-col items-center">
              {data?.recommended && (
                <div className="absolute top-0 rounded-full py-[4px] px-[16px] text-white font-bold text-md uppercase translate-y-[-50%] leading-4 bg-gradient-to-r from-purple-500 to-blue-500">
                  Recommended
                </div>
              )}
              {i + 1 === 2 && (
                <div className="absolute top-0 rounded-full py-[4px] px-[16px] text-white font-bold text-md uppercase translate-y-[-50%] leading-4 bg-gradient-to-r from-amber-500 to-orange-500">
                  45% OFF
                </div>
              )}
              <h1 className="text-black dark:text-white text-xl font-medium">{data.name}</h1>
              <div className="mb-4 text-gray-400 font-bold leading-8 text-xl">
                <span className="text-lg">US </span>
                <span>
                  <b className="text-black dark:text-white">{data.price}</b> $
                </span>
              </div>
              <hr className="w-full h-[1px] bg-black/10 dark:bg-[#27262d] border-0 my-[32px] mx-0" />
              <div className="flex items-center w-full">
                <ul className="list-none">
                  {data.features.map((content: string, i: number) => (
                    <li className="ml-3 flex flex-wrap items-center justify-start font-light text-gray-400" key={i}>
                      <BsCheckLg className="text-green-400 mr-3" />
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimationContainer>
      ))}
    </div>
  );
};
