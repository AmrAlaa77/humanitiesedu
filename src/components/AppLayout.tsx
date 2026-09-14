import React, { useState } from 'react';
import Navbar from '@/components/humantic/Navbar';
import HumanReel from '@/components/humantic/HumanReel';
import NarrativeReel from '@/components/humantic/NarrativeReel';
import HeroLink from '@/components/humantic/HeroLink';
import AwarenessJourneyLink from '@/components/humantic/AwarenessJourneyLink';

import Assessment from '@/components/humantic/Assessment';
import Deliverables from '@/components/humantic/Deliverables';
import Pillar from '@/components/humantic/Pillar';
import JourneyLink from '@/components/humantic/JourneyLink';
import QualityOfLifeLink from '@/components/humantic/QualityOfLifeLink';
import NationalIndex from '@/components/humantic/NationalIndex';
import Footer from '@/components/humantic/Footer';
import AccessModal from '@/components/humantic/AccessModal';
import GlowCursor from '@/components/humantic/GlowCursor';
import Reveal from '@/components/humantic/Reveal';
import ScrollProgress from '@/components/humantic/ScrollProgress';
import AmbientBackground from '@/components/humantic/AmbientBackground';
import TwinklingStarfield from '@/components/humantic/TwinklingStarfield';
import IntroSequence from '@/components/humantic/IntroSequence';

const AppLayout: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30 md:cursor-none">
      <style>{`@keyframes progress{0%{width:0%}50%{width:70%}100%{width:100%}}`}</style>

      <IntroSequence />
      <AmbientBackground />
      <TwinklingStarfield />
      <GlowCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <Navbar onCta={() => setModalOpen(true)} />
        <main>
          {/* HumanReel is the first page; NarrativeReel (the "Let's realign bio-vitality" / Who We
              Are section) sits directly after it -- that's the one matching the reference
              screenshots, not Hero. AwarenessJourney and Hero follow after. */}
          <HumanReel />

          <NarrativeReel onCta={() => setModalOpen(true)} />

          <Reveal variant="flip" repeat>
            <Pillar />
          </Reveal>

          <Reveal variant="right" repeat>
            <NationalIndex />
          </Reveal>

          <Reveal variant="blur" repeat>
            <Assessment />
          </Reveal>

          <Reveal variant="up" repeat>
            <Deliverables />
          </Reveal>

          <Reveal variant="up" repeat>
            <section className="relative py-20 sm:py-28">
              <div className="max-w-5xl mx-auto grid gap-6 px-5 sm:grid-cols-2 sm:px-8">
                <HeroLink />
                <QualityOfLifeLink />
                <JourneyLink />
                <AwarenessJourneyLink />
              </div>
            </section>
          </Reveal>
        </main>
        <Footer />
      </div>

      <AccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
