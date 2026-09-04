import React, { useState } from 'react';
import Navbar from '@/components/humantic/Navbar';
import HumanReel from '@/components/humantic/HumanReel';
import AwarenessJourney from '@/components/humantic/AwarenessJourney';
import NarrativeReel from '@/components/humantic/NarrativeReel';
import Hero from '@/components/humantic/Hero';
import Features from '@/components/humantic/Features';

import Assessment from '@/components/humantic/Assessment';
import Insights from '@/components/humantic/Insights';
import Deliverables from '@/components/humantic/Deliverables';
import Pillar from '@/components/humantic/Pillar';
import LivingMatrix from '@/components/humantic/LivingMatrix';
import Journey from '@/components/humantic/Journey';
import Evolution from '@/components/humantic/Evolution';
import QualityOfLife from '@/components/humantic/QualityOfLife';
import NationalIndex from '@/components/humantic/NationalIndex';
import SDGAlignment from '@/components/humantic/SDGAlignment';
import Founder from '@/components/humantic/Founder';
import Pledge from '@/components/humantic/Pledge';
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
          {/* HumanReel is the first page; AwarenessJourney sits directly after it, NarrativeReel follows */}
          <HumanReel />
          <AwarenessJourney />
          <NarrativeReel onCta={() => setModalOpen(true)} />
          <Hero onCta={() => setModalOpen(true)} />

          <Reveal variant="right" repeat>
            <NationalIndex />
          </Reveal>

          <Reveal variant="blur" repeat>
            <Assessment />
          </Reveal>

          <Reveal variant="up" repeat>
            <Features />
          </Reveal>

          <Reveal variant="zoom" repeat>
            <Insights />
          </Reveal>

          <Reveal variant="up" repeat>
            <Deliverables />
          </Reveal>

          <Reveal variant="flip" repeat>
            <Pillar />
          </Reveal>

          <Reveal variant="left" repeat>
            <LivingMatrix />
          </Reveal>

          <Reveal variant="right" repeat>
            <Journey onCta={() => setModalOpen(true)} />
          </Reveal>

          <Reveal variant="left" repeat>
            <Evolution />
          </Reveal>

          <Reveal variant="zoom" repeat>
            <QualityOfLife />
          </Reveal>

          <Reveal variant="left" repeat>
            <SDGAlignment />
          </Reveal>

          <Reveal variant="up" repeat>
            <Founder />
          </Reveal>

          <Reveal variant="zoom" repeat>
            <Pledge />
          </Reveal>
        </main>
        <Footer />
      </div>

      <AccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
