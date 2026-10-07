export default function Footer() {
  return <footer className="mx-auto flex max-w-[1500px] flex-col gap-2 border-t border-slate-200 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
    <span>© {new Date().getFullYear()} National Information Technology Agency, Ghana</span><span>Smart Workplace · Staff access portal</span>
  </footer>;
}
