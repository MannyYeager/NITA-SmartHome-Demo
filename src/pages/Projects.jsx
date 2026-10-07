const projects = [
  ['Digital workplace services', 'Streamlining access to internal services and staff resources.', 'In progress'],
  ['Cloud and data centre framework', 'Supporting secure, reliable public sector digital infrastructure.', 'Policy'],
  ['Digital capacity building', 'Helping teams strengthen ICT skills and cybersecurity awareness.', 'Programme'],
];
export default function Projects() {
  return <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6"><section className="panel"><p className="text-xs font-bold uppercase tracking-widest text-[#087342]">Agency initiatives</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Projects & programmes</h1><p className="mt-3 text-slate-600">A selection of work supporting Ghana’s digital public services.</p><div className="mt-6 grid gap-4 md:grid-cols-3">{projects.map(([name, detail, tag]) => <article key={name} className="rounded-2xl border border-slate-200 p-5"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-[#087342]">{tag}</span><h2 className="mt-4 text-lg font-bold">{name}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></article>)}</div></section></main>;
}
