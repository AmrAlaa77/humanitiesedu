import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Journey from '@/components/humantic/Journey';
import Evolution from '@/components/humantic/Evolution';
import Footer from '@/components/humantic/Footer';
import AccessModal from '@/components/humantic/AccessModal';

/**
 * Standalone page for the Journey + Evolution sections -- moved off the homepage per the site's
 * "minimal text, click through for detail" pattern (same move already made for Founder and
 * Aurion's Platform features). Journey.tsx and Evolution.tsx are unchanged -- every tab, animation
 * and interaction stays exactly as it was, just re-homed with their own header/back-link/footer.
 */
const JourneyPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30">
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Humantic
          </Link>
          <span className="text-white font-semibold tracking-[0.3em] text-sm">JOURNEY</span>
          <span className="w-[132px]" aria-hidden />
        </div>
      </header>

      <main>
        <Evolution />
        <Journey onCta={() => setModalOpen(true)} />
      </main>

      <Footer />
      <AccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default JourneyPage;
