export const sectionCatalog = [
  'Basics',
  'Summary',
  'Profiles',
  'Experience',
  'Education',
  'Projects',
  'Skills',
  'Languages',
  'Certifications',
  'Interests',
  'Awards',
  'Publications',
  'Volunteer',
];

export const defaultResume = {
  id: 'demo-resume',
  title: 'Full Stack Developer Resume',
  template: 'atlas',
  theme: {
    color: '#0f766e',
    font: 'Inter',
    density: 'ats',
  },
  share: {
    slug: 'yashwanth-full-stack',
    passwordProtected: true,
  },
  sectionsOrder: [...sectionCatalog],
  basics: {
    name: 'Yashwanth C',
    headline: 'Full Stack Developer',
    email: 'yashwanth@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    website: 'portfolio.dev',
    image: '',
  },
  summary: 'Full stack developer focused on Java, React, Spring Boot, PostgreSQL, and AI-assisted product workflows. Experienced in building secure APIs, polished dashboards, and data-driven user experiences.',
  profiles: [
    { network: 'GitHub', username: 'yashwanth-dev', url: 'https://github.com/yashwanth-dev' },
    { network: 'LinkedIn', username: 'yashwanth-c', url: 'https://linkedin.com/in/yashwanth-c' },
  ],
  experience: [
    {
      company: 'Northstar Labs',
      position: 'Software Engineer',
      location: 'Remote',
      startDate: '2024',
      endDate: 'Present',
      bullets: [
        'Built JWT-secured Spring Boot APIs serving resume analytics and document workflows.',
        'Reduced dashboard load time by 38% by optimizing React state boundaries and API payloads.',
        'Integrated PostgreSQL reporting tables for ATS score history and skill-gap trend analysis.',
      ],
    },
  ],
  education: [
    { institution: 'Visvesvaraya Technological University', degree: 'B.E. Computer Science', startDate: '2020', endDate: '2024' },
  ],
  projects: [
    {
      name: 'AI Resume Analyzer',
      stack: 'React, Spring Boot, FastAPI, PostgreSQL',
      bullets: ['Parsed PDFs, extracted skill signals, ranked ATS keywords, and generated learning roadmaps.'],
    },
  ],
  skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs', 'Docker', 'Python', 'FastAPI'],
  languages: ['English', 'Kannada', 'Hindi'],
  certifications: ['AWS Cloud Practitioner', 'Java Full Stack Development'],
  interests: ['Developer tooling', 'AI products', 'Open source'],
  awards: ['Hackathon finalist - AI Productivity Track'],
  publications: ['Building ATS-friendly Resumes with Structured Sections'],
  volunteer: ['Mentored junior developers on portfolio and resume building.'],
};

export const savedResumes = [
  { id: 'resume-1', title: 'Full Stack Developer', updatedAt: '2026-05-09', ats: 88, template: 'Atlas' },
  { id: 'resume-2', title: 'Java Backend Developer', updatedAt: '2026-05-04', ats: 82, template: 'Compact ATS' },
  { id: 'resume-3', title: 'AI/ML Internship', updatedAt: '2026-04-27', ats: 76, template: 'Signal' },
];

export const templates = [
  { id: 'atlas', name: 'Atlas', description: 'Modern two-column layout with crisp section hierarchy.', ats: true },
  { id: 'signal', name: 'Signal', description: 'Elegant single-column resume for technical profiles.', ats: true },
  { id: 'executive', name: 'Executive', description: 'Premium layout for senior leadership and consulting roles.', ats: false },
  { id: 'compact', name: 'Compact ATS', description: 'Dense keyword-friendly format for applicant tracking systems.', ats: true },
];

