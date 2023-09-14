import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const LogoCustom = ({ width, height, className }: { width?: number; height?: number; className?: string }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="flex-1"></div>;

  return (
    <Image
      src={theme === 'light' ? `/lovver-light.png` : '/lovver-dark.png'}
      className={`${className} rounded-full h-[30px] w-[30px] shadow-md shadow-white dark:shadow-purple-500/30`}
      alt="Lovver Logo"
      width={width || 30}
      height={height || 30}
    />
  );
};

export const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="flex-1"></div>;

  return (
    <>
      <div className="block flex-1 justify-center items-center">
        <div>
          <Link href="/" className="w-10 h-10 select-none transition-all duration-200 flex items-center justify-center">
            <Image
              src={theme === 'light' ? `/lovver-light.png` : '/lovver-dark.png'}
              alt="Lovver Logo"
              width={30}
              height={30}
              draggable={false}
            />
          </Link>
        </div>
      </div>
    </>
  );
};
