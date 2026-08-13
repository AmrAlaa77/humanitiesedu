import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import PaymentModal from '@/components/humantic/PaymentModal';

interface Instrument {
  index: string;
  badge?: string;
  title: string;
  blurb: string;
  features: string[];
  price: number;
  priceNote: string;
  cta: string;
  primary?: boolean;
}

const instruments: Instrument[] = [
  {
    index: 'Diagnostic Index · I',
    title: 'Wellbeing & Productivity Index',
    blurb:
      'The foundation. A complete mapping of where you stand today — turning the daily friction you have learned to ignore into a clear, navigable path forward. A holistic reading that fuses biometric and behavioural signals through the lens of socio-neurobiology.',
    features: [
      'Biometric & behavioural data integration',
      'Cognitive load pattern mapping',
      'Socio-neurobiological benchmarking',
      'Personalised performance-gap report',
    ],
    price: 150,
    priceNote: 'one-time access',
    cta: 'Unlock Wellbeing & Productivity Index',
  },
  {
    index: 'Diagnostic Index · II',
    badge: 'Comprehensive',
    title: 'Neuro Reset Index',
    blurb:
      'The restoration. A deep-dive audit for those ready to move from simply surviving to sustained excellence. We do not just quiet the noise — we rebuild the safety trajectory of your nervous system from the ground up.',
    features: [
      'Full neurological & physiological audit',
      'Cognitive capacity measurement',
      'Nervous-system safety trajectory prediction',
      'Recovery pathway optimisation',
      'Distributed cryptography data security',
    ],
    price: 389,
    priceNote: 'one-time access',
    cta: 'Unlock Neuro Reset Index',
    primary: true,
  },
];

const Assessment: React.FC = () => {
  const [checkout, setCheckout] = useState<{ title: string; price: number; note?: string } | null>(null);

  return (
    <section id="assessment" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Diagnostics: two instruments, one complete picture ── */}
        <div id="diagnostics">
          <div className="max-w-3xl">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
              Diagnostics · Two instruments. One complete picture.
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              <span className="text-white">We look at the soul of the individual —</span>{' '}
              <span className="text-white">not the </span>
              <span className="text-cyan-400">utility of the citizen.</span>
            </h2>
            <blockquote className="mt-7 border-l-2 border-cyan-400/60 pl-5 text-slate-400 italic leading-relaxed">
              "This is not a test of your efficiency; it is an invitation to be truly seen. In a world that
              demands you hide your fatigue, we ask you to bring your truth. This journey is the first step
              toward reclaiming your agency."
            </blockquote>
          </div>

          <div className="mt-14 grid lg:grid-cols-2 gap-8 items-stretch">
            {instruments.map((it) => (
              <div
                key={it.title}
                className={`relative flex flex-col rounded-2xl border p-8 sm:p-10 ${
                  it.primary
                    ? 'border-cyan-400/30 bg-gradient-to-b from-cyan-500/[0.06] to-white/[0.02]'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full rounded-t-2xl ${
                    it.primary
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-400'
                      : 'bg-blue-500/70'
                  }`}
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {it.index}
                  {it.badge && <span className="text-cyan-300"> · {it.badge}</span>}
                </p>
                <h3 className="mt-5 flex items-center gap-2 text-3xl font-bold text-white leading-tight">
                  {it.title}
                  <Lock className="h-5 w-5 shrink-0 text-slate-500" />
                </h3>
                <p className="mt-5 text-slate-400 leading-relaxed">{it.blurb}</p>

                <ul className="mt-7 space-y-3">
                  {it.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${it.primary ? 'text-cyan-400' : 'text-cyan-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">£{it.price}</span>
                    <span className="text-slate-400 text-sm">{it.priceNote}</span>
                  </div>
                  <button
                    onClick={() => setCheckout({ title: it.title, price: it.price, note: it.priceNote })}
                    className={`mt-6 group inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-sm font-semibold transition ${
                      it.primary
                        ? 'bg-gradient-to-r from-emerald-400 to-blue-500 text-white hover:opacity-90'
                        : 'border border-white/15 text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <Lock className="h-4 w-4" />
                    {it.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Access unlocks immediately after payment.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-400" /> MISA approved instrument</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-400" /> Read through the lens of socio-neurobiology</span>
          </div>
        </div>
      </div>

      <PaymentModal open={!!checkout} product={checkout} onClose={() => setCheckout(null)} />
    </section>
  );
};

export default Assessment;
