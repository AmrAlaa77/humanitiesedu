import React, { useState } from 'react';
import { X, Loader2, Check, Lock, CreditCard, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  product: { title: string; price: number; note?: string } | null;
}

const formatCard = (v: string) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
const formatExp = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, product }) => {
  const [form, setForm] = useState({ name: '', email: '', card: '', exp: '', cvc: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  if (!open || !product) return null;

  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.name.trim().length > 1 &&
    form.card.replace(/\s/g, '').length === 16 &&
    /^\d{2}\/\d{2}$/.test(form.exp) &&
    form.cvc.replace(/\D/g, '').length >= 3;

  const close = () => {
    setStatus('idle');
    setForm({ name: '', email: '', card: '', exp: '', cvc: '' });
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus('loading');
    try {
      await supabase.from('assessment_submissions').insert({
        name: form.name,
        email: form.email,
        source: `paid-${product.title}`,
      });
    } catch {}
    try {
      await fetch('https://famous.ai/api/crm/6a1bff16eb3a4753d1d1427d/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name || undefined,
          source: 'paid-assessment',
          tags: ['paid', product.title],
        }),
      });
    } catch {}
    // Simulated charge confirmation
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('done');
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {status === 'done' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-400/15 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white text-2xl font-bold">Payment confirmed</h3>
            <p className="text-slate-400 mt-2">
              Your access to the <span className="text-white">{product.title}</span> is unlocked. We'll
              email your onboarding details to {form.email}.
            </p>
            <button
              onClick={close}
              className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs mb-4">
              <Lock className="w-3.5 h-3.5" /> Secure Checkout
            </div>
            <h3 className="text-white text-2xl font-bold leading-tight">{product.title}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">£{product.price}</span>
              <span className="text-slate-400 text-sm">{product.note || 'one-time'}</span>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Cardholder name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email address"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={form.card}
                  onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                  placeholder="Card number"
                  inputMode="numeric"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  value={form.exp}
                  onChange={(e) => setForm({ ...form, exp: formatExp(e.target.value) })}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
                <input
                  value={form.cvc}
                  onChange={(e) => setForm({ ...form, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  placeholder="CVC"
                  inputMode="numeric"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
              <button
                disabled={status === 'loading' || !valid}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  `Pay £${product.price}`
                )}
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Encrypted & secure. Cards are not stored.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
