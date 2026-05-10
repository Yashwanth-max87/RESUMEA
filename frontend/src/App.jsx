import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Builder from './pages/Builder.jsx';
import Analyzer from './pages/Analyzer.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import Templates from './pages/Templates.jsx';
import Share from './pages/Share.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/forgot-password" element={<Auth mode="forgot" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder/:resumeId?" element={<Builder />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/share/:slug" element={<Share />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

