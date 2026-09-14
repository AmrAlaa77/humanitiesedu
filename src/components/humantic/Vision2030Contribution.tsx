import React from 'react';

/**
 * The "Vision 2030 Contribution" card -- moved out of NarrativeReel's homepage hero (where it
 * sat as a side-by-side grid column) and onto the QoL 2030 Initiative page, consolidating the
 * Vision 2030 -related content onto a single page. Content and the native <details> "+ Read
 * more" disclosures are unchanged, just re-wrapped as its own section.
 */
const Vision2030Contribution: React.FC = () => (
  <section className="relative py-16 sm:py-20">
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">2023&ndash;2026</p>
        <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
          Vision 2030 Contribution
        </h3>
        <p className="mt-1 text-emerald-400 text-[11px] font-semibold uppercase tracking-widest">
          Initiative Implementation, Kingdom-Wide
        </p>
        <ul className="mt-5 space-y-5 text-sm leading-relaxed text-slate-300">
          <li>
            <details className="group">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="mb-1.5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Human Capability Development
                </span>
                <span className="line-clamp-2 group-open:hidden">
                  Led the fully-funded Saudi Career Development Program, awarding British-accredited
                  certifications to 70+ nationals at King Saud bin Abdulaziz University for Health Sciences.
                </span>
                <span className="hidden group-open:inline">
                  Led the fully-funded Saudi Career Development Program, awarding British-accredited
                  certifications to 70+ nationals at King Saud bin Abdulaziz University for Health Sciences.
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-cyan-400 group-open:hidden">+ Read more</span>
              </summary>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="mb-1.5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Tourism &amp; Quality of Life 2030
                </span>
                <span className="line-clamp-2 group-open:hidden">
                  Delivered educational programs equipping national talent to lead within the Royal
                  Commission for AlUla&rsquo;s touristic sites, aligned with Quality of Life 2030 and the
                  UN&rsquo;s Sustainable Development Goal domains &mdash; building Saudi, a country one can
                  call home.
                </span>
                <span className="hidden group-open:inline">
                  Delivered educational programs equipping national talent to lead within the Royal
                  Commission for AlUla&rsquo;s touristic sites, aligned with Quality of Life 2030 and the
                  UN&rsquo;s Sustainable Development Goal domains &mdash; building Saudi, a country one can
                  call home.
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-cyan-400 group-open:hidden">+ Read more</span>
              </summary>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="mb-1.5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  A Call to Serve &middot; Healthcare
                </span>
                <span className="line-clamp-2 group-open:hidden">
                  Bespoke programs on health, safety and wellbeing across National Guard Health Affairs, King
                  Salman Hospital, King Abdulaziz Medical City, King Salman Specialist Children&rsquo;s
                  Hospital, and King Abdullah Medical City.
                </span>
                <span className="hidden group-open:inline">
                  Bespoke programs on health, safety and wellbeing across National Guard Health Affairs, King
                  Salman Hospital, King Abdulaziz Medical City, King Salman Specialist Children&rsquo;s
                  Hospital, and King Abdullah Medical City.
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-cyan-400 group-open:hidden">+ Read more</span>
              </summary>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default Vision2030Contribution;
