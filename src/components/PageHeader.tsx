import logo from '@/assets/auth.svg';
import {Link} from 'react-router-dom';

export const PageHeader = () => {
  return (
    <header className="flex gap-24">
      <div className="flex items-center gap-[9px] font-semibold text-[var(--text-color)] py-5">
        <Link to="/">
          <img src={logo} alt="logo" className="cursor-pointer" />
        </Link>
        Company
      </div>
    </header>
  );
};
