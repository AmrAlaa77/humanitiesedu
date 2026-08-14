import React from 'react';
import { Watch, Cpu, Gauge, Sparkles } from 'lucide-react';

const steps = [
  { icon: Watch, n: '01', t: 'Connect & Capture', d: 'Sync your wearables and upload recent labs. We build your personal physiological baseline.' },
  { icon: Cpu, n: '02', t: 'AI Analysis', d: 'Our models process 120+ biomarkers around the clock, learning what "healthy" means for you.' },
  { icon: Gauge, n: '03', t: 'Wellbeing Index', d: 'Everything is distilled into one composite score with clear domain breakdowns.' },
  { icon: Sparkles, n: '04', t: 'Act Early', d: 'Receive preventative guidance and risk alerts so you can intervene before issues escalate.' },
];

const HowItWorks: React.FC = () => (
  <section id="how" className="relative py-24 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">How It Works</span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white tracking-tight">From signals to prevention in four steps</h2>
      </div>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="absolute -top-3 -right-3 text-5xl font-bold text-white/[0.06]">{s.n}</div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-5">
              <s.icon className="w-6 h-6 text-slate-950" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{s.t}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
