import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

type Props = {
  children?: ReactNode;
};

export function AppHeader({ children }: Props) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-1 h-full">
          <Tab to="/applications">Applications</Tab>
          <Tab to="/analytics">Analytics</Tab>
          <Tab to="/jobs">Jobs</Tab>
        </nav>
        <div className="flex items-center gap-3">
          {children}
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

function Tab({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'h-full flex items-center px-3 text-sm font-medium border-b-2 transition',
          isActive
            ? 'border-indigo-600 text-slate-900'
            : 'border-transparent text-slate-600 hover:text-slate-900',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
}
