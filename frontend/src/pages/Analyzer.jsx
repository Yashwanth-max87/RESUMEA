import { useState } from 'react';
import { UploadCloud, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import TopNav from '../components/TopNav.jsx';
import { analyzeResume } from '../services/api.js';
import { buildLocalAnalysis, roleCatalog } from '../data/roles.js';
import { defaultResume } from '../data/resume.js';

export default function Analyzer() {
  const [role, setRole] = useState('Full Stack Developer');
  const [fileName, setFileName] = useState('');
  const [analysis, setAnalysis] = useState(() => buildLocalAnalysis(defaultResume, 'Full Stack Developer'));
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (event) => {
    event.preventDefault();
    setLoading(true);
    const file = event.currentTarget.resume.files?.[0];
    const formData = new FormData();
    formData.append('role', role);
    if (file) formData.append('file', file);
    try {
      const result = await analyzeResume(formData);
      setAnalysis(result);
      toast.success('AI analysis complete');
    } catch {
      setAnalysis(buildLocalAnalysis(defaultResume, role));
      toast.success('Demo analysis generated');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-md border border-line bg-panel2 p-5">
          <p className="section-title">AI Skill Analyzer</p>
          <h1 className="mt-2 text-3xl font-black">Upload, compare, improve</h1>
          <p className="mt-3 leading-7 text-slate-400">Upload a PDF resume and choose a target job role. The analyzer extracts skills, compares them against role requirements, scores ATS readiness, and recommends projects plus interview topics.</p>
          <form onSubmit={handleAnalyze} className="mt-6 space-y-4">
            <label className="block">
              <span className="section-title">Target role</span>
              <select className="field mt-2" value={role} onChange={(event) => setRole(event.target.value)}>
                {Object.keys(roleCatalog).map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-line bg-ink/50 p-6 text-center hover:border-mint/60">
              <UploadCloud className="mb-3 text-mint" />
              <span className="font-semibold">{fileName || 'Upload resume PDF'}</span>
              <span className="mt-1 text-sm text-slate-400">PDF parser supports pdfplumber and PyMuPDF in the AI service</span>
              <input name="resume" type="file" accept="application/pdf" className="hidden" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} />
            </label>
            <button className="btn-primary w-full" disabled={loading}><Wand2 size={16} /> {loading ? 'Analyzing...' : 'Analyze resume'}</button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border border-line bg-panel2 p-5"><p className="section-title">ATS score</p><p className="mt-2 text-4xl font-black text-mint">{analysis.atsScore}</p></div>
            <div className="rounded-md border border-line bg-panel2 p-5"><p className="section-title">Match</p><p className="mt-2 text-4xl font-black text-amber">{analysis.matchingPercentage}%</p></div>
            <div className="rounded-md border border-line bg-panel2 p-5"><p className="section-title">Missing</p><p className="mt-2 text-4xl font-black text-coral">{analysis.missingSkills.length}</p></div>
          </div>

          <div className="rounded-md border border-line bg-panel2 p-5">
            <h2 className="font-bold">Missing skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">{analysis.missingSkills.map((skill) => <span key={skill} className="rounded-md bg-coral/10 px-3 py-1 text-sm text-rose-200">{skill}</span>)}</div>
          </div>
          <div className="rounded-md border border-line bg-panel2 p-5">
            <h2 className="font-bold">Matched skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">{analysis.matchedSkills.map((skill) => <span key={skill} className="rounded-md bg-mint/10 px-3 py-1 text-sm text-mint">{skill}</span>)}</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-line bg-panel2 p-5">
              <h2 className="font-bold">Suggested projects</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">{analysis.suggestedProjects.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="rounded-md border border-line bg-panel2 p-5">
              <h2 className="font-bold">Interview preparation</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">{analysis.interviewTopics.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

