import { Mail, MapPin, Phone, Link as LinkIcon } from 'lucide-react';

function ListSection({ title, children }) {
  if (!children) return null;
  return (
    <section className="mb-4 break-inside-avoid">
      <h3 className="mb-2 border-b pb-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ borderColor: '#cbd5e1' }}>{title}</h3>
      {children}
    </section>
  );
}

export default function ResumePreview({ resume, scale = 'normal' }) {
  const style = { '--accent': resume.theme.color };
  const sizeClass = scale === 'small' ? 'w-[360px] min-h-[510px] text-[9px]' : 'w-full max-w-[860px] min-h-[1120px] text-[13px]';
  const isAtlas = resume.template === 'atlas';
  const isCompact = resume.template === 'compact';
  const isExecutive = resume.template === 'executive';
  const isSignal = resume.template === 'signal';

  return (
    <article id="resume-preview" className={`resume-paper mx-auto ${isCompact ? 'p-6' : 'p-8'} ${isExecutive ? 'font-serif' : ''} ${sizeClass}`} style={style}>
      {isSignal && (
        <div className="mb-6 border-b-4 pb-5" style={{ borderColor: 'var(--accent)' }}>
          <h1 className="text-4xl font-black leading-tight" style={{ color: 'var(--accent)' }}>{resume.basics.name}</h1>
          <p className="mt-1 text-base font-semibold text-slate-700">{resume.basics.headline}</p>
          <p className="mt-2 text-[12px] text-slate-600">{resume.basics.email} · {resume.basics.phone} · {resume.basics.location} · {resume.basics.website}</p>
        </div>
      )}
      <div className={isAtlas ? 'grid grid-cols-[1fr_2fr] gap-7' : isExecutive ? 'grid grid-cols-[2fr_0.8fr] gap-7' : 'space-y-5'}>
        <aside className={isAtlas ? 'border-r pr-5' : isExecutive ? 'order-2 border-l pl-5' : isSignal ? 'hidden' : ''} style={{ borderColor: '#d1d5db' }}>
          <div className="mb-5">
            {resume.basics.image ? (
              <img alt="" src={resume.basics.image} className="mb-4 h-20 w-20 rounded-full object-cover" />
            ) : (
              <div className="mb-4 grid h-20 w-20 place-items-center rounded-full text-2xl font-bold text-white" style={{ background: 'var(--accent)' }}>
                {resume.basics.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
              </div>
            )}
            {!isSignal && (
              <>
                <h1 className={`${isExecutive ? 'text-4xl' : 'text-3xl'} font-black leading-tight`} style={{ color: 'var(--accent)' }}>{resume.basics.name}</h1>
                <p className="mt-1 text-sm font-semibold text-slate-700">{resume.basics.headline}</p>
              </>
            )}
          </div>
          <div className="mb-5 space-y-2 text-[12px] text-slate-700">
            <p className="flex items-center gap-2"><Mail size={12} /> {resume.basics.email}</p>
            <p className="flex items-center gap-2"><Phone size={12} /> {resume.basics.phone}</p>
            <p className="flex items-center gap-2"><MapPin size={12} /> {resume.basics.location}</p>
            <p className="flex items-center gap-2"><LinkIcon size={12} /> {resume.basics.website}</p>
          </div>
          <ListSection title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((skill) => <span key={skill} className="rounded-sm bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">{skill}</span>)}
            </div>
          </ListSection>
          <ListSection title="Languages">
            <p className="text-slate-700">{resume.languages.join(', ')}</p>
          </ListSection>
          <ListSection title="Certifications">
            <ul className="space-y-1 text-slate-700">{resume.certifications.map((item) => <li key={item}>{item}</li>)}</ul>
          </ListSection>
        </aside>
        <main className={isExecutive ? 'order-1' : ''}>
          <ListSection title="Summary">
            <p className="leading-relaxed text-slate-700">{resume.summary}</p>
          </ListSection>
          <ListSection title="Experience">
            <div className="space-y-4">
              {resume.experience.map((job) => (
                <div key={`${job.company}-${job.position}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-950">{job.position}</h4>
                      <p className="font-semibold" style={{ color: 'var(--accent)' }}>{job.company} · {job.location}</p>
                    </div>
                    <p className="whitespace-nowrap text-[11px] font-semibold text-slate-500">{job.startDate} - {job.endDate}</p>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </ListSection>
          <ListSection title="Projects">
            <div className="space-y-3">
              {resume.projects.map((project) => (
                <div key={project.name}>
                  <h4 className="font-bold text-slate-950">{project.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-500">{project.stack}</p>
                  <ul className="mt-1 list-disc pl-5 text-slate-700">{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              ))}
            </div>
          </ListSection>
          <ListSection title="Education">
            {resume.education.map((edu) => (
              <div key={edu.institution} className="flex justify-between gap-4 text-slate-700">
                <p><strong className="text-slate-950">{edu.degree}</strong>, {edu.institution}</p>
                <p className="whitespace-nowrap text-[11px] font-semibold text-slate-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </ListSection>
          <ListSection title="Profiles">
            <p className="text-slate-700">{resume.profiles.map((profile) => `${profile.network}: ${profile.url}`).join(' · ')}</p>
          </ListSection>
        </main>
      </div>
    </article>
  );
}
