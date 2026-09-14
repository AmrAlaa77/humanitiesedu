import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import AurionHero from '@/components/aurion/AurionHero';
import AurionIntel from '@/components/aurion/AurionIntel';
import Hero from '@/components/humantic/Hero';
import AwarenessJourney from '@/components/humantic/AwarenessJourney';
import VitalMonitoring from '@/components/humantic/VitalMonitoring';
import AurionFeatures from '@/components/aurion/AurionFeatures';
import AurionShowcase from '@/components/aurion/AurionShowcase';
import Footer from '@/components/humantic/Footer';
import AccessModal from '@/components/humantic/AccessModal';

const Aurion: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const open = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased selection:bg-teal-300/30">
      {/* Slim top bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-950/90 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Humantic
          </Link>
          <span className="text-white font-semibold tracking-[0.3em] text-sm">AURION ONE</span>
          <button
            onClick={open}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 text-slate-950 text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-teal-400/20"
          >
            Reserve
          </button>
        </div>
      </header>

      <main>
        <AurionHero onCta={open} />
        <Hero onCta={open} />
        <AurionIntel />

        {/* the rest of the page (monitoring detail, feature grid, showcase) stays collapsed by
            default so the page reads short -- See More expands it inline, no navigation away */}
        <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${showMore ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <AwarenessJourney />
            <VitalMonitoring />
            <AurionFeatures />
            <AurionShowcase onCta={open} />
          </div>
        </div>

        <div className="flex justify-center py-10 border-t border-white/5">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 text-slate-200 text-sm font-semibold hover:bg-white/5 hover:border-teal-300/30 transition-all duration-200 active:scale-95"
          >
            {showMore ? 'See less' : 'See more'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </main>

      <Footer />
      <AccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Aurion;
