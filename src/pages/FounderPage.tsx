import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Founder from '@/components/humantic/Founder';
import Footer from '@/components/humantic/Footer';

/**
 * Standalone page for the Founder section -- moved off the homepage per the site's
 * "minimal text, click through for detail" pattern (same move already made for Aurion's
 * Platform features). Founder.tsx itself is unchanged; this page just gives it its own
 * header/back-link/footer, matching how Aurion.tsx wraps its own content.
 */
const FounderPage: React.FC = () => (
  <div className="min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30">
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Humantic
        </Link>
        <span className="text-white font-semibold tracking-[0.3em] text-sm">FOUNDER</span>
        <span className="w-[132px]" aria-hidden />
      </div>
    </header>

    <main>
      <Founder />
    </main>

    <Footer />
  </div>
);

export default FounderPage;
