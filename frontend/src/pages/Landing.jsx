import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, FileDown, Lock, Route, ShieldCheck, Sparkles } from 'lucide-react';
import TopNav from '../components/TopNav.jsx';
import ResumePreview from '../components/ResumePreview.jsx';
import { defaultResume, templates } from '../data/resume.js';

const features = [
  { icon: BrainCircuit, title: 'AI resume analysis', text: 'Extract skills, score ATS fit, and improve weak bullets.' },
  { icon: Route, title: 'Skill roadmap', text: 'Turn missing skills into beginner, intermediate, and advanced learning paths.' },
  { icon: FileDown, title: 'PDF export', text: 'Generate polished ATS-friendly resumes from live templates.' },
  { icon: ShieldCheck, title: 'Secure sharing', text: 'Use public or password-protected resume links.' },
];

export default function Landing() {
  return (
    <div className="app-shell">
      <TopNav />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-sm text-mint">
              <Sparkles size={15} /> AI-powered resume intelligence
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.05] text-white md:text-6xl">
              SmartResume AI
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Build professional resumes, analyze ATS readiness, uncover missing skills for your target role, and generate a focused learning roadmap with strong YouTube suggestions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/builder">Start building <ArrowRight size={17} /></Link>
              <Link className="btn-secondary" to="/analyzer">Analyze resume</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="absolute -inset-4 rounded-xl border border-mint/20 bg-mint/5 shadow-glow" />
            <div className="relative overflow-hidden rounded-xl border border-line bg-panel2 p-4">
              <ResumePreview resume={defaultResume} scale="small" />
            </div>
          </motion.div>
        </section>

        <section className="border-y border-line bg-panel/40 py-12">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-md border border-line bg-panel2 p-5">
                <feature.icon className="text-mint" size={24} />
                <h3 className="mt-4 font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="section-title">Templates</p>
              <h2 className="mt-2 text-3xl font-bold">Professional layouts for every role</h2>
            </div>
            <Link className="btn-secondary" to="/templates">View all</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {templates.map((template) => (
              <div key={template.id} className="rounded-md border border-line bg-panel2 p-4">
                <div className="mb-4 h-40 rounded-md bg-white p-4">
                  <div className="h-5 w-2/3 rounded-sm bg-slate-900" />
                  <div className="mt-4 h-2 w-full rounded-sm bg-slate-200" />
                  <div className="mt-2 h-2 w-5/6 rounded-sm bg-slate-200" />
                  <div className="mt-6 grid grid-cols-[0.35fr_1fr] gap-3">
                    <div className="space-y-2">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-2 rounded-sm bg-teal-700/70" />)}</div>
                    <div className="space-y-2">{Array.from({ length: 7 }).map((_, index) => <div key={index} className="h-2 rounded-sm bg-slate-300" />)}</div>
                  </div>
                </div>
                <h3 className="font-semibold">{template.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{template.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14">
          <div className="grid gap-4 md:grid-cols-3">
            {['The ATS score history helped me target Java roles with confidence.', 'The builder feels fast, visual, and still exports clean resumes.', 'Missing-skills roadmap made my interview preparation much more concrete.'].map((quote) => (
              <blockquote key={quote} className="rounded-md border border-line bg-panel2 p-5 text-slate-300">
                <p>"{quote}"</p>
                <footer className="mt-4 text-sm font-semibold text-mint">Verified beta user</footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

