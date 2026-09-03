import React from 'react';
import { CircleDot, Watch } from 'lucide-react';

/**
 * Sits directly after the HUMAN hero reel. Two-step story (awareness, then
 * personal) closing on a single line — styled to match the rest of the
 * site's design language (same palette/typography as HowItWorks etc.),
 * not a standalone visual treatment.
 */

const AwarenessJourney: React.FC = () => (
  <section className="relative py-24 bg-slate-950 text-white">
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Humantic Digital</span>

      <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
        Technology built to feel human — decoding how the body copes and the mind works, in language everyone
        can understand.
      </h2>

      <div className="mt-12 space-y-8">
        <div className="flex gap-5">
          <div className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <CircleDot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">First, awareness.</span>
            <h3 className="mt-1 text-white font-semibold text-lg">Hybrid Awareness Classes</h3>
            <p className="mt-1 text-slate-500 text-xs font-semibold uppercase tracking-wide">In-Person + Digital</p>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              One clear picture drawn from three sciences — how people function under pressure, over time, and
              alongside each other — made teachable for every age.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Watch className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Then, it gets personal.</span>
            <h3 className="mt-1 text-white font-semibold text-lg">A Wearable That Understands You</h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              A wearable that listens to your body and hands the understanding back to you: how you're really
              doing, what's changing, and where a small shift now saves you later.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-12 text-slate-300 text-base sm:text-lg leading-relaxed">
        Preventative medicine, before the body has to suffer — safeguarding your health, your wellbeing, and the
        relationships you'd otherwise lose.
      </p>
    </div>
  </section>
);

export default AwarenessJourney;
