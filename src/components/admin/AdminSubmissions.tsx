import React, { useEffect, useState } from 'react';
import { Inbox, Trash2, RefreshCw, Mail, Download, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Submission {
  id: string;
  name: string | null;
  email: string;
  index_score: number | null;
  source: string | null;
  created_at: string;
}

const AdminSubmissions: React.FC = () => {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('assessment_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    setRows((data as Submission[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    const prev = rows;
    setRows((r) => r.filter((x) => x.id !== id));
    const { error } = await supabase.from('assessment_submissions').delete().eq('id', id);
    if (error) { setError(error.message); setRows(prev); }
  };

  const exportCsv = () => {
    const head = ['name', 'email', 'index_score', 'source', 'created_at'];
    const body = rows.map((r) =>
      [r.name ?? '', r.email, r.index_score ?? '', r.source ?? '', r.created_at]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    );
    const csv = [head.join(','), ...body].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'assessment-submissions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Inbox className="w-5 h-5 text-cyan-300" /> Assessment submissions
          <span className="text-slate-400 text-sm font-normal">· {rows.length} total</span>
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={load} className="px-3 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={exportCsv} disabled={!rows.length}
            className="px-3 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 text-sm flex items-center gap-2 disabled:opacity-40">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <div className="py-20 flex items-center justify-center text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center text-slate-500">
          No submissions yet. They appear here when visitors request access on the site.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-slate-400">
              <tr>
                <th className="text-left font-medium px-4 py-3">Name</th>
                <th className="text-left font-medium px-4 py-3">Email</th>
                <th className="text-left font-medium px-4 py-3">Source</th>
                <th className="text-left font-medium px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white">{r.name || <span className="text-slate-500">—</span>}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${r.email}`} className="text-cyan-300 hover:underline flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> {r.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.source || '—'}</td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(r.id)} className="text-slate-500 hover:text-rose-400" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSubmissions;
