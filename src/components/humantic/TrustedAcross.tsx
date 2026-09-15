import React from 'react';
import { useInView } from '@/hooks/use-in-view';

const partners = [
  'Saudi Aramco', 'Ma’aden', 'King Salman Hospital', 'King Abdullah Medical City',
  'National Guard Health Affairs', 'Royal Commission for AlUla', 'U.S. Embassy', 'Embassy of Saudi Arabia',
  'Mubadala', 'PepsiCo', 'Unilever', 'Nestlé', 'Mars Incorporated', 'Google', 'Siemens',
  'GIZ German Cooperation', 'Alnafitha IT', 'SGS Aviation Services', 'SAAS',
  'King Saud bin Abdulaziz University for Health Sciences', 'King Fahd University of Petroleum and Minerals',
  'Roads & Transport Authority, Dubai', 'Valeo', 'Kuwait Energy', 'Philip Morris International',
  'Maersk Drilling', 'Shell', 'BP', 'BG Group', 'Nabors',
];

// Each row's track renders as [...row, ...row] for a seamless scroll loop -- if a row is too
// short, both copies fit on screen at once and the same name visibly repeats mid-rail. So the
// row count is derived from a minimum row length, not fixed, guaranteeing every row is long
// enough that the duplicate half is always scrolled off-screen.
const MIN_PARTNERS_PER_ROW = 10;
const PARTNER_ROW_COUNT = Math.max(1, Math.floor(partners.length / MIN_PARTNERS_PER_ROW));
const partnerRows: string[][] = (() => {
  const size = Math.ceil(partners.length / PARTNER_ROW_COUNT);
  return Array.from({ length: PARTNER_ROW_COUNT }, (_, i) => partners.slice(i * size, i * size + size)).filter(
    (row) => row.length > 0
  );
})();

/**
 * "Trusted Across" partner-name rail -- moved off the Founder page and onto the end of the
 * homepage (after the Wellbeing Index / QoL 2030 / Journey / Aurion teaser tabs) so it closes
 * out the main site instead of being buried on a sub-page.
 */
const TrustedAcross: React.FC = () => {
  const trusted = useInView<HTMLDivElement>({ once: false });

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div
        ref={trusted.ref}
        className={`max-w-7xl mx-auto px-5 sm:px-8 transition-opacity duration-700 ease-out ${
          trusted.inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">Trusted Across</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center mb-6 leading-snug">
          One shared standard &mdash; continents wide, sectors wide, no wonder.
          <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            We hit humanity at the core.
          </span>
        </h3>
        {/* Five independently auto-scrolling rows, alternating direction, instead of one static
            grid or one long single-row marquee -- bold outlined type standing in for logos (we
            don't hold authentic logo artwork for these organisations, several of which are
            trademarked corporate marks). */}
        <div className="space-y-3">
          {partnerRows.map((row, ri) => (
            <div
              key={ri}
              className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
              onMouseEnter={(e) => (e.currentTarget.querySelector<HTMLElement>('.partner-track')!.style.animationPlayState = 'paused')}
              onMouseLeave={(e) => (e.currentTarget.querySelector<HTMLElement>('.partner-track')!.style.animationPlayState = 'running')}
            >
              <div
                className="partner-track flex w-max items-center gap-3"
                style={{ animation: `${ri % 2 === 0 ? 'partnerRail' : 'partnerRailRev'} 80s linear infinite` }}
              >
                {[...row, ...row].map((p, i) => (
                  <span
                    key={`${p}-${i}`}
                    className="shrink-0 text-xs sm:text-sm font-normal text-teal-300 tracking-tight whitespace-nowrap px-4 py-2 transition-colors hover:text-teal-200"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes partnerRail { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes partnerRailRev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        `}</style>
      </div>
    </section>
  );
};

export default TrustedAcross;
