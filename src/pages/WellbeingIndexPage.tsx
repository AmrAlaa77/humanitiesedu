import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Hero from '@/components/humantic/Hero';
import Footer from '@/components/humantic/Footer';
import AccessModal from '@/components/humantic/AccessModal';
import AmbientBackground from '@/components/humantic/AmbientBackground';
import GlowCursor from '@/components/humantic/GlowCursor';
import ScrollProgress from '@/components/humantic/ScrollProgress';

/**
 * Standalone page for the Wellbeing Index hero ("Know your body before it speaks.") -- moved off
 * the homepage per the same "minimal text, click through for detail" pattern. Hero.tsx itself is
 * unchanged. Same ambient motion layers as Founder/Journey/QoL pages.
 */
const WellbeingIndexPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30 md:cursor-none">
      <AmbientBackground />
      <GlowCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Humantic
            </Link>
            <span className="text-white font-semibold tracking-[0.3em] text-sm">WELLBEING INDEX</span>
            <span className="w-[132px]" aria-hidden />
          </div>
        </header>

        <main>
          <Hero onCta={() => setModalOpen(true)} />
        </main>

        <Footer />
      </div>

      <AccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default WellbeingIndexPage;
