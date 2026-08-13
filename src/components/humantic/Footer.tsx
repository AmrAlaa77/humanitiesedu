import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Instagram, Twitter, Linkedin, Youtube, Mail, Loader2, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); return; }
    setStatus('loading');
    try {
      await fetch('/api/crm/6a1bff16eb3a4753d1d1427d/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('done');
      setEmail('');
    }
  };

  const cols = [
    { h: 'Platform', items: ['Wellbeing Index', 'Bio-Monitoring', 'Biomarkers', 'Wearable Sync', 'Clinician Dashboard'] },
    { h: 'Company', items: ['About', 'Science', 'Careers', 'Press', 'Contact'] },
    { h: 'Resources', items: ['Blog', 'Help Center', 'API Docs', 'Privacy', 'Terms'] },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-white font-semibold text-lg">Humantic Digital</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-6">
              Preventative medicine powered by AI bio-monitoring and the Wellbeing Index. Know your body before it speaks.
            </p>

            <form onSubmit={subscribe} className="max-w-sm">
              <label className="text-white text-sm font-medium">Join the early-access list</label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email" value={email} placeholder="you@email.com"
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                    className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white/5 border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <button disabled={status === 'loading'} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 text-sm font-semibold disabled:opacity-60">
                  {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : status === 'done' ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </div>
              {status === 'error' && <p className="text-rose-400 text-xs mt-2">Please enter a valid email.</p>}
              {status === 'done' && <p className="text-cyan-400 text-xs mt-2">You're on the list — welcome aboard.</p>}
            </form>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="text-white font-semibold text-sm mb-4">{c.h}</h4>
              <ul className="space-y-2.5">
                {c.items.map((i) => (
                  <li key={i}><a href="#" className="text-slate-400 text-sm hover:text-cyan-300 transition">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Humantic Digital. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-slate-500 text-sm hover:text-cyan-300 transition mr-2">Team Admin</Link>
            {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-400 transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
