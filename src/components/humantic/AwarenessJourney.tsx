import React from 'react';
import { Sparkles, CircleDot, Watch } from 'lucide-react';

/**
 * Editorial, serif-set section placed directly after the HUMAN hero reel —
 * a warm, quiet counterpoint to the reel's kinetic energy. Two-step story
 * (awareness, then personal) closing on a single italic line.
 */

const AwarenessJourney: React.FC = () => (
  <section className="relative py-24 sm:py-28 bg-[#1a1a1a] text-white">
    <div className="max-w-3xl mx-auto px-6 sm:px-8">
      <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.25em]">Humantic Digital</span>

      <h2 className="mt-5 font-serif text-3xl sm:text-4xl leading-snug text-white">
        Technology built to feel human — decoding how the body copes and the mind works, in language everyone
        can understand.
      </h2>

      <div className="mt-14 space-y-10">
        <div className="flex gap-5">
          <div className="shrink-0 w-11 h-11 rounded-full bg-white/5 border border-amber-300/20 flex items-center justify-center">
            <CircleDot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-white">First, awareness.</h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              Hybrid Awareness Classes · In-Person + Digital
            </p>
            <p className="mt-3 text-slate-300 leading-relaxed">
              One clear picture drawn from three sciences — how people function under pressure, over time, and
              alongside each other — made teachable for every age.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="shrink-0 w-11 h-11 rounded-full bg-white/5 border border-amber-300/20 flex items-center justify-center">
            <Watch className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-white">Then, it gets personal.</h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              A wearable that listens to your body and hands the understanding back to you: how you're really
              doing, what's changing, and where a small shift now saves you later.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-10 border-t border-white/10">
        <p className="font-serif italic text-lg sm:text-xl text-amber-200/90 leading-relaxed">
          Preventative medicine, before the body has to suffer — safeguarding your health, your wellbeing, and
          the relationships you'd otherwise lose.
        </p>
      </div>
    </div>
  </section>
);

export default AwarenessJourney;
