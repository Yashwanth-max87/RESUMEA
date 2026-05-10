import { Link } from 'react-router-dom';
import { BarChart3, Clock, FilePlus2, Gauge, MoreHorizontal } from 'lucide-react';
import TopNav from '../components/TopNav.jsx';
import { savedResumes } from '../data/resume.js';

export default function Dashboard() {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-title">Dashboard</p>
            <h1 className="mt-2 text-3xl font-black">Your resume command center</h1>
          </div>
          <Link className="btn-primary" to="/builder"><FilePlus2 size={17} /> Create new resume</Link>
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-line bg-panel2 p-5"><Gauge className="text-mint" /><p className="mt-4 text-3xl font-black">88</p><p className="text-sm text-slate-400">Best ATS score</p></div>
          <div className="rounded-md border border-line bg-panel2 p-5"><BarChart3 className="text-amber" /><p className="mt-4 text-3xl font-black">+12%</p><p className="text-sm text-slate-400">Score improvement</p></div>
          <div className="rounded-md border border-line bg-panel2 p-5"><Clock className="text-coral" /><p className="mt-4 text-3xl font-black">3</p><p className="text-sm text-slate-400">Saved resumes</p></div>
        </div>
        <section className="rounded-md border border-line bg-panel2">
          <div className="border-b border-line p-4">
            <h2 className="font-bold">Saved resumes</h2>
          </div>
          <div className="divide-y divide-line">
            {savedResumes.map((resume) => (
              <div key={resume.id} className="grid gap-4 p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                <div>
                  <h3 className="font-semibold">{resume.title}</h3>
                  <p className="text-sm text-slate-400">{resume.template} · Updated {resume.updatedAt}</p>
                </div>
                <span className="rounded-md bg-mint/10 px-3 py-1 text-sm font-semibold text-mint">ATS {resume.ats}</span>
                <Link className="btn-secondary" to={`/builder/${resume.id}`}>Open</Link>
                <button className="icon-btn" title="More actions"><MoreHorizontal size={16} /></button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

