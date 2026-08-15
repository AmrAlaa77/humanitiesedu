import React, { useState, useEffect } from 'react';
import { Play, X, Film, Share2, Filter } from 'lucide-react';
import { Reel, loadReels } from '@/lib/reels';

const cats = ['All', 'Explainer', 'Tech', 'Health', 'Lifestyle'];

const Player: React.FC<{ reel: Reel }> = ({ reel }) => {
  if (reel.type === 'youtube') {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${reel.src}?autoplay=1&rel=0&modestbranding=1`}
        title={reel.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (reel.type === 'vimeo') {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://player.vimeo.com/video/${reel.src}?autoplay=1&title=0&byline=0&portrait=0`}
        title={reel.title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover bg-black"
      src={reel.src}
      poster={reel.poster}
      controls
      autoPlay
      playsInline
    />
  );
};

const Showcase: React.FC = () => {
  const [active, setActive] = useState('All');
  const [open, setOpen] = useState<Reel | null>(null);
  const [reels, setReels] = useState<Reel[]>(() => loadReels());

  useEffect(() => {
    const refresh = () => setReels(loadReels());
    window.addEventListener('humantic-reels-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('humantic-reels-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const filtered = active === 'All' ? reels : reels.filter((r) => r.cat === active);

  const share = (r: Reel) => {
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: r.title, url }).catch(() => {});
    else { navigator.clipboard?.writeText(url); alert('Link copied to clipboard'); }
  };

  return (
    <section id="showcase" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
              <Film className="w-4 h-4" /> Reel Showcase
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white tracking-tight">Our story in motion</h2>
            <p className="mt-4 text-slate-400 text-lg">{reels.length === 0 ? 'A new film showing how Humantic Digital reimagines preventative medicine is on the way.' : 'A curated reel of how Humantic Digital reimagines preventative medicine.'}</p>
            <p className="mt-3 text-white font-medium">
              Human + Machine Intelligence. <span className="text-emerald-400">Why the wait?</span>
            </p>
          </div>
          {reels.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-500" />
              {cats.map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    active === c ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950' : 'border border-white/15 text-slate-300 hover:bg-white/5'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {reels.length === 0 ? (
          /* Single placeholder slot — the real video will be added soon. */
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden aspect-[9/13] border border-dashed border-white/15 bg-gradient-to-br from-slate-800/60 via-slate-900/60 to-slate-950 flex flex-col items-center justify-center text-center px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(16,185,129,0.12),transparent_60%)]" />
                <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                  <Film className="w-7 h-7 text-emerald-300" />
                </div>
                <h3 className="relative mt-5 text-xl font-semibold text-white">Our story, coming soon</h3>
                <p className="relative mt-2 text-sm text-slate-400">
                  A brand-new film is on the way. This space is reserved for the video we&apos;re finishing up — check back shortly.
                </p>
                <span className="relative mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-xs font-medium uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Reserved
                </span>
              </div>
              <p className="mt-4 text-center text-slate-500 text-sm">
                The video will appear here as soon as it&apos;s shared.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((r) => (
              <div key={r.id} className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-[9/13] cursor-pointer bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950"
                onClick={() => setOpen(r)}>
                <img
                  src={r.poster} alt={r.title} loading="lazy"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.dataset.fallback) { el.style.display = 'none'; return; }
                    el.dataset.fallback = '1';
                    el.src = 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80';
                  }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur text-white text-[11px] font-medium">{r.cat}</span>
                <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur text-white text-[11px] tabular-nums">{r.duration}</span>

                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="text-white font-semibold leading-snug">{r.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/70 text-xs">{r.views} views</span>
                    <button onClick={(e) => { e.stopPropagation(); share(r); }} className="text-white/80 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {reels.length > 0 && filtered.length === 0 && (
          <p className="text-center text-slate-500 py-16">No reels in this category yet.</p>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute -top-12 right-0 text-white/80 hover:text-white">
              <X className="w-7 h-7" />
            </button>
            <div className="relative rounded-3xl overflow-hidden aspect-[9/16] bg-black border border-white/10 shadow-2xl">
              <Player reel={open} />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate">{open.title}</h3>
                <p className="text-slate-400 text-xs">{open.cat} • {open.duration} • {open.views} views</p>
              </div>
              <button onClick={() => share(open)} className="shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;
