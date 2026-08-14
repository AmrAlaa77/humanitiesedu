import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, RotateCcw, ArrowLeft, ShieldCheck, Film, Inbox, LogOut, Loader2 } from 'lucide-react';
import { Reel, REEL_CATEGORIES, loadReels, saveReels, resetReels, detectMedia } from '@/lib/reels';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminSubmissions from '@/components/admin/AdminSubmissions';

const empty = { title: '', cat: REEL_CATEGORIES[0] as string, media: '', poster: '', duration: '0:45', views: '0' };

const ReelsManager: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setReels(loadReels()); }, []);

  const detected = useMemo(() => (form.media ? detectMedia(form.media) : null), [form.media]);
  const persist = (next: Reel[]) => { setReels(next); saveReels(next); };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.media.trim()) return;
    const { type, src } = detectMedia(form.media);
    const newReel: Reel = {
      id: Date.now(),
      title: form.title.trim(),
      cat: form.cat,
      duration: form.duration.trim() || '0:45',
      views: form.views.trim() || '0',
      type,
      src,
      poster: form.poster.trim() || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    };
    persist([newReel, ...reels]);
    setForm({ ...empty });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = (id: number) => persist(reels.filter((r) => r.id !== id));
  const reset = () => { resetReels(); setReels(loadReels()); };
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-10">
      <form onSubmit={add} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 h-fit lg:sticky lg:top-24">
        <h2 className="text-xl font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-emerald-300" /> Add a reel</h2>
        <p className="text-slate-400 text-sm mt-1">Replace the sample videos with your own files.</p>

        <label className="block mt-5 text-sm text-slate-300">Title
          <input value={form.title} onChange={(e) => set('title', e.target.value)} required
            placeholder="What is the Wellbeing Index?"
            className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 outline-none focus:border-emerald-400/50" />
        </label>

        <label className="block mt-4 text-sm text-slate-300">Category
          <select value={form.cat} onChange={(e) => set('cat', e.target.value)}
            className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 outline-none focus:border-emerald-400/50">
            {REEL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="block mt-4 text-sm text-slate-300">Video URL or embed ID
          <input value={form.media} onChange={(e) => set('media', e.target.value)} required
            placeholder="https://…/reel.mp4 · YouTube/Vimeo URL or ID"
            className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 outline-none focus:border-emerald-400/50" />
        </label>
        {detected && (
          <p className="mt-1.5 text-xs text-emerald-300/80">Detected: {detected.type.toUpperCase()} · {detected.src}</p>
        )}

        <label className="block mt-4 text-sm text-slate-300">Poster image URL
          <input value={form.poster} onChange={(e) => set('poster', e.target.value)}
            placeholder="https://…/thumbnail.jpg"
            className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 outline-none focus:border-emerald-400/50" />
        </label>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <label className="block text-sm text-slate-300">Duration
            <input value={form.duration} onChange={(e) => set('duration', e.target.value)} placeholder="0:45"
              className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 outline-none focus:border-emerald-400/50" />
          </label>
          <label className="block text-sm text-slate-300">Views
            <input value={form.views} onChange={(e) => set('views', e.target.value)} placeholder="0"
              className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-2.5 outline-none focus:border-emerald-400/50" />
          </label>
        </div>

        <button type="submit" className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold">
          {saved ? 'Added!' : 'Add reel'}
        </button>
        <button type="button" onClick={reset} className="mt-3 w-full py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" /> Reset to sample reels
        </button>
      </form>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2"><Film className="w-5 h-5 text-cyan-300" /> Current reels</h2>
          <span className="text-slate-400 text-sm">{reels.length} total</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {reels.map((r) => (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex">
              <div className="w-24 shrink-0 bg-slate-900">
                <img src={r.poster} alt={r.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-3 min-w-0">
                <h3 className="font-semibold truncate">{r.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{r.cat} · {r.type.toUpperCase()} · {r.duration}</p>
                <p className="text-[11px] text-slate-500 truncate mt-1">{r.src}</p>
              </div>
              <button onClick={() => remove(r.id)} className="px-3 text-slate-500 hover:text-rose-400" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {reels.length === 0 && <p className="text-slate-500">No reels yet. Add one on the left.</p>}
        </div>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState<'submissions' | 'reels'>('submissions');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-300">
        <Loader2 className="w-7 h-7 animate-spin" />
      </div>
    );
  }

  if (!user) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span className="font-semibold">Humantic Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-slate-500">{user.email}</span>
            <Link to="/" className="text-sm text-slate-300 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> View site
            </Link>
            <button onClick={() => signOut()} className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6">
        <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          <button onClick={() => setTab('submissions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${tab === 'submissions' ? 'bg-emerald-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}>
            <Inbox className="w-4 h-4" /> Submissions
          </button>
          <button onClick={() => setTab('reels')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${tab === 'reels' ? 'bg-emerald-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}>
            <Film className="w-4 h-4" /> Reels
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {tab === 'submissions' ? <AdminSubmissions /> : <ReelsManager />}
      </main>
    </div>
  );
};

export default Admin;
