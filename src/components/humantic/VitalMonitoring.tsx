import React from 'react';
import { Activity, Watch, Stethoscope, HomeIcon, BedDouble, ShieldCheck } from 'lucide-react';

const capabilities = [
  { icon: Activity, title: 'Predictive Diagnostics', desc: 'Real-time AI analysis that detects patterns before symptoms appear.' },
  { icon: Watch, title: 'Bio-Wearable Integration', desc: 'Seamless sync with next-gen wearables. Your vitals. Always aware.' },
  { icon: Stethoscope, title: 'Clinical Decision Support', desc: 'Empowering doctors with AI co-pilots that augment, never replace, human judgment.' },
];

const useCases = [
  { num: '01', icon: HomeIcon, title: 'Remote Patient Monitoring', desc: 'Keep chronic-condition patients safe at home with passive monitoring and proactive intervention.' },
  { num: '02', icon: BedDouble, title: 'Post-Op Recovery', desc: 'Track recovery vitals after discharge and flag complications before readmission becomes necessary.' },
  { num: '03', icon: ShieldCheck, title: 'Preventive Wellness', desc: 'Empower healthy individuals to catch early warning signs and act before issues escalate.' },
];

const VitalMonitoring: React.FC = () => (
  <section id="vital-monitoring" className="relative py-24 text-center">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">What We Do</span>
      <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-white tracking-tight">The Intelligence That Cares</h2>
      <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
        AI-powered wearable integration that looks after you — preventative medicine, always on.
      </p>
      <p className="mt-6 text-slate-400 max-w-3xl mx-auto leading-relaxed">
        HumanticDigital connects to the wearables your patients already love — smart rings, watches, and patches —
        streaming high-frequency biometric data into a unified, privacy-first health graph. We turn a noisy
        firehose of signals into calm, actionable intelligence.
      </p>

      <div className="mt-14 grid sm:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
        {capabilities.map((c) => (
          <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4">
              <c.icon className="w-5 h-5 text-emerald-300" />
            </div>
            <p className="text-white font-semibold mb-2">{c.title}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-xs font-semibold uppercase tracking-widest text-slate-500">In Practice &middot; Real-World Use</p>
      <div className="mt-6 grid sm:grid-cols-3 gap-5 text-left max-w-5xl mx-auto">
        {useCases.map((u) => (
          <div key={u.num} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-2xl font-bold text-emerald-400 mb-3">{u.num}</div>
            <p className="text-white font-semibold mb-2">{u.title}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default VitalMonitoring;
