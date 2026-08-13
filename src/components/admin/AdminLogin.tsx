import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    const fn = mode === 'in' ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setBusy(false);
    if (error) {
      setErr(error);
    } else if (mode === 'up') {
      setMsg('Account created. You can now sign in. (If email confirmation is enabled, check your inbox first.)');
      setMode('in');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
        <div className="w-12 h-12 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mb-5">
          <Lock className="w-5 h-5 text-emerald-300" />
        </div>
        <h1 className="text-2xl font-bold">{mode === 'in' ? 'Admin Sign In' : 'Create Admin Account'}</h1>
        <p className="text-slate-400 text-sm mt-1">
          Authorized team members only. View collected assessment submissions.
        </p>

        <label className="block mt-6 text-sm text-slate-300">Email
          <input
            type="email" value={email} required
            onChange={(e) => { setEmail(e.target.value); setErr(null); }}
            placeholder="you@humantic.com"
            className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/50"
          />
        </label>

        <label className="block mt-4 text-sm text-slate-300">Password
          <input
            type="password" value={password} required minLength={6}
            onChange={(e) => { setPassword(e.target.value); setErr(null); }}
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl bg-slate-900 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/50"
          />
        </label>

        {err && <p className="text-rose-400 text-sm mt-3">{err}</p>}
        {msg && <p className="text-emerald-400 text-sm mt-3">{msg}</p>}

        <button type="submit" disabled={busy}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
          {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'in' ? 'Sign In' : 'Create Account'}
        </button>

        <button type="button" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setErr(null); setMsg(null); }}
          className="mt-4 w-full text-center text-sm text-slate-400 hover:text-white">
          {mode === 'in' ? 'Need an account? Create one' : 'Have an account? Sign in'}
        </button>

        <Link to="/" className="mt-4 flex items-center justify-center gap-1 text-slate-500 text-sm hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;
