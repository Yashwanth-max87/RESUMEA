import { useEffect, useState } from 'react';
import { Download, Eye, Link as LinkIcon, Save, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TopNav from '../components/TopNav.jsx';
import BuilderSidebar from '../components/BuilderSidebar.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import { defaultResume } from '../data/resume.js';

export default function Builder() {
  const [resume, setResume] = useState(() => JSON.parse(localStorage.getItem('activeResume') || 'null') || defaultResume);
  const [savedAt, setSavedAt] = useState('just now');

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('activeResume', JSON.stringify(resume));
      setSavedAt(new Date().toLocaleTimeString());
    }, 500);
    return () => clearTimeout(id);
  }, [resume]);

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
                <p className="text-sm text-slate-400">Autosaved {savedAt}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="btn-secondary" onClick={() => toast.success('Resume saved')}><Save size={16} /> Save</button>
                <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(`${location.origin}/share/${resume.share.slug}`)}><LinkIcon size={16} /> Copy link</button>
                <button className="btn-secondary"><Share2 size={16} /> Share</button>
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

