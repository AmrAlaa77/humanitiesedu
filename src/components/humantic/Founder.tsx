import React from 'react';
import { GraduationCap, Award, Globe2, Building2 } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { useCountUp, parseCountTarget } from '@/hooks/use-count-up';
import { useTilt } from '@/hooks/use-tilt';

const stats = [
  { value: '17', label: 'Years building HumanticDigital' },
  { value: '15', label: 'Markets across 5 continents' },
  { value: '2018–2026', label: 'British accreditation' },
  { value: '5', label: 'Royal Saudi hospital partnerships' },
  { value: '20,000', label: 'Semi/fully funded certifications exclusive for Saudi nationals, 2023–2026' },
];

const sectors = [
  'Education', 'Healthcare', 'Mining', 'Defense', 'Diplomatic & Consular', 'Global Technology',
  'Aviation', 'Pharmaceuticals', 'Tech Giants', 'Banking', 'Construction',
];

const credentials = [
  {
    icon: GraduationCap,
    title: 'Academic Foundation',
    desc: 'Medicine & Surgery + Biology — specialization in behavioral consulting based on physiology and neurobiology.',
  },
  {
    icon: Award,
    title: 'Honor & Recognition',
    desc: 'Badge of Honor, Ministry of Human Resources & Social Development, in recognition of multidisciplinary, science-based educational content.',
  },
  {
    icon: Building2,
    title: 'Leadership',
    desc: 'Chair, CSO & CEO of Humantic Digital (MISA approved). Chief Strategy Officer & MENA Regional Partner.',
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
  'GIZ German Cooperation', 'Alnafitha IT', 'SGS Aviation Services', 'SAAS',
  'King Saud bin Abdulaziz University for Health Sciences', 'King Fahd University of Petroleum and Minerals',
];

const Founder: React.FC = () => {
  const rooted = useInView<HTMLParagraphElement>({ once: false });
  const trusted = useInView<HTMLDivElement>({ once: false });

  return (
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

        </div>

        {/* Right — stats, credentials, partners */}
        {/* min-w-0: without it, the partner rail's intrinsically-wide (w-max, all names
            unwrapped) track contributes its full content width to this grid column's auto-sizing
            and blows the whole column out to thousands of px wide, pushing the page into
            horizontal overflow site-wide -- exactly the kind of thing that would make an
            unrelated hairline seam elsewhere suddenly reappear. */}
        <div className="min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {stats.map((s) => (
              <StatCard key={s.label} s={s} />
            ))}
          </div>

        </div>
      </div>

      {/* Sectors Served, broken out of the left column -- full width of the section, left-aligned,
          tags wrapping in default left-to-right flow (per the user's own external mockup). */}
      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Sectors Served</p>
        <div className="flex flex-wrap gap-2">
          {sectors.map((s) => (
            <span key={s} className="text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-emerald-400/40 hover:text-white hover:bg-emerald-400/10">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Credentials, breaking out of the two-column grid above (was confined to the right
          column's width) -- full width of the section, spanning both columns. */}
      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        {credentials.map((c) => (
          <CredentialCard key={c.title} c={c} />
        ))}
      </div>

      {/* Paragraph now sits right under the credentials above. */}
      <p
        ref={rooted.ref}
        className={`w-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 mt-10 text-slate-400 text-sm leading-relaxed mb-8 text-right transition-opacity duration-700 ease-out ${
          rooted.inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Rooted in Vision 2030's pillars and woven into the national objectives of multiple Saudi
        ministries — commended by His Highness Prince Mohammed bin Salman — her initiative aligns
        education with global job market demands, directly supporting the Human Capability Development
        Program, Quality of Life 2030, and the National Strategy for Data &amp; AI.
      </p>

      {/* Closing element of the bio, set apart with its own top border + spacing so it reads as
          the section's final beat rather than crowding the credentials above it. */}
      <div
        ref={trusted.ref}
        className={`w-full mt-10 pt-8 border-t border-white/10 transition-opacity duration-700 ease-out ${
          trusted.inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">Trusted Across</p>
        {/* Auto-scrolling wordmark rail — bold white type standing in for logos (we don't hold
            authentic logo artwork for these organisations, several of which are trademarked
            corporate marks; a text rail gets the same "trusted by" motion without that risk). */}
        <div
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={(e) => (e.currentTarget.querySelector<HTMLElement>('.partner-track')!.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.querySelector<HTMLElement>('.partner-track')!.style.animationPlayState = 'running')}
        >
          <div className="partner-track flex w-max items-center gap-8" style={{ animation: 'partnerRail 48s linear infinite' }}>
            {[...partners, ...partners].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="shrink-0 text-xs sm:text-sm font-normal text-teal-300 tracking-tight whitespace-nowrap transition-colors hover:text-teal-200"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes partnerRail {
            /* translateX(%) here is relative to the track's OWN width (it's several thousand
               px wide, unwrapped), so a "start further right" offset like 40% was actually a
               ~2800px jump -- enough to push every name clean out of the visible window. 0%
               is the correct, fully-visible starting point; -50% is exactly one full
               (un-duplicated) list-length, which is what makes the loop back to 0% seamless. */
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  </section>
  );
};

// Own useInView instance per stat, so each counts up individually the moment
// IT scrolls into view (same pattern as Evolution's TimelineItem) rather than
// all firing together off one shared observer on the grid container.
const StatCard: React.FC<{ s: (typeof stats)[number] }> = ({ s }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const target = parseCountTarget(s.value);
  const count = useCountUp(target ?? 0, inView && target !== null);
  // Non-numeric values (e.g. the "2018–2026" accreditation range) render as-is —
  // there's nothing to count up to.
  const display = target !== null ? count.toLocaleString('en-US') : s.value;

  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]"
    >
      <div className="text-3xl font-bold text-white tabular-nums transition-transform duration-300 group-hover:scale-110">{display}</div>
      <div className="mt-1.5 text-[11px] text-slate-500 leading-tight">{s.label}</div>
    </div>
  );
};

// 3D cursor-tilt on each credential card -- rotates toward the pointer within
// its own bounds via useTilt, snapping back flat on mouse leave.
const CredentialCard: React.FC<{ c: (typeof credentials)[number] }> = ({ c }) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(6);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-[transform,background-color,border-color] duration-300 hover:border-emerald-400/30 hover:bg-white/[0.04] will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        <c.icon className="w-5 h-5 text-emerald-300" />
      </div>
      <p className="text-white font-semibold mb-2">{c.title}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
    </div>
  );
};

export default Founder;
