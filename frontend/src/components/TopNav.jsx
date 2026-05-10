import { Link, NavLink } from 'react-router-dom';
import { FileText, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function TopNav() {
  const auth = useAuth();
  const linkClass = ({ isActive }) => `rounded-md px-3 py-2 text-sm transition ${isActive ? 'bg-mint/10 text-mint' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-mint text-ink"><FileText size={18} /></span>
          SmartResume AI
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>
          <NavLink className={linkClass} to="/builder">Builder</NavLink>
          <NavLink className={linkClass} to="/analyzer">AI Analyzer</NavLink>
          <NavLink className={linkClass} to="/roadmap">Roadmap</NavLink>
          <NavLink className={linkClass} to="/templates">Templates</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {auth?.isAuthenticated ? (
            <button className="icon-btn" title="Logout" onClick={auth.logout}><LogOut size={17} /></button>
          ) : (
            <>
              <Link className="btn-secondary" to="/login">Login</Link>
              <Link className="btn-primary hidden sm:inline-flex" to="/register"><Sparkles size={16} /> Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

