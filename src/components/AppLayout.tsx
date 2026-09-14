import React, { useState } from 'react';
import Navbar from '@/components/humantic/Navbar';
import HumanReel from '@/components/humantic/HumanReel';
import AwarenessJourney from '@/components/humantic/AwarenessJourney';
import NarrativeReel from '@/components/humantic/NarrativeReel';
import ExperienceLink from '@/components/humantic/ExperienceLink';
import HeroLink from '@/components/humantic/HeroLink';

import Assessment from '@/components/humantic/Assessment';
import Deliverables from '@/components/humantic/Deliverables';
import Pillar from '@/components/humantic/Pillar';
import LivingMatrix from '@/components/humantic/LivingMatrix';
import WhoWeAre from '@/components/humantic/WhoWeAre';
import JourneyLink from '@/components/humantic/JourneyLink';
import QualityOfLifeLink from '@/components/humantic/QualityOfLifeLink';
import NationalIndex from '@/components/humantic/NationalIndex';
import Pledge from '@/components/humantic/Pledge';
import Footer from '@/components/humantic/Footer';
import AccessModal from '@/components/humantic/AccessModal';
import GlowCursor from '@/components/humantic/GlowCursor';
import Reveal from '@/components/humantic/Reveal';
import ScrollProgress from '@/components/humantic/ScrollProgress';
import AmbientBackground from '@/components/humantic/AmbientBackground';
import IntroSequence from '@/components/humantic/IntroSequence';

const AppLayout: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30 md:cursor-none">
      <style>{`@keyframes progress{0%{width:0%}50%{width:70%}100%{width:100%}}`}</style>

      <IntroSequence />
      <AmbientBackground />
      <GlowCursor />
      <ScrollProgress />

      <div className="relative z-10">
        <Navbar onCta={() => setModalOpen(true)} />
        <main>
          {/* HumanReel is the first page; NarrativeReel (the "Let's realign bio-vitality" / Who We
              Are section) sits directly after it -- that's the one matching the reference
              screenshots, not Hero. AwarenessJourney and Hero follow after. */}
          <HumanReel />

          <section className="relative py-12 sm:py-16">
            <p className="max-w-2xl mx-auto px-5 text-center italic text-base sm:text-lg leading-relaxed text-slate-300">
              Every human has a story.
              <br />
              We listen beyond the data &mdash; to understand the human behind it.
            </p>
          </section>

          <NarrativeReel onCta={() => setModalOpen(true)} />

          <Reveal variant="left" repeat>
            <LivingMatrix />
          </Reveal>

          <Reveal variant="up" repeat>
            <WhoWeAre />
          </Reveal>

          <ExperienceLink />
          <AwarenessJourney />
          <HeroLink />

          <Reveal variant="right" repeat>
            <NationalIndex />
          </Reveal>

          <Reveal variant="blur" repeat>
            <Assessment />
          </Reveal>

          <Reveal variant="up" repeat>
            <Deliverables />
          </Reveal>

          <Reveal variant="flip" repeat>
            <Pillar />
          </Reveal>

          <Reveal variant="right" repeat>
            <JourneyLink />
          </Reveal>

          <Reveal variant="zoom" repeat>
            <QualityOfLifeLink />
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
