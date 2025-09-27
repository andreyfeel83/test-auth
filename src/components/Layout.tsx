import type { ReactNode } from 'react';
import arrow from '@/assets/arrowLeft.svg';
import {Link} from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  showBackArrow?: boolean;
}

export const Layout = ({children, showBackArrow}: LayoutProps) => {
  return (
    <main className="flex items-center justify-center bg-[rgb(245,245,245)] h-screen">
      <div className="bg-white p-8 max-w-[27.5rem] absolute">
        {showBackArrow && (
          <Link to="/">
            <img src={arrow} alt="navigate back" className="cursor-pointer relative left-3 top-4 -mt-4" />
          </Link>
        )}
        {children}
      </div>
    </main>
  );
};
