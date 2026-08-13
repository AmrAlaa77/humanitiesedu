import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  { name: 'Dr. Elena Marsh', role: 'Preventative Physician', quote: 'The Wellbeing Index gives my patients a number they actually understand — and act on.' },
  { name: 'James Okafor', role: 'Member, 18 months', quote: 'Humantic flagged a metabolic shift months before my GP would have. Genuinely life-changing.' },
  { name: 'Sara Lindqvist', role: 'Endurance Athlete', quote: 'Continuous monitoring tuned my recovery. My index climbed 22 points in a season.' },
];

const Insights: React.FC = () => (
  <section id="insights" className="relative py-24 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Trusted Outcomes</span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white tracking-tight">People who caught it early</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <Quote className="w-8 h-8 text-cyan-400/40 mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-slate-200 leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                {t.name[0]}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-slate-400 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Insights;
