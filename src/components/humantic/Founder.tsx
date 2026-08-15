import React from 'react';
import { GraduationCap, Award, Globe2, Building2 } from 'lucide-react';

const stats = [
  { value: '17', label: 'Years building HumanticDigital' },
  { value: '15', label: 'Markets across 5 continents' },
  { value: '70+', label: 'Nationals British-accredited in 2025' },
  { value: '5', label: 'Royal Saudi hospital partnerships' },
];

const sectors = ['Education', 'Healthcare', 'Mining', 'Defense', 'Diplomatic & Consular', 'Global Technology'];

const credentials = [
  {
    icon: GraduationCap,
    title: 'Academic Foundation',
    desc: 'Medicine & Surgery + Biology, University of Cambridge — specialization in behavioral consulting based on physiology and neurobiology.',
  },
  {
    icon: Award,
    title: 'Honor & Recognition',
    desc: 'Badge of Honor, Ministry of Human Resources & Social Development, in recognition of multidisciplinary, science-based educational content.',
  },
  {
    icon: Building2,
    title: 'Leadership',
    desc: 'Chair, CSO & CEO of Humantic Digital (MISA approved). Chief Strategy Officer, MENA regional partner of Oxford College.',
  },
  {
    icon: Globe2,
    title: 'Active Markets',
    desc: 'United Kingdom, Saudi Arabia, UAE, and Germany — building sustainable, globally competitive Saudi institutions since 2023.',
  },
];

const partners = [
  'Saudi Aramco', 'Ma’aden', 'King Salman Hospital', 'King Abdullah Medical City',
  'National Guard Health Affairs', 'Royal Commission for AlUla', 'U.S. Embassy', 'Embassy of Saudi Arabia',
  'Mubadala', 'PepsiCo', 'Unilever', 'Nestlé', 'Mars Incorporated', 'Google', 'Siemens',
  'GIZ (German Cooperation)', 'King Fahd University of Petroleum and Minerals', 'Savola Foods',
];

const Founder: React.FC = () => (
  <section id="founder" className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] rounded-full bg-emerald-500/[0.06] blur-[140px]" />
    </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
        {/* Left — identity card */}
        <div className="lg:sticky lg:top-28">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Founder &amp; Initiative Owner</span>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-2xl shrink-0">
              SA
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dr. Sherina Abraham</h2>
              <p className="text-slate-400 text-sm">Medical Doctor &middot; Investor &middot; C-Suite Executive</p>
            </div>
          </div>

          <blockquote className="mt-8 border-l-2 border-emerald-400/50 pl-5">
            <p className="text-white font-serif italic text-lg leading-relaxed">Humanity is her cause.</p>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              In every humanly way possible, she champions integrated solutions across health, education, and
              community — building a legacy that outlives any single discipline, creating ripples of change that
              touch one life at a time.
            </p>
          </blockquote>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Sectors Served</p>
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <span key={s} className="text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — stats, credentials, partners */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-1.5 text-[11px] text-slate-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {credentials.map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <p className="text-white font-semibold mb-2">{c.title}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Rooted in Vision 2030's pillars and woven into the national objectives of multiple Saudi
            ministries — commended by His Highness Prince Mohammed bin Salman — her initiative aligns
            education with global job market demands, directly supporting the Human Capability Development
            Program, Quality of Life 2030, and the National Strategy for Data &amp; AI.
          </p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Trusted Across</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {partners.map((p) => (
                <span key={p} className="text-xs text-slate-500">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Founder;
