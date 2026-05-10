import { Check, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav.jsx';
import { templates } from '../data/resume.js';

export default function Templates() {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="section-title">Template gallery</p>
          <h1 className="mt-2 text-3xl font-black">Choose a professional resume template</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {templates.map((template) => (
            <article key={template.id} className="rounded-md border border-line bg-panel2 p-4">
              <div className="h-72 rounded-md bg-white p-5">
                <div className="h-6 w-3/4 rounded-sm bg-slate-950" />
                <div className="mt-2 h-3 w-1/2 rounded-sm bg-teal-700" />
                <div className="mt-6 grid grid-cols-[0.35fr_1fr] gap-4">
                  <div className="space-y-2">{Array.from({ length: 9 }).map((_, index) => <div key={index} className="h-2 rounded-sm bg-slate-200" />)}</div>
                  <div className="space-y-2">{Array.from({ length: 13 }).map((_, index) => <div key={index} className={`h-2 rounded-sm ${index % 4 === 0 ? 'bg-teal-700/70' : 'bg-slate-300'}`} />)}</div>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold">{template.name}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{template.description}</p>
                </div>
                {template.ats && <span title="ATS friendly" className="grid h-8 w-8 place-items-center rounded-md bg-mint/10 text-mint"><Check size={16} /></span>}
              </div>
              <Link className="btn-primary mt-4 w-full" to="/builder"><Palette size={16} /> Use template</Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

