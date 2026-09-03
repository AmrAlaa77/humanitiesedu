import React, { useEffect, useRef, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const ctaRef = useRef<HTMLButtonElement>(null);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Shrink + solidify the bar once the page has scrolled past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section is currently centered in the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Magnetic CTA: pulls toward the cursor within its own bounds, snaps back on leave.
  const onCtaMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate3d(${relX * 0.25}px, ${relY * 0.35}px, 0)`;
  };
  const onCtaLeave = () => {
    if (ctaRef.current) ctaRef.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 border-white/10 shadow-lg shadow-black/20'
          : 'bg-slate-950/40 border-white/0'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        <button onClick={() => go('#top')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
            <Activity className="w-5 h-5 text-slate-950" />
          </div>
          <div className="leading-tight text-left">
            <span className="block text-white font-semibold tracking-tight">Humantic</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-400">Digital</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`relative py-1 text-sm transition-colors ${
                active === l.href ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-emerald-400 to-cyan-400 transition-transform duration-300 ${
                  active === l.href ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
          <Link to="/aurion" className="text-sm font-medium bg-gradient-to-r from-teal-200 to-cyan-300 bg-clip-text text-transparent hover:opacity-80 transition">
            AURION ONE
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            ref={ctaRef}
            onClick={onCta}
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 text-sm font-semibold hover:opacity-90 transition-[opacity,transform] duration-150 ease-out will-change-transform shadow-lg shadow-emerald-500/20"
          >
            Request Access
          </button>
        </div>

        <button className="md:hidden text-white transition-transform active:scale-90" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-white/10 bg-slate-950/95 transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-4 space-y-3">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`block w-full text-left py-1.5 transition-colors ${
                active === l.href ? 'text-emerald-300 font-medium' : 'text-slate-200'
              }`}
            >
              {l.label}
            </button>
          ))}
          <Link to="/aurion" onClick={() => setOpen(false)} className="block w-full text-left py-1.5 font-medium bg-gradient-to-r from-teal-200 to-cyan-300 bg-clip-text text-transparent">
            AURION ONE
          </Link>
          <button onClick={() => { setOpen(false); onCta(); }} className="w-full mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold transition active:scale-[0.97]">
            Request Access
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
