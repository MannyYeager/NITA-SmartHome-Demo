import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import Services from './pages/Services.jsx';

const pages = { home: Home, about: About, contact: Contact, projects: Projects, services: Services };

// The small hash router keeps the example multi-page structure dependency-light.
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(2) || 'home');
  const [toast, setToast] = useState('');
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(2) || 'home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  const Page = pages[route] || Home;
  return <div className="min-h-screen bg-[#f6f8f7] text-slate-800 antialiased">
    <Navbar onNotify={setToast} />
    <Page onAction={setToast} />
    <Footer />
    {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
  </div>;
}
