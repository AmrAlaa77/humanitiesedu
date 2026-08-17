import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';

const links = [
  { label: 'Platform', href: '#platform' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'How It Works', href: '#how' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Insights', href: '#insights' },
  { label: 'Deliverables', href: '#deliverables' },
  { label: 'Journey', href: '#journey' },
];

const Navbar: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go('#top')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Activity className="w-5 h-5 text-slate-950" />
          </div>
          <div className="leading-tight text-left">
            <span className="block text-white font-semibold tracking-tight">
              Hum<span id="humantic-logo-a">a</span>ntic
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-400">Digital</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="text-sm text-slate-300 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
          <Link to="/aurion" className="text-sm font-medium bg-gradient-to-r from-teal-200 to-cyan-300 bg-clip-text text-transparent hover:opacity-80 transition">
            AURION ONE
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onCta} className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-emerald-500/20">
            Request Access
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-5 py-4 space-y-3">
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="block w-full text-left text-slate-200 py-1.5">
              {l.label}
            </button>
          ))}
          <Link to="/aurion" onClick={() => setOpen(false)} className="block w-full text-left py-1.5 font-medium bg-gradient-to-r from-teal-200 to-cyan-300 bg-clip-text text-transparent">
            AURION ONE
          </Link>
          <button onClick={() => { setOpen(false); onCta(); }} className="w-full mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold">
            Request Access
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
