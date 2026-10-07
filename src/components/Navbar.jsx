import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, CircleHelp, LogOut, Menu, Search, Settings, UserRound } from 'lucide-react';
import logo from '../assets/images/nita-logo.png';

const destinations = ['home', 'services', 'projects', 'about', 'contact'];

export default function Navbar({ onNotify }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [search, setSearch] = useState('');
  const accountMenuRef = useRef(null);
  const links = <>{destinations.map((page) => <a key={page} className="nav-link capitalize" href={`#/${page}`} onClick={() => setMenuOpen(false)}>{page === 'home' ? 'Workspace' : page}</a>)}</>;

  // Close the account dropdown on outside clicks or Escape, like a native menu.
  useEffect(() => {
    if (!accountOpen) return undefined;
    function closeOnOutsideClick(event) {
      if (!accountMenuRef.current?.contains(event.target)) setAccountOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === 'Escape') setAccountOpen(false);
    }
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [accountOpen]);

  function accountAction(message) {
    setAccountOpen(false);
    onNotify(message);
  }
  function submitSearch(event) {
    event.preventDefault();
    onNotify(search.trim() ? `Search “${search.trim()}” can be connected to enterprise search.` : 'Type a name or keyword to search workplace resources.');
  }
  return <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-4 px-4 sm:px-6 lg:px-8">
      <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={20} strokeWidth={1.8} aria-hidden="true" /></button>
      <a href="#/home" className="flex min-w-0 items-center gap-3" aria-label="NITA Smart Workplace home">
        <img src={logo} alt="NITA and Republic of Ghana emblem" className="h-11 w-[76px] rounded object-contain" />
        <span className="hidden leading-tight sm:block"><strong className="block text-base text-slate-900">NITA Smart Workplace</strong><span className="text-xs text-slate-500">Republic of Ghana · National IT Agency</span></span>
      </a>
      <form onSubmit={submitSearch} role="search" className="relative ml-auto hidden max-w-[590px] flex-1 md:block">
        <label htmlFor="global-search" className="sr-only">Search workplace resources</label>
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input id="global-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search approvals, memos, staff, documents, circulars…" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#21A652] focus:bg-white" />
      </form>
      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <button className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100" aria-label="Notifications" onClick={() => onNotify('You have 3 pending approvals and 4 action tasks.')}><Bell size={19} strokeWidth={1.8} aria-hidden="true" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" /></button>
        <div className="relative" ref={accountMenuRef}>
          <button id="account-menu-button" type="button" className="flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-slate-100" onClick={() => setAccountOpen((open) => !open)} aria-haspopup="menu" aria-expanded={accountOpen} aria-controls="account-menu" aria-label="Open account menu"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#21A652] font-semibold text-white">RG</span><span className="hidden text-left leading-tight sm:block"><strong className="block text-sm">Richmond G.</strong><small className="text-slate-500">IT Ops Specialist</small></span><ChevronDown size={15} className={`hidden text-slate-400 transition-transform sm:block ${accountOpen ? 'rotate-180' : ''}`} aria-hidden="true" /></button>
          {accountOpen && <div id="account-menu" role="menu" aria-labelledby="account-menu-button" className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="border-b border-slate-100 px-3 py-3"><p className="text-sm font-semibold text-slate-900">Richmond G.</p><p className="mt-0.5 text-xs text-slate-500">IT Ops Specialist</p></div>
            <div className="py-1.5">
              <button type="button" role="menuitem" onClick={() => accountAction('Connect My profile to your staff profile.')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"><UserRound size={17} className="text-slate-500" aria-hidden="true" />My profile</button>
              <button type="button" role="menuitem" onClick={() => accountAction('Connect Account settings to your NITA account preferences.')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"><Settings size={17} className="text-slate-500" aria-hidden="true" />Account settings</button>
              <a role="menuitem" href="#/contact" onClick={() => setAccountOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"><CircleHelp size={17} className="text-slate-500" aria-hidden="true" />Help & support</a>
            </div>
            <div className="border-t border-slate-100 pt-1.5"><button type="button" role="menuitem" onClick={() => accountAction('Sign out needs to be connected to NITA authentication.')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-700 hover:bg-rose-50"><LogOut size={17} aria-hidden="true" />Sign out</button></div>
          </div>}
        </div>
      </div>
    </div>
    {menuOpen && <nav className="border-t border-slate-100 bg-white px-5 py-3"><div className="mx-auto flex max-w-[1500px] flex-wrap gap-2">{links}</div></nav>}
    {/* Mobile search stays visible in the drawer to keep the header uncluttered. */}
    {menuOpen && <form onSubmit={submitSearch} className="border-t border-slate-100 px-5 py-3 md:hidden"><input aria-label="Search workplace resources" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workplace resources…" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm" /></form>}
  </header>;
}
