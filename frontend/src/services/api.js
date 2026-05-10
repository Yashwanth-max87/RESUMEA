import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token === 'demo-token') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function analyzeResume(formData) {
  const { data } = await api.post('/ai/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export function responseToResume(response, fallback) {
  const parsed = response.contentJson ? JSON.parse(response.contentJson) : {};
  return {
    ...fallback,
    ...parsed,
    id: response.id,
    title: response.title,
    template: response.templateId || parsed.template || fallback.template,
    share: {
      ...(fallback.share || {}),
      ...(parsed.share || {}),
      slug: response.shareSlug,
      passwordProtected: response.passwordProtected,
    },
  };
}

export function resumeToRequest(resume) {
  return {
    title: resume.title || `${resume.basics?.name || 'Untitled'} Resume`,
    templateId: resume.template || 'atlas',
    contentJson: JSON.stringify(resume),
    passwordProtected: Boolean(resume.share?.passwordProtected),
    sharePassword: resume.sharePassword || '',
  };
}
