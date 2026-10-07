import { useEffect, useState } from 'react';
import { ArrowLeftRight, ArrowRight, Banknote, Boxes, CalendarDays, Car, Check, ChevronRight, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Droplets, FileText, Folder, Fuel, GraduationCap, Headphones, HeartPulse, LayoutGrid, LifeBuoy, ListChecks, Mail, Megaphone, MoreVertical, Plus, Receipt, RefreshCw, Search, Settings, Sun, UserRound, Users, Wallet, Wind } from 'lucide-react';
import newsImage from '../assets/images/news.jpg';
import { getAccraWeather } from '../services/weather.js';

const modules = [
  [Mail, 'eMail', 'Government Exchange inbox', 'Outlook'],
  [CalendarDays, 'Calendar', 'Meetings & directorate agenda', 'Schedule'],
  [ArrowLeftRight, 'Correspondence', 'Incoming & outgoing registry', 'Active'],
  [FileText, 'Memo & dispatch', 'Internal agency memoranda'],
  [Check, 'My approvals', 'Items requiring your signature', '3 pending', true],
  [Folder, 'Shared files', 'OneDrive & Teams storage', 'Cloud'],
  [Megaphone, 'Circulars', 'Official service bulletins'],
  [Users, 'Staff directory', 'Agency contacts & organisation'],
  [Search, 'Enterprise search', 'Search policies and resources'],
];
const services = [
  [Headphones, 'IT helpdesk', 'Technical support'], [Banknote, 'Funds request', 'Disbursement'], [CalendarDays, 'eLeave', '18 days remaining'],
  [Wallet, 'Imprest', 'Petty cash'], [Boxes, 'Stores / supply', 'Stationery & hardware'], [Car, 'Vehicle request', 'Transport pool'],
  [HeartPulse, 'Medicals', 'Health scheme'], [Fuel, 'Fuel coupon', 'Logistics'], [Receipt, 'Reimburse', 'Expense claim'],
];
const news = [
  { category: 'Regulations', date: '3 days ago', title: 'NITA engages stakeholders on data centre and cloud regulations', body: 'A stakeholder forum is shaping guidelines for a secure, resilient cloud ecosystem.', author: 'Policy Directorate' },
  { category: 'Workshops', date: '1 week ago', title: 'National Data Centre & Cloud Framework stakeholder session', body: 'Reviewing framework notes with telecom providers, ISP consortiums and Smart Africa representatives.', author: 'Technical Secretariat' },
];
function SectionTitle({ icon: Icon, title, caption, children }) {
  return <div className="section-heading"><div><h2 className="section-title"><span className="title-icon"><Icon size={17} strokeWidth={2} aria-hidden="true" /></span>{title}</h2><p className="section-copy">{caption}</p></div>{children}</div>;
}

export default function Home({ onAction }) {
  const [filter, setFilter] = useState('All');
  const [weather, setWeather] = useState({ status: 'loading' });
  const [weatherAttempt, setWeatherAttempt] = useState(0);
  const [clock, setClock] = useState('');

  // Load live Accra observations and forecast values from Open-Meteo.
  useEffect(() => {
    let active = true;
    let controller;
    async function loadWeather() {
      controller?.abort();
      controller = new AbortController();
      try {
        const data = await getAccraWeather(controller.signal);
        if (active) setWeather({ ...data, status: 'ready' });
      } catch (error) {
        if (active && error.name !== 'AbortError') setWeather({ status: 'error' });
      }
    }
    loadWeather();
    const refreshTimer = window.setInterval(loadWeather, 15 * 60 * 1000);
    return () => { active = false; window.clearInterval(refreshTimer); controller?.abort(); };
  }, [weatherAttempt]);

  // Display Accra local time even when the visitor is in another time zone.
  useEffect(() => {
    const update = () => setClock(`${new Intl.DateTimeFormat('en-GH', { timeZone: 'Africa/Accra', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date())} · Accra local time`);
    update(); const timer = window.setInterval(update, 60000); return () => window.clearInterval(timer);
  }, []);

  // WMO code ranges choose a matching Lucide condition symbol.
  const WeatherIcon = weather.status !== 'ready' ? Cloud : weather.code >= 95 ? CloudLightning : weather.code >= 71 && weather.code <= 86 ? CloudSnow : [45, 48].includes(weather.code) ? CloudFog : weather.code >= 61 ? CloudRain : weather.code >= 51 ? CloudDrizzle : weather.code >= 3 ? Cloud : weather.code > 0 ? CloudSun : Sun;

  return <main id="home" className="mx-auto max-w-[1500px] px-4 pb-12 pt-0 sm:px-6 lg:px-8">
    {/* Primary service actions appear before the dashboard so users can get started quickly. */}
    <section className="hero-banner relative overflow-hidden rounded-3xl shadow-lg" aria-labelledby="hero-title">
      <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border-[42px] border-white/10" /><div className="absolute -bottom-40 right-1/4 h-72 w-72 rounded-full border-[35px] border-white/10" />
      <div className="relative flex min-h-[250px] flex-col justify-center px-6 py-9 sm:px-10 lg:min-h-[270px] lg:px-12"><p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-emerald-100"><span className="h-px w-7 bg-emerald-200" />Your work, connected</p><h1 id="hero-title" className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">Welcome to NITA Smart Workplace</h1><p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">A single place for the services, resources and updates that help you get work done.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => onAction('Connect New service request to the request system.')} className="action-button bg-white text-[#087342] hover:bg-emerald-50"><Plus size={16} aria-hidden="true" />New service request</button><a href="#modules" className="action-button border border-white/40 bg-white/10 text-white hover:bg-white/20"><LayoutGrid size={16} aria-hidden="true" />Launch workspace</a></div></div>
    </section>

    <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(310px,.92fr)]">
      <div className="space-y-6">
        <section id="modules" className="panel" aria-label="Corporate workspace"><SectionTitle icon={LayoutGrid} title="Corporate workspace" caption="Core administrative tools, collaboration suites and agency updates"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">9 core modules</span></SectionTitle>
          {/* High-contrast cards retain clear written labels as well as icons. */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{modules.map(([Icon, name, desc, badge, light]) => <button key={name} onClick={() => onAction(`Connect ${name} to the NITA workplace service.`)} className={`module-card ${light ? 'module-light' : 'module-green'}`}><span className="module-icon"><Icon size={19} strokeWidth={1.9} aria-hidden="true" /></span>{badge && <span className={`module-badge ${light ? 'badge-alert' : ''}`}>{badge}</span>}<span className="module-name">{name}</span><span className="module-desc">{desc}</span></button>)}</div>
        </section>

        <section id="services" className="panel"><SectionTitle icon={Settings} title="Service requests & approvals" caption="Submit requests to General Administration, Transport, Human Resource & Finance"><a href="#/services" className="inline-flex items-center gap-1 text-sm font-semibold text-[#087342]">Submitted history <ChevronRight size={15} aria-hidden="true" /></a></SectionTitle><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{services.map(([Icon, name, desc]) => <button key={name} onClick={() => onAction(`Connect ${name} to the relevant NITA service.`)} className="service-card"><span className="service-icon"><Icon size={19} strokeWidth={1.9} aria-hidden="true" /></span><span className="service-name">{name}</span><span className="service-desc">{desc}</span></button>)}</div></section>

        <section id="news" className="panel"><SectionTitle icon={Megaphone} title="News & agency announcements" caption="Official press updates, policy publications and public sector ICT milestones"><div className="flex gap-1.5" role="group" aria-label="Filter news">{['All', 'Regulations', 'Workshops'].map((option) => <button key={option} onClick={() => setFilter(option)} className={`filter-chip ${filter === option ? 'active' : ''}`}>{option}</button>)}</div></SectionTitle>
          <article className="mt-5 grid gap-4 rounded-2xl border border-slate-200 p-3 sm:grid-cols-[170px_1fr]"><div className="relative flex min-h-[130px] items-end overflow-hidden rounded-xl bg-slate-900 p-3"><img src={newsImage} alt="A tablet displaying a secure VPN connection" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" /><span className="relative rounded-md bg-[#21A652] px-2 py-1 text-[10px] font-semibold text-white">Featured press</span></div><div className="flex min-w-0 flex-col justify-center py-1"><div className="flex flex-wrap items-center gap-2 text-[11px]"><span className="font-semibold text-[#087342]">Digital Capacity Building</span><span className="text-slate-300">•</span><span className="text-slate-500">Agency update</span></div><h3 className="mt-1.5 text-lg font-semibold leading-snug text-slate-900">NITA builds capacity of media practitioners in ICT & cybersecurity</h3><p className="mt-1 text-sm leading-5 text-slate-600">NITA, in partnership with GIZ, held an executive workshop to strengthen digital capacity and cybersecurity awareness.</p><div className="mt-3 flex items-center justify-between"><span className="text-xs text-slate-500">Public Relations</span><button onClick={() => onAction('Connect the featured story to the NITA news site.')} className="inline-flex items-center gap-1 text-xs font-semibold text-[#087342]">Read story <ArrowRight size={14} aria-hidden="true" /></button></div></div></article>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">{news.filter((item) => filter === 'All' || filter === item.category).map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 p-4"><div className="flex justify-between"><span className="news-tag">{item.category}</span><time className="text-xs text-slate-400">{item.date}</time></div><h3 className="mt-3 font-semibold leading-snug text-slate-900">{item.title}</h3><p className="mt-2 text-sm leading-5 text-slate-600">{item.body}</p><p className="mt-3 text-xs text-slate-500">{item.author}</p></article>)}</div>
        </section>
      </div>

      {/* Utility rail groups weather, staff shortcuts, recent files, and upcoming events. */}
      <aside className="space-y-6" aria-label="Workplace overview">
        <section className="panel" aria-labelledby="weather-title">
          <div className="section-heading"><div><h2 id="weather-title" className="text-xs font-bold uppercase tracking-widest text-slate-500">Weather & environment</h2><p className="mt-1 text-sm font-medium">Accra, Ghana</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-[#087342]">Accra HQ</span></div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div><div className="flex items-start gap-1"><span className="text-4xl font-bold tracking-tight text-slate-900">{weather.status === 'ready' ? weather.temperature : '—'}</span><span className="mt-1 text-lg text-slate-500">°C</span></div><p className="text-sm text-slate-600">{weather.status === 'ready' ? weather.condition : weather.status === 'loading' ? 'Loading live conditions…' : 'Weather feed unavailable'}</p>{weather.status === 'ready' ? <><p className="mt-1 text-xs text-slate-400">Today {weather.high}° / {weather.low}°</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><Droplets size={13} aria-hidden="true" />{weather.humidity}%</span><span className="inline-flex items-center gap-1"><Wind size={13} aria-hidden="true" />{weather.windSpeed} km/h</span></div></> : weather.status === 'error' ? <button onClick={() => { setWeather({ status: 'loading' }); setWeatherAttempt((attempt) => attempt + 1); }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#087342]"><RefreshCw size={13} aria-hidden="true" />Retry</button> : null}</div><span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-500" aria-hidden="true"><WeatherIcon size={27} strokeWidth={1.7} /></span></div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs"><span className="text-slate-500">{weather.status === 'ready' && weather.observedAt ? `Observed ${weather.observedAt} · ` : ''}{clock}</span><a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="font-medium text-[#087342]">Open-Meteo data</a></div>
        </section>

        <section className="panel"><SectionTitle icon={UserRound} title="My workspace" caption="Shortcuts for your day-to-day work" /><div className="mt-4 space-y-2"><a href="#/services" className="personal-row personal-highlight"><span className="row-icon"><ListChecks size={18} aria-hidden="true" /></span><span className="flex-1"><strong className="block">My action tasks</strong><small className="text-slate-500">4 items pending review</small></span><span className="count-badge">4</span></a>{[['Staff hub & benefits', 'Pensions, allowances, ID', Users], ['Performance appraisal', 'Annual staff scoring', Settings], ['eLearning academy', 'Civil service modules', GraduationCap], ['NITA official portal', 'nita.gov.gh', LayoutGrid]].map(([name, detail, Icon]) => <button key={name} onClick={() => onAction(`Connect ${name} to the relevant staff service.`)} className="personal-row"><span className="row-icon bg-slate-100 text-slate-600"><Icon size={18} aria-hidden="true" /></span><span className="flex-1 text-left"><strong className="block">{name}</strong><small className="text-slate-500">{detail}</small></span><ChevronRight size={16} className="text-slate-400" aria-hidden="true" /></button>)}</div></section>

        <section id="documents" className="panel"><SectionTitle icon={FileText} title="Recent documents" caption="Recently uploaded or updated"><button onClick={() => onAction('Connect See all to the document library.')} className="text-sm font-semibold text-[#087342]">See all</button></SectionTitle><div className="mt-3 divide-y divide-slate-100">{[['W', 'Website Guidelines Report.docx', 'Personal · Attachments · Today', 'bg-blue-50 text-blue-600'], ['P', 'Data_Centre_Policy_Draft_v2.pdf', 'Cabinet Secretariat · Yesterday', 'bg-rose-50 text-rose-600'], ['X', 'Q3_Agency_Budget_Matrix.xlsx', 'Finance Division · 3 days ago', 'bg-emerald-50 text-emerald-700']].map(([icon, filename, detail, colorClass]) => <button key={filename} onClick={() => onAction(`Connect ${filename} to the document library.`)} className="document-row"><span className={`file-icon ${colorClass}`}>{icon}</span><span className="min-w-0 flex-1 text-left text-xs"><strong className="block truncate text-slate-800">{filename}</strong><small className="block truncate text-slate-400">{detail}</small></span><MoreVertical size={16} className="text-slate-400" aria-hidden="true" /></button>)}</div></section>

        <section id="events" className="panel"><SectionTitle icon={CalendarDays} title="Events & calendar" caption="Upcoming organisational dates"><button onClick={() => onAction('Connect the full calendar to NITA Calendar.')} className="inline-flex items-center gap-1 text-sm font-semibold text-[#087342]">Calendar <ChevronRight size={15} aria-hidden="true" /></button></SectionTitle><div className="mt-4 space-y-3">{[['OCT', '12', 'Digital Services Review', 'Monday · 10:00–11:30 · Conference Room 2', 'Directorate meeting'], ['OCT', '15', 'Cybersecurity Awareness Session', 'Thursday · 14:00 · Main Auditorium', 'All staff']].map(([month, day, title, detail, tag]) => <article key={title} className="event-row"><div className="event-date"><span>{month}</span><strong>{day}</strong></div><div><h3 className="font-semibold">{title}</h3><p className="mt-0.5 text-xs text-slate-500">{detail}</p><span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-[#087342]">{tag}</span></div></article>)}<button onClick={() => onAction('Connect all upcoming events to the NITA calendar.')} className="inline-flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:border-[#21A652]">View all upcoming events <ChevronRight size={14} aria-hidden="true" /></button></div></section>
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4"><div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#087342]"><LifeBuoy size={18} aria-hidden="true" /></span><div><h2 className="text-sm font-semibold">Need a hand?</h2><p className="mt-1 text-xs leading-5 text-slate-600">The IT Helpdesk can help with access, devices and workplace tools.</p><a href="#/contact" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#087342]">Contact IT helpdesk <ChevronRight size={14} aria-hidden="true" /></a></div></div></section>
      </aside>
    </div>
  </main>;
}
