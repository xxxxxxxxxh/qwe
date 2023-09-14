import type { Product as IProduct } from '@/interfaces';
import { useStore } from '@/lib';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ContentProduct = ({ name, price, recommended }: IProduct) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-row space-x-4 py-4">
      <div className="w-16 h-16 bg-rose relative overflow-hidden cursor-pointer">
        <Image
          src={'/lovver-dark.png'}
          className={`${theme === 'light' ? 'invert' : ''} rounded-lg`}
          width={64}
          height={64}
          alt={`${name} - Lovver`}
        />
      </div>
      <div className="flex-1 flex flex-col text-base">
        <span className="mt-[-3px] pb-[.25rem] font-semibold">{name}</span>
        {recommended && (
          <div className="flex items-center pb-1">
            <div className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">Recommended</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between space-y-2 text-sm font-mono">
        <span>${price} USD</span>
      </div>
    </div>
  );
};

const RemoveProduct = ({ id }: IProduct) => {
  const { t } = useTranslation('payments');
  const { removeFromCart } = useStore();
  return (
    <div className="flex flex-row h-9">
      <button
        className="w-full flex items-center justify-center border hover:border-[#444] border-[#333] hover:bg-[#cdc9c9] dark:hover:bg-[#111] p-1 select-none cursor-pointer text-black dark:text-white transition-all duration-200"
        onClick={() => removeFromCart(id)}
      >
        {t('product.remove')}
      </button>
    </div>
  );
};

export const Product = ({ products }: { products: IProduct[] }) => {
  return (
    <>
      <div className="mx-auto w-full sm:w-1/2 self-center">
        <ul>
          {products.map((product: IProduct, inx: number) => (
            <li key={inx} className="mt-2 bg-[#eee] dark:bg-[#080808] rounded-md p-[15px]">
              <ContentProduct {...product} />
              <RemoveProduct {...product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
