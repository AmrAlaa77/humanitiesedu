import React, { useState } from 'react';
import { X, Loader2, Check, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AccessModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return;
    setStatus('loading');
    // Store the submission so it appears in the protected Admin dashboard
    try {
      await supabase.from('assessment_submissions').insert({
        name: form.name,
        email: form.email,
        source: 'access-modal',
      });
    } catch {}
    // Add to the CRM contact list (required for all email collection)
    try {
      await fetch('https://famous.ai/api/crm/6a1bff16eb3a4753d1d1427d/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name || undefined,
          source: 'access-modal',
          tags: ['waitlist', 'wellbeing-index'],
        }),
      });
    } catch {}
    setStatus('done');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-200" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 transition-all hover:text-white hover:rotate-90"><X className="w-5 h-5" /></button>

        {status === 'done' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-400/15 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white text-2xl font-bold">You're on the list</h3>
            <p className="text-slate-400 mt-2">We'll reach out with your Wellbeing Index onboarding shortly.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold">Done</button>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Early Access
            </div>
            <h3 className="text-white text-2xl font-bold">Request your Wellbeing Index</h3>
            <p className="text-slate-400 mt-2 text-sm">Join the waitlist and be first to start AI bio-monitoring.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:border-emerald-400 focus:bg-white/[0.07]"
              />
              <input
                type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email address" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 transition-colors focus:outline-none focus:border-emerald-400 focus:bg-white/[0.07]"
              />
              <button disabled={status === 'loading'} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold flex items-center justify-center gap-2 transition-transform duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-60">
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Access'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AccessModal;
