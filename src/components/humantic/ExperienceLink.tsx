import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

/**
 * A quiet, cinematic doorway that sits right after the Humantic intro pages and invites the
 * visitor into the standalone immersive scene (a revolving neural brain + DNA helix) served
 * from /experience. Opens in a new tab so the main narrative is never lost.
 */
const ExperienceLink: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });

  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <a
          ref={ref}
          href="/experience"
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 sm:p-12 transition-all duration-700 ease-out hover:border-emerald-400/40 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em]">
                Human + Digital Intelligence
              </p>
              <h3 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-xl">
                Step inside the human engine
              </h3>
              <p className="mt-3 text-slate-400 max-w-lg leading-relaxed">
                A revolving neural brain and living DNA helix &mdash; an immersive way to see how
                behaviour becomes data, and data becomes capability.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition-transform duration-300 group-hover:translate-x-1">
              Enter the experience
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default ExperienceLink;
