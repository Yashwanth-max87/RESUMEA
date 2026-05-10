import { Check, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav.jsx';
import { templates } from '../data/resume.js';
import { TemplateMiniature, templatePreviewStyles } from '../utils/templatePreview.jsx';

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
              <TemplateMiniature templateId={template.id} />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold">{template.name}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-mint">{templatePreviewStyles[template.id]?.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{template.description}</p>
                </div>
                {template.ats && <span title="ATS friendly" className="grid h-8 w-8 place-items-center rounded-md bg-mint/10 text-mint"><Check size={16} /></span>}
              </div>
              <Link className="btn-primary mt-4 w-full" to={`/builder?template=${template.id}`}><Palette size={16} /> Use template</Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
