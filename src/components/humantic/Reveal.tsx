import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

type Variant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'flip';

interface RevealProps {
  children: React.ReactNode;
  /** Direction of the entrance. Kept for API compatibility; mapped to a
   *  minimal, subtle motion. */
  variant?: Variant;
  /** Stagger delay in ms. */
  delay?: number;
  /** If true, re-animates each time it enters the viewport. Default false. */
  repeat?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Reveal — minimal, fail-safe scroll entrance animation.
 *
 * Uses `useInView` which has a safety timeout + observer fallback, so a
 * section can NEVER stay hidden (the old glitch). The motion itself is
 * intentionally subtle: a short fade + small upward slide.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  repeat = false,
  className,
  as: Tag = 'div',
}) => {
  const { ref, inView } = useInView<HTMLElement>({ once: !repeat });

  return (
    <Tag
      ref={ref as React.Ref<any>}
      className={cn('ao-reveal', `ao-v-${variant}`, inView && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
