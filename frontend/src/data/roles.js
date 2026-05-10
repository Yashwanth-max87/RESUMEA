export const roleCatalog = {
  'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 'Tailwind CSS', 'Accessibility', 'Testing Library', 'Vite'],
  'Backend Developer': ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Redis', 'Docker', 'Microservices', 'JUnit', 'OAuth2', 'System Design'],
  'Full Stack Developer': ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'Docker', 'JWT', 'CI/CD', 'Testing', 'Cloud Deployment'],
  'Java Developer': ['Java', 'Spring Boot', 'Hibernate', 'JPA', 'PostgreSQL', 'JUnit', 'Maven', 'Microservices', 'Kafka', 'Docker'],
  'Python Developer': ['Python', 'FastAPI', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'pytest', 'Pandas', 'Docker', 'REST APIs', 'Async IO'],
  'AI/ML Engineer': ['Python', 'Machine Learning', 'scikit-learn', 'TensorFlow', 'PyTorch', 'NLP', 'Transformers', 'MLOps', 'Vector Databases', 'Feature Engineering'],
  'Data Analyst': ['SQL', 'Python', 'Pandas', 'Power BI', 'Tableau', 'Statistics', 'Excel', 'Data Cleaning', 'Visualization', 'Storytelling'],
  'Cloud Engineer': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Networking', 'CI/CD', 'Monitoring', 'Security'],
  'DevOps Engineer': ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Monitoring', 'Scripting', 'GitHub Actions', 'Security'],
};

export function buildLocalAnalysis(resume, role) {
  const required = roleCatalog[role] || roleCatalog['Full Stack Developer'];
  const resumeSkills = new Set((resume.skills || []).map((skill) => skill.toLowerCase()));
  const matched = required.filter((skill) => resumeSkills.has(skill.toLowerCase()));
  const missing = required.filter((skill) => !resumeSkills.has(skill.toLowerCase()));
  const matchingPercentage = Math.round((matched.length / required.length) * 100);
  const atsScore = Math.min(96, Math.round(matchingPercentage * 0.72 + 24));

  return {
    role,
    extractedSkills: resume.skills,
    matchedSkills: matched,
    missingSkills: missing,
    matchingPercentage,
    atsScore,
    recommendedTechnologies: missing.slice(0, 6),
    suggestedProjects: missing.slice(0, 3).map((skill) => `${skill} focused production mini-project with tests and deployment notes`),
    interviewTopics: [...matched.slice(0, 3), ...missing.slice(0, 4)],
  };
}

export function generateRoadmap(skills) {
  return skills.map((skill, index) => ({
    skill,
    duration: index < 2 ? '2 weeks' : '3 weeks',
    stages: [
      {
        level: 'Beginner',
        goals: [`Understand core ${skill} concepts`, 'Build vocabulary and tooling confidence'],
        resources: [
          { label: `${skill} crash course`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} crash course`)}` },
          { label: `${skill} beginner tutorial`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} beginner tutorial`)}` },
        ],
      },
      {
        level: 'Intermediate',
        goals: [`Apply ${skill} in a real resume-worthy feature`, 'Write tests and document tradeoffs'],
        resources: [
          { label: `${skill} project tutorial`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} project tutorial`)}` },
        ],
      },
      {
        level: 'Advanced',
        goals: [`Optimize and secure a ${skill} workflow`, 'Prepare interview explanations and architecture notes'],
        resources: [
          { label: `${skill} interview questions`, url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} interview questions advanced`)}` },
        ],
      },
    ],
    project: `Create a portfolio project that uses ${skill}, includes a README, tests, deployment link, and quantified impact bullets.`,
  }));
}

