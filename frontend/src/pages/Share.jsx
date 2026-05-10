import { Lock, Unlock } from 'lucide-react';
import TopNav from '../components/TopNav.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import { defaultResume } from '../data/resume.js';

export default function Share() {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-5 rounded-md border border-line bg-panel2 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="section-title">Public resume</p>
              <h1 className="mt-1 text-xl font-bold">{defaultResume.title}</h1>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-slate-300">
              {defaultResume.share.passwordProtected ? <Lock size={16} className="text-amber" /> : <Unlock size={16} className="text-mint" />}
              {defaultResume.share.passwordProtected ? 'Password protected' : 'Public link'}
            </div>
          </div>
        </div>
        <ResumePreview resume={defaultResume} />
      </main>
    </div>
  );
}

