import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';
import TopNav from '../components/TopNav.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import { defaultResume } from '../data/resume.js';
import { api, responseToResume } from '../services/api.js';

export default function Share() {
  const { slug } = useParams();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/share/${slug}`)
      .then(({ data }) => setResume(responseToResume(data, defaultResume)))
      .catch(() => setError('This resume link is unavailable or private.'));
  }, [slug]);

  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {error && <div className="rounded-md border border-coral/30 bg-coral/10 p-4 text-rose-100">{error}</div>}
        {!resume && !error && <div className="rounded-md border border-line bg-panel2 p-4 text-slate-300">Loading shared resume...</div>}
        {resume && (
          <>
            <div className="mb-5 rounded-md border border-line bg-panel2 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-title">Public resume</p>
                  <h1 className="mt-1 text-xl font-bold">{resume.title}</h1>
                </div>
                <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-slate-300">
                  {resume.share.passwordProtected ? <Lock size={16} className="text-amber" /> : <Unlock size={16} className="text-mint" />}
                  {resume.share.passwordProtected ? 'Password protected' : 'Public link'}
                </div>
              </div>
            </div>
            <ResumePreview resume={resume} />
          </>
        )}
      </main>
    </div>
  );
}

