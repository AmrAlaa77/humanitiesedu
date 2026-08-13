import React, { useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Question = {
  id: number;
  section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  sectionTitle: string;
  text: string;
  tags: string[];
};

const QUESTIONS: Question[] = [
  { id: 1, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I find myself mentally tracking tasks, pending approvals, and commitments that are not written down anywhere.', tags: ['Mental clutter', 'Cognitive offload'] },
  { id: 2, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: "At the end of a workday, I still feel mentally occupied by unresolved work items that I haven't captured.", tags: ['Cognitive offload', 'Capture'] },
  { id: 3, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I rely on my memory to recall follow-up actions from meetings rather than a structured tracking system.', tags: ['Mind architecture', 'Capture'] },
  { id: 4, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I experience a sense of mental relief when I write down or log a task — rather than holding it in my head.', tags: ['Cognitive offload', 'Mental clarity'] },
  { id: 5, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I feel mentally overloaded by the volume of emails, requests, and approvals I receive in a typical workday.', tags: ['Mental clutter', 'Inbox overload'] },
  { id: 6, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I have missed or nearly missed a commitment because it was not recorded in a trusted system.', tags: ['Loop closure', 'Capture'] },
  { id: 7, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I struggle to focus on strategic or high-value work because routine tasks and pending items occupy my mental bandwidth.', tags: ['Cognitive offload', 'Decision fatigue'] },
  { id: 8, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'I have a reliable external system — outside my inbox — where all my commitments, tasks, and next actions live.', tags: ['Mind architecture', 'Trusted system'] },
  { id: 9, section: 'A', sectionTitle: 'Mental Clutter & Cognitive Offload', text: 'My daily message volume across email, Microsoft Teams, and WhatsApp consistently exceeds 150 messages — creating a cognitive environment where my inbox functions as my operating system.', tags: ['Digital overload', 'Channel fragmentation', 'Inbox overload'] },

  { id: 10, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'I spend significant time each day deciding what to work on next rather than executing from a clear priority list.', tags: ['Decision fatigue', 'Frictionless execution'] },
  { id: 11, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'During turnaround seasons or high-pressure periods, I lose control of my priorities and reactive tasks take over.', tags: ['Priority management', 'Turnaround pressure'] },
  { id: 12, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'I can clearly distinguish between tasks that are genuinely urgent and those that only feel urgent in the moment.', tags: ['Decision precision', 'Clarity'] },
  { id: 13, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'I make a decision once and move forward — without revisiting or second-guessing that decision later.', tags: ['Decision precision', 'Decision latency'] },
  { id: 14, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'I feel confident managing multiple Iktva reporting deadlines, HSSE documentation, and stakeholder approvals simultaneously.', tags: ['Priority control', 'Iktva', 'HSSE'] },
  { id: 15, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'When my schedule is disrupted by last-minute requests or field changes, I quickly re-establish control of my priorities.', tags: ['Priority management', 'Operational urgency'] },
  { id: 16, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'I have a clear method for deciding what NOT to do — not just what to work on.', tags: ['Decision precision', 'Clarity'] },
  { id: 17, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'I often find myself working on visible or easy tasks instead of the ones that matter most.', tags: ['Priority control', 'Decision fatigue'] },
  { id: 18, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'By end of week, I can confirm all my agreed deadlines, approvals, and commitments have been honoured or escalated appropriately.', tags: ['Commitment closure', 'Execution rhythm'] },
  { id: 19, section: 'B', sectionTitle: 'Priority Control & Decision Precision', text: 'When operational pressure spikes — turnarounds, shutdowns, end-of-quarter surges — my team defaults to firefighting mode rather than maintaining control of active commitments.', tags: ['Firefighting mode', 'Team execution', 'Operational urgency'] },

  { id: 20, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'I have a reliable method for tracking all items I am waiting for from others — approvals, responses, or deliverables.', tags: ['Follow-up discipline', 'Waiting-for system'] },
  { id: 21, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'I follow up on pending items without needing to be reminded by others or prompted by a missed deadline.', tags: ['Follow-up discipline', 'Ownership culture'] },
  { id: 22, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'After meetings, I leave with a clear, documented list of my action items, owners, and deadlines.', tags: ['Loop closure', 'Meeting readiness'] },
  { id: 23, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'I actively close open loops — unresolved tasks, unanswered requests, and incomplete actions — before they accumulate.', tags: ['Loop closure', 'Cognitive offload'] },
  { id: 24, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'I regularly review my pending items, waiting-for list, and open commitments on a weekly basis.', tags: ['Reflective command', 'Weekly review'] },
  { id: 25, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'When I delegate a task, I have a system to track whether it has been completed without relying on memory.', tags: ['Delegation tracking', 'Ownership culture'] },
  { id: 26, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'I experience stress caused by knowing there are open items, unresolved issues, or dropped balls somewhere in my workload.', tags: ['Loop anxiety', 'Mental clutter'] },
  { id: 27, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'My team and stakeholders regard me as someone who consistently closes commitments and follows through reliably.', tags: ['Ownership culture', 'Reliability'] },
  { id: 28, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: "My team's HSSE and audit trail documentation — incident reports, near-miss logs, commitment closures — is tracked cleanly to resolution at all times, not only when an audit is imminent.", tags: ['Audit readiness', 'HSSE', 'Loop closure', 'Compliance precision'] },
  { id: 29, section: 'C', sectionTitle: 'Follow-Up Discipline & Loop Closure', text: 'I have experienced situations where my team had to scramble to close documentation loops or reconstruct audit trails immediately before an inspection or review.', tags: ['Audit pressure', 'Compliance precision', 'Loop closure'] },

  { id: 30, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'When I am under pressure, I communicate with the same clarity and composure as I do in calm situations.', tags: ['Pressure communication', 'Composure'] },
  { id: 31, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'I respond to difficult emails, unclear instructions, or conflicting priorities from a factual, measured mindset — not an emotional reaction.', tags: ['Adult state', 'Composure'] },
  { id: 32, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'I find it difficult to deliver clear, composed messages to senior leaders or executives when stakes are high.', tags: ['Executive communication', 'Pressure communication'] },
  { id: 33, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'I am able to handle repeated reminders, delayed responses, or unclear ownership without generating friction or escalation.', tags: ['Frictionless communication', 'Composure'] },
  { id: 34, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'I adapt my communication style effectively when dealing with contractors, field teams, and cross-functional stakeholders.', tags: ['Stakeholder comms', 'Communication maturity'] },
  { id: 35, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'I prepare for high-stakes meetings or briefings with a structured communication plan — not improvised responses.', tags: ['Meeting readiness', 'Decision precision'] },
  { id: 36, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'My written communication — emails, reports, approval requests — is consistently clear, factual, and easy to act on.', tags: ['Professional writing', 'Clarity'] },
  { id: 37, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'I am aware of when I am communicating from a reactive or emotional state rather than a calm, analytical one.', tags: ['Adult state', 'Self-awareness', 'Composure'] },
  { id: 38, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'A significant proportion of requests arriving from field teams or site operations require multiple rounds of back-and-forth clarification before a clear next action can be established.', tags: ['Field-to-office', 'Request clarity', 'Frictionless execution'] },
  { id: 39, section: 'D', sectionTitle: 'Communication Under Pressure', text: 'Preparing executive briefings, board-level updates, or KPI dashboards for senior leadership requires exhausting, last-minute effort due to competing stakeholder formats and misaligned expectations.', tags: ['Executive reporting', 'Stakeholder friction', 'Communication maturity'] },

  { id: 40, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I delay starting tasks even when I know exactly what the next action is.', tags: ['Procrastination', 'Avoidance'] },
  { id: 41, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I avoid sending follow-up reminders because I feel uncomfortable chasing colleagues or senior stakeholders.', tags: ['Fear of follow-up', 'Avoidance'] },
  { id: 42, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I spend more time than necessary on a task because I want it to be perfect before moving forward.', tags: ['Perfectionism', 'Decision latency'] },
  { id: 43, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: "I keep tasks 'in progress' longer than needed because completing them feels like it triggers the next responsibility.", tags: ['Closure anxiety', 'Task-completion blockage'] },
  { id: 44, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I understand the productivity system I should be using — but consistently fail to maintain it beyond a few days.', tags: ['Habit formation', 'Behaviour gap'] },
  { id: 45, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I experience overwhelm that causes me to stop working on important items and shift to lower-value tasks.', tags: ['Overwhelm', 'Reactivity', 'Priority control'] },
  { id: 46, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I can identify the specific times of day and types of tasks that trigger my avoidance or resistance patterns.', tags: ['Self-awareness', 'Psychological barriers'] },
  { id: 47, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I have tried to build better work habits in the past but returned to old patterns within weeks.', tags: ['Habit formation', 'Behavioural change'] },
  { id: 48, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'My performance is consistent across high-pressure and low-pressure periods — not episodic based on urgency.', tags: ['Sustained performance', 'Resilience'] },
  { id: 49, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'I understand the neurological and physiological reasons why I sometimes lose focus, avoid tasks, or resist structure.', tags: ['Mind architecture', 'Neuroscience', 'Behavioural analysis'] },
  { id: 50, section: 'E', sectionTitle: 'Psychological Barriers & Habit Patterns', text: 'My compliance workflows — Iktva submissions, local content reporting, supplier documentation — are supported by automated or systematised processes rather than manual, memory-dependent effort.', tags: ['Compliance automation', 'Iktva', 'Cognitive offload', 'System design'] },

  { id: 51, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'I take full ownership of my workload — I do not wait for others to remind me, chase me, or manage my commitments.', tags: ['Ownership culture', 'Reliability'] },
  { id: 52, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'I have a consistent weekly review rhythm where I process my inboxes, update my task lists, and reset my priorities.', tags: ['Reflective command', 'Weekly review'] },
  { id: 53, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'My personal energy management is deliberate — I match high-focus work to my peak cognitive hours.', tags: ['Energy management', 'Frictionless execution'] },
  { id: 54, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'I feel that my organisation has a shared language and operating framework for how work is managed and communicated.', tags: ['Organisational momentum', 'Common language'] },
  { id: 55, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'I believe the current level of cognitive overload in my team is costing the organisation in ways that are not being measured.', tags: ['Cognitive drain', 'ROI', 'Organisational performance'] },
  { id: 56, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'If given a trusted system, clear priorities, and a structured review rhythm, I would perform significantly better at work.', tags: ['MindFlow readiness', 'Potential', 'System design'] },
  { id: 57, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'I am ready to commit to building a new way of working — one that gives me clarity, control, and composure every day.', tags: ['MindFlow commitment', 'Behavioural change', 'Ownership'] },
  { id: 58, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'Upward reporting and executive-level communication in my organisation consistently commands leadership confidence — without requiring exhausting manual rework or last-minute alignment between departments.', tags: ['Executive reporting', 'Organisational momentum', 'Stakeholder friction'] },
  { id: 59, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: 'Field-to-office requests in my environment arrive through clearly defined channels with sufficient context, making it straightforward to identify and assign the next action.', tags: ['Field-to-office', 'Request clarity', 'System design', 'Frictionless execution'] },
  { id: 60, section: 'F', sectionTitle: 'Ownership, Resilience & Sustainable Flow', text: "I feel that my team's collective cognitive overload — untracked commitments, inbox dependency, reactive communication — is a measurable risk to operational reliability and stakeholder confidence.", tags: ['Cognitive drain', 'Team performance', 'Organisational momentum', 'ROI'] },
];

const SCALE = [
  { value: 1, label: 'Never' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Always' },
];

const sectionOrder: Question['section'][] = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function CPPIAssessment() {
  const [participant, setParticipant] = useState({ name: '', division: '', role: '' });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const completed = Object.keys(answers).length;
  const progress = Math.round((completed / QUESTIONS.length) * 100);

  const sections = useMemo(() => {
    return sectionOrder.map((section) => ({
      section,
      title: QUESTIONS.find((q) => q.section === section)?.sectionTitle || '',
      questions: QUESTIONS.filter((q) => q.section === section),
    }));
  }, []);

  const sectionScores = useMemo(() => {
    const scores: Record<string, { total: number; count: number; average: number }> = {};
    for (const section of sectionOrder) {
      const qs = QUESTIONS.filter((q) => q.section === section);
      const values = qs.map((q) => answers[q.id]).filter(Boolean);
      const total = values.reduce((sum, value) => sum + value, 0);
      scores[section] = {
        total,
        count: values.length,
        average: values.length ? Number((total / values.length).toFixed(2)) : 0,
      };
    }
    return scores;
  }, [answers]);

  const submitSurvey = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!participant.name || !participant.division || !participant.role) {
      setStatus('error');
      setMessage('Please complete your name, division, and role.');
      return;
    }

    if (completed < QUESTIONS.length) {
      setStatus('error');
      setMessage(`Please answer all 60 questions. You have completed ${completed}/60.`);
      return;
    }

    setStatus('loading');
    setMessage('');

    const payload = {
      name: participant.name,
      division: participant.division,
      role: participant.role,
      responses: answers,
      section_scores: sectionScores,
      overall_average: Number(
        (Object.values(answers).reduce((sum, value) => sum + value, 0) / QUESTIONS.length).toFixed(2)
      ),
      source: 'cppi-web-survey',
    };

    const { error } = await supabase.from('cppi_survey_responses').insert(payload);

    if (error) {
      console.error(error);
      setStatus('error');
      setMessage('Submission failed. Please try again or contact the programme team.');
      return;
    }

    setStatus('done');
    setMessage('Thank you. Your CPPI assessment has been submitted successfully.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10 shadow-2xl">
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs font-semibold">MindFlow™ · CPPI Assessment</p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">Cognitive Performance & Workplace Productivity Index</h1>
          <p className="mt-4 text-slate-300 max-w-3xl">
            60 questions · 6 pressure zones · Individual baseline and performance gap analysis.
            This assessment is not a test. There are no right or wrong answers.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-900/80 border border-white/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-300">Progress: {completed}/60 answered</span>
              <span className="text-sm font-semibold text-cyan-300">{progress}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {message && (
            <div className={`mt-6 rounded-xl p-4 text-sm ${status === 'done' ? 'bg-emerald-400/10 text-cyan-200 border border-emerald-400/20' : 'bg-red-400/10 text-red-200 border border-red-400/20'}`}>
              {message}
            </div>
          )}

          <form onSubmit={submitSurvey} className="mt-8 space-y-10">
            <section className="grid md:grid-cols-3 gap-4">
              <input
                value={participant.name}
                onChange={(e) => setParticipant({ ...participant, name: e.target.value })}
                placeholder="Name"
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400"
              />
              <input
                value={participant.division}
                onChange={(e) => setParticipant({ ...participant, division: e.target.value })}
                placeholder="Division"
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400"
              />
              <input
                value={participant.role}
                onChange={(e) => setParticipant({ ...participant, role: e.target.value })}
                placeholder="Role"
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </section>

            <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h2 className="text-xl font-semibold">Rating scale</h2>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs md:text-sm">
                {SCALE.map((item) => (
                  <div key={item.value} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-lg font-bold text-cyan-300">{item.value}</div>
                    <div className="text-slate-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {sections.map((section) => (
              <section key={section.section} className="space-y-5">
                <div className="sticky top-0 z-20 rounded-2xl border border-emerald-400/20 bg-slate-950/95 p-4 backdrop-blur">
                  <p className="text-cyan-300 text-sm font-semibold">Section {section.section}</p>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                {section.questions.map((q) => (
                  <div key={q.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex gap-3">
                      <div className="shrink-0 text-cyan-300 font-bold">Q{q.id}</div>
                      <div>
                        <p className="text-slate-100 leading-relaxed">{q.text}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {q.tags.map((tag) => (
                            <span key={tag} className="text-xs rounded-full bg-white/5 border border-white/10 px-2 py-1 text-slate-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-5 gap-2">
                      {SCALE.map((item) => (
                        <label
                          key={item.value}
                          className={`cursor-pointer rounded-xl border p-3 text-center transition ${
                            answers[q.id] === item.value
                              ? 'border-emerald-400 bg-emerald-400/15 text-cyan-100'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${q.id}`}
                            value={item.value}
                            checked={answers[q.id] === item.value}
                            onChange={() => setAnswers({ ...answers, [q.id]: item.value })}
                            className="sr-only"
                          />
                          <div className="text-lg font-bold">{item.value}</div>
                          <div className="text-[11px] md:text-xs">{item.label}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-4 font-bold text-slate-950 disabled:opacity-60"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit CPPI Assessment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
