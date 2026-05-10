import { useMemo, useState } from 'react';
import { ExternalLink, Route, Sparkles } from 'lucide-react';
import TopNav from '../components/TopNav.jsx';
import { generateRoadmap, roleCatalog } from '../data/roles.js';

export default function RoadmapPage() {
  const [skills, setSkills] = useState('Docker\nCI/CD\nCloud Deployment\nTesting');
  const roadmap = useMemo(() => generateRoadmap(skills.split('\n').map((item) => item.trim()).filter(Boolean)), [skills]);

  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-md border border-line bg-panel2 p-5">
            <p className="section-title">Skill Roadmap</p>
            <h1 className="mt-2 text-3xl font-black">Turn missing skills into a plan</h1>
            <p className="mt-3 leading-7 text-slate-400">Paste missing skills from the analyzer or choose a role. Each skill becomes a beginner to advanced roadmap with YouTube searches, practice ideas, and estimated duration.</p>
            <label className="mt-5 block">
              <span className="section-title">Missing skills</span>
              <textarea className="field mt-2 min-h-44" value={skills} onChange={(event) => setSkills(event.target.value)} />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(roleCatalog).slice(0, 5).map(([role, required]) => (
                <button key={role} className="btn-secondary" onClick={() => setSkills(required.slice(4, 8).join('\n'))}>{role}</button>
              ))}
            </div>
          </section>
          <section className="rounded-md border border-line bg-panel2 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Route className="text-mint" />
              <h2 className="text-xl font-bold">Generated roadmap</h2>
            </div>
            <div className="space-y-4">
              {roadmap.map((item) => (
                <article key={item.skill} className="rounded-md border border-line bg-ink/45 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{item.skill}</h3>
                    <span className="rounded-md bg-mint/10 px-3 py-1 text-sm font-semibold text-mint">{item.duration}</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {item.stages.map((stage) => (
                      <div key={stage.level} className="rounded-md border border-line bg-panel2 p-3">
                        <h4 className="font-semibold text-amber">{stage.level}</h4>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-300">{stage.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
                        <div className="mt-3 space-y-2">
                          {stage.resources.map((resource) => (
                            <a key={resource.label} href={resource.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-mint hover:underline">
                              <ExternalLink size={14} /> {resource.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 rounded-md bg-mint/10 p-3 text-sm text-teal-100"><Sparkles size={14} className="mr-2 inline" />{item.project}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

