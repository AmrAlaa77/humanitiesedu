import React from 'react';
import { Users, Watch } from 'lucide-react';

const steps = [
  {
    icon: Users,
    n: '01',
    kicker: 'It starts with awareness',
    t: 'Hybrid Awareness Classes',
    sub: 'Face-to-Face + Digital',
    d: "Three sciences into one clear picture of how people function under stress, over time, and alongside each other — and we make it teachable for everyone, at every age.",
  },
  {
    icon: Watch,
    n: '02',
    kicker: 'Then we make it personal',
    t: 'A Wearable That Understands You',
    sub: undefined,
    d: "Through a wearable that reads your body's signals and gives them back as understanding: how you're really doing, what's shifting, and where a small change now could matter later.",
  },
];

const HowItWorks: React.FC = () => (
  <section id="how" className="relative py-24 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Humantic Digital</span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white tracking-tight">How It Works</h2>
        <p className="mt-4 text-slate-400 text-lg leading-relaxed">
          We build technology that feels human — intelligence that explains how the body copes and the mind works,
          in language anyone can grasp.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {steps.map((s) => (
          <div key={s.n} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <div className="absolute -top-3 -right-3 text-6xl font-bold text-white/[0.06]">{s.n}</div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-5">
              <s.icon className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">{s.kicker}</span>
            <h3 className="mt-2 text-white font-semibold text-xl">{s.t}</h3>
            {s.sub && <p className="mt-1 text-slate-500 text-xs font-semibold uppercase tracking-wide">{s.sub}</p>}
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
        This is preventative medicine before the body suffers — protecting your health, your wellbeing, and the
        relationships you could otherwise lose.
      </p>
    </div>
  </section>
);

export default HowItWorks;
