import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Github, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import TopNav from '../components/TopNav.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth({ mode }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') === 'demo-token') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast('Old demo session cleared. Please login again.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      if (isForgot) {
        toast.success('Password reset link sent');
      } else if (isRegister) {
        await auth.register(payload);
        toast.success('Account created');
        navigate('/dashboard');
      } else {
        await auth.login(payload);
        toast.success('Welcome back');
        navigate('/dashboard');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const message = error.response?.status === 400 || error.response?.status === 409
        ? 'This email may already be registered. Try login, or use another email.'
        : error.response?.data?.message || 'Authentication failed. Check the backend and your credentials.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <TopNav />
      <main className="mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1fr_0.9fr]">
        <section>
          <p className="section-title">Secure access</p>
          <h1 className="mt-3 text-4xl font-black">{isForgot ? 'Reset your password' : isRegister ? 'Create your workspace' : 'Login to your workspace'}</h1>
          <p className="mt-4 max-w-xl leading-7 text-slate-400">
            Use email authentication or OAuth2 with Google and GitHub. The Spring Boot backend includes JWT hooks and OAuth2 client configuration.
          </p>
        </section>
        <form onSubmit={handleSubmit} className="rounded-md border border-line bg-panel2 p-6">
          <div className="space-y-4">
            {isRegister && (
              <label className="block">
                <span className="section-title">Name</span>
                <input className="field mt-2" name="name" required />
              </label>
            )}
            <label className="block">
              <span className="section-title">Email</span>
              <input className="field mt-2" name="email" type="email" required />
            </label>
            {!isForgot && (
              <label className="block">
                <span className="section-title">Password</span>
                <input className="field mt-2" name="password" type="password" required />
              </label>
            )}
            <button className="btn-primary w-full" type="submit" disabled={submitting}><Mail size={16} /> {submitting ? 'Please wait...' : isForgot ? 'Send reset link' : isRegister ? 'Create account' : 'Login'}</button>
            {!isForgot && (
              <div className="grid gap-2 sm:grid-cols-2">
                <a className="btn-secondary" href="http://localhost:8080/oauth2/authorization/google">Google OAuth</a>
                <a className="btn-secondary" href="http://localhost:8080/oauth2/authorization/github"><Github size={16} /> GitHub</a>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-between text-sm text-slate-400">
            <Link className="text-mint" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Have an account?' : 'Create account'}</Link>
            <Link className="text-mint" to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
