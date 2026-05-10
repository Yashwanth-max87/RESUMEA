import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Download, Eye, Link as LinkIcon, Save, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TopNav from '../components/TopNav.jsx';
import BuilderSidebar from '../components/BuilderSidebar.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import { defaultResume } from '../data/resume.js';
import { api, responseToResume, resumeToRequest } from '../services/api.js';

export default function Builder() {
  const { resumeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedTemplate = searchParams.get('template');
  const [resume, setResume] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('activeResume') || 'null');
    return { ...(stored || defaultResume), template: selectedTemplate || stored?.template || defaultResume.template };
  });
  const [savedAt, setSavedAt] = useState('just now');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!resumeId) return;
    let mounted = true;
    api.get(`/resumes/${resumeId}`)
      .then(({ data }) => {
        if (mounted) setResume(responseToResume(data, defaultResume));
      })
      .catch(() => toast.error('Unable to load this resume. Please login again.'));
    return () => {
      mounted = false;
    };
  }, [resumeId]);

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('activeResume', JSON.stringify(resume));
      setSavedAt(new Date().toLocaleTimeString());
    }, 500);
    return () => clearTimeout(id);
  }, [resume]);

  const saveResume = async ({ silent = false } = {}) => {
    setSaving(true);
    try {
      const payload = resumeToRequest(resume);
      const request = resume.id && resume.id !== 'demo-resume'
        ? api.put(`/resumes/${resume.id}`, payload)
        : api.post('/resumes', payload);
      const { data } = await request;
      const saved = responseToResume(data, resume);
      setResume(saved);
      localStorage.setItem('activeResume', JSON.stringify(saved));
      setSavedAt(new Date().toLocaleTimeString());
      if (!silent) toast.success('Resume saved to database');
      if (!resumeId) navigate(`/builder/${data.id}`, { replace: true });
      return saved;
    } catch (error) {
      toast.error(error.response?.status === 403 ? 'Please login again before saving.' : 'Could not save resume.');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const publicUrl = (currentResume = resume) => `${location.origin}/share/${currentResume.share?.slug || 'save-first'}`;

  const copyLink = async () => {
    const saved = resume.share?.slug ? resume : await saveResume({ silent: true });
    await navigator.clipboard.writeText(publicUrl(saved));
    toast.success('Share link copied');
  };

  const shareResume = async () => {
    const saved = resume.share?.slug ? resume : await saveResume({ silent: true });
    window.open(publicUrl(saved), '_blank', 'noopener,noreferrer');
  };

  const exportPdf = async () => {
    const element = document.getElementById('resume-preview');
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
    pdf.save(`${resume.title}.pdf`);
    toast.success('PDF generated');
  };

  return (
    <div className="app-shell">
      <TopNav />
      <div className="grid lg:grid-cols-[390px_1fr]">
        <BuilderSidebar resume={resume} setResume={setResume} />
        <main className="h-[calc(100vh-65px)] overflow-y-auto bg-ink/60">
          <div className="no-print sticky top-0 z-20 border-b border-line bg-ink/90 px-4 py-3 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-title">Live preview</p>
                <p className="text-sm text-slate-400">Autosaved locally {savedAt}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="btn-secondary" disabled={saving} onClick={() => saveResume()}><Save size={16} /> {saving ? 'Saving...' : 'Save'}</button>
                <button className="btn-secondary" disabled={saving} onClick={copyLink}><LinkIcon size={16} /> Copy link</button>
                <button className="btn-secondary" disabled={saving} onClick={shareResume}><Share2 size={16} /> Share</button>
                <button className="btn-primary" onClick={exportPdf}><Download size={16} /> Export PDF</button>
                <button className="icon-btn" title="Preview"><Eye size={17} /></button>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-8">
            <ResumePreview resume={resume} />
          </div>
        </main>
      </div>
    </div>
  );
}

