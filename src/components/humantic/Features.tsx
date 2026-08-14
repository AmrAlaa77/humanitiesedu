import React from 'react';
import { Activity, Cpu, LineChart, ShieldCheck, Watch, Bell, Dna, Stethoscope } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const features = [
  { icon: Cpu, title: 'AI Bio-Monitoring', desc: 'Our models continuously analyse wearable and lab data to surface subtle physiological shifts.' },
  { icon: LineChart, title: 'Wellbeing Index', desc: 'A single composite 0–100 score that distils your whole-body health into one clear number.' },
  { icon: ShieldCheck, title: 'Preventative Alerts', desc: 'Early-warning signals flag emerging risk weeks before symptoms typically appear.' },
  { icon: Dna, title: 'Biomarker Intelligence', desc: 'Track 120+ biomarkers with AI-explained trends in plain, human language.' },
  { icon: Watch, title: 'Wearable Sync', desc: 'Seamlessly integrates with Apple Health, Oura, Whoop, Garmin and Dexcom.' },
  { icon: Stethoscope, title: 'Clinician Dashboard', desc: 'Share validated reports with your care team for collaborative, data-led decisions.' },
];

const Features: React.FC = () => {
  const header = useInView<HTMLDivElement>();
  const grid = useInView<HTMLDivElement>();
  const strip = useInView<HTMLDivElement>();

  return (
    <section id="platform" className="relative py-20 sm:py-24 overflow-hidden">
      {/* ambient animated glows */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse [animation-delay:1.2s]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={header.ref}
          className={`max-w-2xl transition-all duration-700 ease-out ${
            header.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            The Platform
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Intelligence that watches over your health
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Humantic Digital combines continuous monitoring, biomarker science and machine learning to keep you ahead of disease.
          </p>
        </div>

        <div
          ref={grid.ref}
          className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{ transitionDelay: grid.inView ? `${i * 90}ms` : '0ms' }}
              className={`group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 overflow-hidden
                transition-all duration-700 ease-out hover:bg-white/[0.06] hover:border-emerald-400/30
                hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10
                ${grid.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {/* sheen sweep on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-400/20 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <f.icon className="w-6 h-6 text-emerald-300 transition-colors group-hover:text-emerald-200" />
              </div>
              <h3 className="relative text-white text-lg font-semibold mb-2">{f.title}</h3>
              <p className="relative text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div
          ref={strip.ref}
          className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
        >
          {[
            { icon: Activity, t: 'HIPAA & GDPR aligned', d: 'Bank-grade encryption end to end.' },
            { icon: Bell, t: 'Real-time notifications', d: 'Be the first to know about changes.' },
            { icon: Cpu, t: 'Always learning', d: 'Models personalise to your baseline.' },
          ].map((x, i) => (
            <div
              key={x.t}
              style={{ transitionDelay: strip.inView ? `${i * 120}ms` : '0ms' }}
              className={`group flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-5
                transition-all duration-700 ease-out hover:border-cyan-400/30 hover:from-cyan-500/[0.08]
                ${strip.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
            >
              <x.icon className="w-5 h-5 text-cyan-300 mt-0.5 transition-transform group-hover:scale-125" />
              <div>
                <p className="text-white font-medium text-sm">{x.t}</p>
                <p className="text-slate-400 text-xs">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
