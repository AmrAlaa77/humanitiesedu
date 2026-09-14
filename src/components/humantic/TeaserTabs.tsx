import React, { useState } from 'react';
import HeroLink from './HeroLink';
import QualityOfLifeLink from './QualityOfLifeLink';
import JourneyLink from './JourneyLink';
import AwarenessJourneyLink from './AwarenessJourneyLink';

const tabs = [
  { label: 'Wellbeing Index', Card: HeroLink },
  { label: 'QoL 2030', Card: QualityOfLifeLink },
  { label: 'Journey', Card: JourneyLink },
  { label: 'Aurion', Card: AwarenessJourneyLink },
];

/**
 * Tab switcher for the four homepage teaser cards -- reusing the same click-to-expand pattern
 * as the Pledge credentials tabs, so only one card shows at a time instead of four stacked full
 * cards competing for scroll attention.
 */
const TeaserTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const ActiveCard = tabs[active].Card;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
              i === active
                ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200'
                : 'border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <ActiveCard />
      </div>
    </div>
  );
};

export default TeaserTabs;
