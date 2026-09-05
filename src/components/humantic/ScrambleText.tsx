import React, { useEffect, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Character-shuffle "decode-in" effect: on activation, cycles every character through random
 * glyphs before settling on the real text, left-to-right. Purely additive -- while inactive it
 * just renders the real text, so there's no flash-of-scrambled-content on first paint or for
 * users with JS disabled/slow. Pair with useInView so it fires once, the moment the text scrolls
 * into view, rather than replaying on every re-render.
 */
export const ScrambleText: React.FC<{ text: string; active: boolean; className?: string; frames?: number; speedMs?: number }> = ({
  text,
  active,
  className,
  frames = 18,
  speedMs = 30,
}) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealCount = Math.floor((frame / frames) * text.length);
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < revealCount) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      if (frame >= frames) {
        setDisplay(text);
        clearInterval(id);
      }
    }, speedMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, text]);

  return <span className={className}>{display}</span>;
};

export default ScrambleText;
