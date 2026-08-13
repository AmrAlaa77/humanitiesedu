import React from 'react';

/**
 * AmbientBackground — a fixed, full-screen atmospheric layer.
 *
 * NOTE: The blobs are now STATIC (no continuous animation) and use lighter
 * blur values. The previously animated, heavily-blurred aurora blobs forced
 * the browser to repaint a large area every frame, which produced the lag
 * users noticed when navigating between pages. Keeping them static removes
 * that cost while preserving the subtle cinematic depth.
 */
const AmbientBackground: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Static aurora blobs (no animation = no per-frame repaint) */}
      <div className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-emerald-500/10 blur-[90px]" />
      <div className="absolute top-1/3 -right-32 h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-[90px]" />
      <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[90px]" />

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
};

export default AmbientBackground;
