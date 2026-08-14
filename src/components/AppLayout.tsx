import React, { useState } from 'react';
import Navbar from '@/components/humantic/Navbar';
import HumanReel from '@/components/humantic/HumanReel';
import NarrativeReel from '@/components/humantic/NarrativeReel';
import Hero from '@/components/humantic/Hero';
import Features from '@/components/humantic/Features';

import HowItWorks from '@/components/humantic/HowItWorks';
import Assessment from '@/components/humantic/Assessment';
import Showcase from '@/components/humantic/Showcase';
import Insights from '@/components/humantic/Insights';
import Deliverables from '@/components/humantic/Deliverables';
import Pillar from '@/components/humantic/Pillar';
import Journey from '@/components/humantic/Journey';
import Evolution from '@/components/humantic/Evolution';
import Footer from '@/components/humantic/Footer';
import AccessModal from '@/components/humantic/AccessModal';
import GlowCursor from '@/components/humantic/GlowCursor';
import Reveal from '@/components/humantic/Reveal';
import ScrollProgress from '@/components/humantic/ScrollProgress';
import AmbientBackground from '@/components/humantic/AmbientBackground';

const AppLayout: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30 md:cursor-none">
      <style>{`@keyframes progress{0%{width:0%}50%{width:70%}100%{width:100%}}`}</style>

      <AmbientBackground />
      <GlowCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <Navbar onCta={() => setModalOpen(true)} />
        <main>
          {/* HumanReel is the new first page; NarrativeReel is now the second page */}
          <HumanReel />
          <NarrativeReel onCta={() => setModalOpen(true)} />
          <Hero onCta={() => setModalOpen(true)} />

          <Reveal variant="up">
            <Features />
          </Reveal>


          <Reveal variant="left">
            <HowItWorks />
          </Reveal>

          <Reveal variant="blur">
            <Assessment />
          </Reveal>

          <Reveal variant="right">
            <Showcase />
          </Reveal>

          <Reveal variant="up">
            <Insights />
          </Reveal>

          <Reveal variant="up">
            <Deliverables />
          </Reveal>

          <Reveal variant="flip">
            <Pillar />
          </Reveal>

          <Reveal variant="up">
            <Journey onCta={() => setModalOpen(true)} />
          </Reveal>


          <Reveal variant="up">
            <Evolution />
          </Reveal>
        </main>
        <Footer />
      </div>

      <AccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
