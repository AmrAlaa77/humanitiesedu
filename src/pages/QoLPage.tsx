import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QualityOfLife from '@/components/humantic/QualityOfLife';
import Vision2030Contribution from '@/components/humantic/Vision2030Contribution';
import SDGAlignment from '@/components/humantic/SDGAlignment';
import Footer from '@/components/humantic/Footer';
import AmbientBackground from '@/components/humantic/AmbientBackground';
import GlowCursor from '@/components/humantic/GlowCursor';
import ScrollProgress from '@/components/humantic/ScrollProgress';

/**
 * Standalone page for the UN Habitat Quality of Life section -- moved off the homepage, titled
 * "QoL 2030 Initiative" per feedback. QualityOfLife.tsx itself is unchanged. Same ambient motion
 * layers as FounderPage/JourneyPage/Aurion so it doesn't read as static next to the homepage.
 */
const QoLPage: React.FC = () => (
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
          <span className="text-white font-semibold tracking-[0.3em] text-sm">QOL 2030 INITIATIVE</span>
          <span className="w-[132px]" aria-hidden />
        </div>
      </header>

      <main>
        <QualityOfLife />
        <Vision2030Contribution />
        <SDGAlignment />
      </main>

      <Footer />
    </div>
  </div>
);

export default QoLPage;
