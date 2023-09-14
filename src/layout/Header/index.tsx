import { useState, Fragment } from 'react';
import { Logo, Nav, Buttons, Mobile } from '@/components';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      {/* <Banner /> */}
      <header
        className={`w-full flex justify-center fixed z-10 border-b border-black/10 dark:border-white/10 dark:bg-gradient-to-r from-black to-transparent bg-transparent ${
          open ? 'dark:bg-black bg-white' : 'backdrop-blur-md'
        }`}
      >
        <nav className="flex flex-row items-center px-4 lg:px-6 py-2.5 w-full">
          <Logo />
          <Nav />
          <Buttons {...{ open, setOpen }} />
        </nav>
      </header>
      <Mobile open={open} />
    </Fragment>
  );
};
