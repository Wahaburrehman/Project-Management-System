import { useMemo, useState } from 'react'
import {
  LayoutDashboard, FolderKanban, CheckSquare, CalendarDays, Users, Settings,
  Search, Plus, Bell, ChevronDown, MoreHorizontal, ArrowUpRight, Clock3,
  CircleCheck, CircleDashed, Leaf, X, SlidersHorizontal, Menu, Trash2,
  ListFilter, PanelTop, Zap, MessageCircle, Paperclip, Command
} from 'lucide-react'

const initialTasks = [
  { id: 1, title: 'Refresh landing page', project: 'Website redesign', person: 'AM', color: 'sage', due: 'Today', status: 'In progress', priority: 'High' },
  { id: 2, title: 'Review onboarding flow', project: 'Mobile app', person: 'SK', color: 'clay', due: 'Today', status: 'In review', priority: 'Medium' },
  { id: 3, title: 'Prepare launch checklist', project: 'Product launch', person: 'WR', color: 'blue', due: 'Tomorrow', status: 'To do', priority: 'High' },
  { id: 4, title: 'Update brand guidelines', project: 'Website redesign', person: 'JL', color: 'gold', due: 'Oct 20', status: 'Done', priority: 'Low' },
  { id: 5, title: 'Write release notes', project: 'Mobile app', person: 'SK', color: 'clay', due: 'Oct 21', status: 'To do', priority: 'Low' },
]

const projects = [
  { name: 'Website redesign', tag: 'Design', progress: 72, tasks: '18 / 25', color: 'sage', date: 'Oct 24, 2026' },
  { name: 'Mobile app', tag: 'Product', progress: 48, tasks: '12 / 25', color: 'clay', date: 'Oct 28, 2026' },
  { name: 'Product launch', tag: 'Marketing', progress: 86, tasks: '19 / 22', color: 'gold', date: 'Nov 02, 2026' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Projects', icon: FolderKanban },
  { label: 'My tasks', icon: CheckSquare },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Team', icon: Users },
]
const initials = ['AM', 'SK', 'WR', 'JL']
const statusStyles = {
  'In progress': 'bg-[#e3ebdf] text-[#466348]',
  'In review': 'bg-[#f2e8d4] text-[#8a6a31]',
  'To do': 'bg-[#e8e7e1] text-[#676a61]',
  Done: 'bg-[#dce8df] text-[#38634b]',
}
const avatarStyles = {
  sage: 'bg-[#d9e2d3] text-[#3d5b42]',
  clay: 'bg-[#ead8cd] text-[#835b48]',
  blue: 'bg-[#d9e2e7] text-[#4c6573]',
  gold: 'bg-[#eee2bd] text-[#80682d]',
}

function Avatar({ initials: value, tone = 'sage', small = false }) {
  return <span className={`${small ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs'} ${avatarStyles[tone]} inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-[#fffdf8]`}>{value}</span>
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-[#17251d]/30 md:hidden" />}
    <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col border-r border-[#e6e0d5] bg-[#fbf8f1] px-5 py-6 transition-transform duration-300 md:static md:translate-x-0`}>
      <div className="mb-10 flex items-center gap-3 px-1">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#294b38] text-[#f5f0e6]"><Leaf size={21} /></div>
        <div><p className="text-lg font-bold tracking-tight">grove<span className="text-[#82947b]">.</span></p><p className="text-[11px] text-[#85867d]">WORKSPACE</p></div>
        <button onClick={() => setMobileOpen(false)} className="ml-auto rounded-lg p-2 text-[#777b70] hover:bg-[#efebe2] md:hidden" aria-label="Close menu"><X size={18}/></button>
      </div>
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#99988d]">Workspace</div>
      <nav className="space-y-1">
        {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setMobileOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active === label ? 'bg-[#e4eadd] font-semibold text-[#294b38]' : 'text-[#6e746b] hover:bg-[#f0ede5] hover:text-[#2d4334]'}`}><Icon size={17}/>{label}{label === 'My tasks' && <span className="ml-auto rounded-md bg-[#d4ddce] px-2 py-0.5 text-[10px]">8</span>}</button>)}
      </nav>
      <div className="mb-3 mt-9 flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#99988d]"><span>Projects</span><button aria-label="Add project" className="rounded p-1 hover:bg-[#efebe2]"><Plus size={14}/></button></div>
      <div className="space-y-1">
        {projects.map((p) => <button key={p.name} onClick={() => setActive('Projects')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-[#6e746b] hover:bg-[#f0ede5]"><span className={`h-2.5 w-2.5 rounded-[4px] ${p.color === 'sage' ? 'bg-[#789477]' : p.color === 'clay' ? 'bg-[#bc8d74]' : 'bg-[#c6a65e]'}`}/><span className="truncate">{p.name}</span></button>)}
      </div>
      <div className="mt-auto">
        <div className="mb-4 rounded-2xl bg-[#e8ece2] p-4"><div className="mb-2 flex items-center gap-2 text-[#36533e]"><Zap size={15}/><span className="text-xs font-bold">A calmer way to work</span></div><p className="mb-3 text-xs leading-5 text-[#687563]">Make room for meaningful progress, one task at a time.</p><div className="h-1.5 overflow-hidden rounded-full bg-[#d2dbcb]"><div className="h-full w-[72%] rounded-full bg-[#668369]"/></div></div>
        <button onClick={() => setActive('Settings')} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${active === 'Settings' ? 'bg-[#e4eadd] text-[#294b38]' : 'text-[#6e746b] hover:bg-[#f0ede5]'}`}><Settings size={17}/>Settings</button>
        <div className="mt-4 flex items-center gap-3 border-t border-[#e6e0d5] px-1 pt-5"><Avatar initials="WR"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Wahab Rehman</p><p className="text-xs text-[#8a8c81]">Free workspace</p></div><MoreHorizontal size={18} className="text-[#85867d]"/></div>
      </div>
    </aside>
  </>
}

function StatCard({ label, value, detail, icon: Icon, tone }) {
  const tones = { green: 'bg-[#e4ebdf] text-[#4c6a4d]', sand: 'bg-[#f0e6d2] text-[#96723c]', charcoal: 'bg-[#e6e5de] text-[#50564e]' }
  return <div className="rounded-2xl border border-[#e9e3d8] bg-[#fffdf8] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(42,57,44,.06)]">
    <div className="mb-5 flex items-center justify-between"><span className="text-sm text-[#777b70]">{label}</span><span className={`grid h-9 w-9 place-items-center rounded-xl ${tones[tone]}`}><Icon size={17}/></span></div>
    <div className="flex items-end justify-between gap-2"><p className="text-3xl font-semibold tracking-tight text-[#29362d]">{value}</p><span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-[#5d795e]"><ArrowUpRight size={14}/>{detail}</span></div>
  </div>
}

function ProjectCard({ project }) {
  return <article className="rounded-2xl border border-[#e9e3d8] bg-[#fffdf8] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(42,57,44,.06)]">
    <div className="mb-5 flex items-start justify-between"><div className={`grid h-11 w-11 place-items-center rounded-2xl ${project.color === 'sage' ? 'bg-[#e4ebdf] text-[#4c6a4d]' : project.color === 'clay' ? 'bg-[#f0e2d9] text-[#956b55]' : 'bg-[#f2e9d0] text-[#96723c]'}`}><FolderKanban size={20}/></div><button className="rounded-lg p-1.5 text-[#93958a] hover:bg-[#f2efe8]" aria-label={`More options for ${project.name}`}><MoreHorizontal size={19}/></button></div>
    <span className="rounded-md bg-[#f0eee7] px-2.5 py-1 text-[11px] font-semibold text-[#73776b]">{project.tag}</span>
    <h3 className="mb-1 mt-3 font-semibold text-[#2c392f]">{project.name}</h3><p className="mb-5 text-xs text-[#929286]">Due {project.date}</p>
    <div className="mb-2 flex justify-between text-xs"><span className="text-[#777b70]">Progress</span><span className="font-semibold text-[#3d5141]">{project.progress}%</span></div>
    <div className="h-2 overflow-hidden rounded-full bg-[#eeece4]"><div style={{ width: `${project.progress}%` }} className={`h-full rounded-full transition-all duration-500 ${project.color === 'sage' ? 'bg-[#789477]' : project.color === 'clay' ? 'bg-[#bc8d74]' : 'bg-[#c6a65e]'}`}/></div>
    <div className="mt-4 flex items-center justify-between"><span className="text-xs text-[#898b80]">{project.tasks} tasks</span><div className="flex -space-x-2">{initials.slice(0, 3).map((n, i) => <Avatar key={n} initials={n} tone={['sage','clay','blue'][i]} small/>)}</div></div>
  </article>
}

function TaskRow({ task, onStatus, onDelete }) {
  return <div className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#f0ece3] px-5 py-4 last:border-0 hover:bg-[#fcfaf5] sm:grid-cols-[minmax(0,1.6fr)_minmax(100px,.8fr)_110px_82px_28px]">
    <div className="flex min-w-0 items-center gap-3"><button onClick={() => onStatus(task.id)} aria-label={`Change status for ${task.title}`} className="shrink-0 text-[#a1a397] transition hover:text-[#5d795e]">{task.status === 'Done' ? <CircleCheck size={19} className="text-[#65836a]"/> : task.status === 'In progress' ? <CircleDashed size={19} className="text-[#8b9a79]"/> : <span className="block h-[18px] w-[18px] rounded-full border-2 border-[#d6d5ca]"/>}</button><div className="min-w-0"><p className={`truncate text-sm font-medium ${task.status === 'Done' ? 'text-[#9b9c91] line-through' : 'text-[#3b453c]'}`}>{task.title}</p><p className="mt-1 truncate text-xs text-[#99998e] sm:hidden">{task.project} · {task.due}</p></div></div>
    <div className="hidden min-w-0 items-center gap-2 sm:flex"><span className={`h-2 w-2 rounded-sm ${task.color === 'sage' ? 'bg-[#789477]' : task.color === 'clay' ? 'bg-[#bc8d74]' : task.color === 'blue' ? 'bg-[#839eaa]' : 'bg-[#c6a65e]'}`}/><span className="truncate text-xs text-[#777b70]">{task.project}</span></div>
    <div className="hidden sm:block"><button onClick={() => onStatus(task.id)} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${statusStyles[task.status]}`}>{task.status}</button></div>
    <div className="hidden items-center gap-2 text-xs text-[#85877d] sm:flex"><Clock3 size={13}/>{task.due}</div>
    <button onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`} className="rounded-lg p-1.5 text-[#b2b2a7] opacity-100 transition hover:bg-[#f3e5df] hover:text-[#a55d4b] sm:opacity-0 sm:group-hover:opacity-100"><Trash2 size={15}/></button>
  </div>
}

function NewTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [project, setProject] = useState('Website redesign')
  const [priority, setPriority] = useState('Medium')
  const [error, setError] = useState('')
  function submit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Give your task a name before saving.'); return }
    onAdd({ title: title.trim(), project, priority })
  }
  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#17251d]/40 p-4 backdrop-blur-[3px]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-[#e9e3d8] bg-[#fbf8f1] p-6 shadow-2xl">
      <div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#82947b]">Make it happen</p><h2 className="mt-1 text-xl font-semibold">Create a task</h2></div><button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-xl p-2 text-[#777b70] hover:bg-[#efebe2]"><X size={18}/></button></div>
      <label className="mb-2 block text-sm font-medium">Task name</label><input autoFocus value={title} onChange={e => { setTitle(e.target.value); setError('') }} placeholder="What needs to get done?" className="mb-1 w-full rounded-xl border border-[#ded9ce] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#b0afa3] focus:border-[#789477] focus:ring-4 focus:ring-[#789477]/15"/>
      {error && <p role="alert" className="mb-3 text-xs text-[#a45140]">{error}</p>}
      <label className="mb-2 mt-4 block text-sm font-medium">Project</label><select value={project} onChange={e => setProject(e.target.value)} className="w-full rounded-xl border border-[#ded9ce] bg-[#fffdf8] px-4 py-3 text-sm outline-none focus:border-[#789477]">{projects.map(p => <option key={p.name}>{p.name}</option>)}</select>
      <label className="mb-2 mt-4 block text-sm font-medium">Priority</label><div className="grid grid-cols-3 gap-2">{['Low','Medium','High'].map(p => <button type="button" key={p} onClick={() => setPriority(p)} className={`rounded-xl border px-3 py-2.5 text-sm ${priority === p ? 'border-[#789477] bg-[#e4ebdf] font-semibold text-[#36533e]' : 'border-[#ded9ce] bg-[#fffdf8] text-[#777b70] hover:bg-[#f1eee6]'}`}>{p}</button>)}</div>
      <div className="mt-7 flex gap-3"><button type="button" onClick={onClose} className="flex-1 rounded-xl border border-[#ded9ce] px-4 py-3 text-sm font-semibold text-[#6e746b] hover:bg-[#f0ede5]">Cancel</button><button type="submit" className="flex-1 rounded-xl bg-[#294b38] px-4 py-3 text-sm font-semibold text-[#fffdf8] transition hover:bg-[#1f3b2b] focus:outline-none focus:ring-4 focus:ring-[#789477]/30">Create task</button></div>
    </form>
  </div>
}

export default function App() {
  const [active, setActive] = useState('Overview')
  const [tasks, setTasks] = useState(initialTasks)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All tasks')
  const [showModal, setShowModal] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const visibleTasks = useMemo(() => tasks.filter(t => {
    const matchesQuery = `${t.title} ${t.project} ${t.status}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All tasks' || t.status === filter
    return matchesQuery && matchesFilter
  }), [tasks, query, filter])

  const completed = tasks.filter(t => t.status === 'Done').length
  function cycleStatus(id) {
    const order = ['To do', 'In progress', 'In review', 'Done']
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: order[(order.indexOf(t.status) + 1) % order.length] } : t))
  }
  function addTask(task) {
    setTasks(prev => [{ ...task, id: Date.now(), person: 'WR', color: 'sage', due: 'No date', status: 'To do' }, ...prev])
    setShowModal(false); setToast('Task added to your workspace')
    window.setTimeout(() => setToast(''), 2600)
  }
  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
    setToast('Task removed'); window.setTimeout(() => setToast(''), 2600)
  }
  const pageTitle = active === 'Overview' ? 'Good evening, Wahab' : active

  return <div className="min-h-screen bg-[#f5f0e6] text-[#29362d]">
    <div className="mx-auto flex min-h-screen max-w-[1600px]">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#e6e0d5] bg-[#f5f0e6]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-xl p-2 hover:bg-[#eae6dc] md:hidden" aria-label="Open navigation"><Menu size={20}/></button><div className="hidden items-center gap-2 rounded-xl border border-[#e4ded2] bg-[#fbf8f1] px-3 py-2 text-xs text-[#8c8d81] sm:flex"><Command size={14}/><span>Workspace</span><span>/</span><span className="font-medium text-[#515d51]">{active}</span></div><span className="text-sm font-semibold sm:hidden">{active}</span></div>
          <div className="flex items-center gap-2 sm:gap-4"><button className="relative rounded-xl p-2.5 text-[#6f786d] transition hover:bg-[#eae6dc]" aria-label="Notifications"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#b7795d] ring-2 ring-[#f5f0e6]"/></button><div className="hidden h-7 w-px bg-[#e0dbd0] sm:block"/><button className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-[#eae6dc]"><Avatar initials="WR" small/><ChevronDown size={14} className="text-[#7b8075]"/></button></div>
        </header>
        <div className="mx-auto max-w-[1250px] px-5 pb-12 pt-8 sm:px-8 lg:px-10 lg:pt-10">
          <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#7e9078]"><span className="h-2 w-2 rounded-full bg-[#789477]"/>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div><h1 className="text-2xl font-semibold tracking-tight sm:text-[32px]">{pageTitle}<span className="text-[#91a18a]">.</span></h1><p className="mt-2 text-sm text-[#818479]">A little progress, every day. Here’s your workspace at a glance.</p></div>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#294b38] px-4 py-3 text-sm font-semibold text-[#fffdf8] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1f3b2b] focus:outline-none focus:ring-4 focus:ring-[#789477]/30 sm:self-auto"><Plus size={17}/> New task</button>
          </section>

          {active === 'Settings' ? <section className="rounded-2xl border border-[#e9e3d8] bg-[#fffdf8] p-6"><h2 className="text-lg font-semibold">Workspace settings</h2><p className="mt-2 text-sm text-[#818479]">Your workspace is set up for thoughtful, focused work.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-[#f5f0e6] p-4"><p className="text-sm font-semibold">Workspace name</p><p className="mt-1 text-sm text-[#818479]">Grove Studio</p></div><div className="rounded-xl bg-[#f5f0e6] p-4"><p className="text-sm font-semibold">Appearance</p><p className="mt-1 text-sm text-[#818479]">Ivory · Forest · Charcoal · Sage</p></div></div></section> :
          active === 'Team' ? <section className="rounded-2xl border border-[#e9e3d8] bg-[#fffdf8] p-6"><h2 className="text-lg font-semibold">Your team</h2><p className="mt-1 text-sm text-[#818479]">The people making good work happen.</p><div className="mt-5 divide-y divide-[#f0ece3]">{[['AM','Amina Malik','Product designer','sage'],['SK','Sara Khan','Frontend developer','clay'],['WR','Wahab Rehman','Project lead','blue'],['JL','Junaid Latif','Marketing','gold']].map(([ini,name,role,tone])=><div key={ini} className="flex items-center gap-3 py-4"><Avatar initials={ini} tone={tone}/><div className="flex-1"><p className="text-sm font-semibold">{name}</p><p className="text-xs text-[#8a8c81]">{role}</p></div><span className="rounded-full bg-[#e4ebdf] px-2.5 py-1 text-[11px] font-semibold text-[#4c6a4d]">Active</span></div>)}</div></section> :
          active === 'Calendar' ? <section className="rounded-2xl border border-[#e9e3d8] bg-[#fffdf8] p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">October 2026</h2><p className="mt-1 text-sm text-[#818479]">Your upcoming milestones and due dates.</p></div><CalendarDays className="text-[#789477]" size={22}/></div><div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs">{['M','T','W','T','F','S','S'].map((d,i)=><div key={`${d}${i}`} className="py-2 font-semibold text-[#929286]">{d}</div>)}{Array.from({length:35},(_,i)=>i-3).map((day,i)=><div key={i} className={`grid aspect-square place-items-center rounded-xl text-sm ${day===16?'bg-[#294b38] font-bold text-[#fffdf8]':day>0&&day<=31?'text-[#566156] hover:bg-[#e4ebdf]':'text-[#c6c4b8]'}`}>{day>0&&day<=31?day:day<1?30+day:day-31}</div>)}</div><div className="mt-5 rounded-xl bg-[#f5f0e6] p-4"><p className="text-sm font-semibold">Today’s focus</p><p className="mt-1 text-xs text-[#818479]">Refresh landing page · Review onboarding flow</p></div></section> :
          <>
            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Active projects" value="08" detail="+2 this month" icon={FolderKanban} tone="green"/>
              <StatCard label="Tasks completed" value={String(completed + 24).padStart(2,'0')} detail="On track" icon={CircleCheck} tone="charcoal"/>
              <StatCard label="In progress" value={String(tasks.filter(t=>t.status==='In progress').length + 6).padStart(2,'0')} detail="Across projects" icon={Zap} tone="sand"/>
              <StatCard label="Team members" value="12" detail="4 online now" icon={Users} tone="green"/>
            </section>
            <section className="mb-9"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-semibold tracking-tight">Your projects</h2><p className="mt-1 text-sm text-[#85877c]">Big ideas, broken into doable steps.</p></div><button onClick={() => setActive('Projects')} className="hidden items-center gap-1 text-sm font-semibold text-[#4c6a4d] hover:text-[#294b38] sm:flex">All projects <ArrowUpRight size={15}/></button></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map(p=><ProjectCard key={p.name} project={p}/>)}</div></section>
            <section className="overflow-hidden rounded-2xl border border-[#e9e3d8] bg-[#fffdf8]">
              <div className="flex flex-col gap-4 border-b border-[#eee9df] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-semibold tracking-tight">Task board</h2><p className="mt-1 text-sm text-[#85877c]">Keep the next step clear and simple.</p></div><div className="flex flex-wrap gap-2"><div className="relative min-w-0 flex-1 sm:w-48 sm:flex-none"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9c91]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tasks..." aria-label="Search tasks" className="w-full rounded-xl border border-[#e6e0d5] bg-[#fbf8f1] py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-[#a4a398] focus:border-[#789477] focus:ring-4 focus:ring-[#789477]/10"/></div><button onClick={()=>setShowFilters(v=>!v)} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${showFilters?'border-[#9eaf97] bg-[#e4ebdf] text-[#36533e]':'border-[#e6e0d5] text-[#777b70] hover:bg-[#f5f0e6]'}`}><SlidersHorizontal size={14}/>Filter</button></div></div>
              {showFilters && <div className="flex flex-wrap items-center gap-2 border-b border-[#eee9df] bg-[#fcfaf5] px-5 py-3"><ListFilter size={15} className="text-[#85877c]"/>{['All tasks','To do','In progress','In review','Done'].map(s=><button key={s} onClick={()=>setFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter===s?'bg-[#294b38] text-[#fffdf8]':'bg-[#f0ede5] text-[#777b70] hover:bg-[#e5e9df]'}`}>{s}</button>)}</div>}
              <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(100px,.8fr)_110px_82px_28px] gap-3 bg-[#fcfaf5] px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#a0a094] sm:grid"><span>Task name</span><span>Project</span><span>Status</span><span>Due date</span><span/></div>
              {visibleTasks.length ? visibleTasks.map(task=><TaskRow key={task.id} task={task} onStatus={cycleStatus} onDelete={deleteTask}/>) : <div className="px-5 py-12 text-center"><div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-[#e8ece2] text-[#668369]"><Search size={19}/></div><p className="text-sm font-semibold">No tasks found</p><p className="mt-1 text-xs text-[#929286]">Try a different search or clear your filters.</p><button onClick={()=>{setQuery('');setFilter('All tasks')}} className="mt-3 text-xs font-semibold text-[#4c6a4d] underline underline-offset-4">Clear filters</button></div>}
              <div className="flex flex-col gap-2 border-t border-[#eee9df] px-5 py-3 text-xs text-[#929286] sm:flex-row sm:items-center sm:justify-between"><span>Showing {visibleTasks.length} of {tasks.length} tasks</span><button onClick={()=>setActive('My tasks')} className="self-start font-semibold text-[#4c6a4d] hover:text-[#294b38]">View my tasks <ArrowUpRight size={13} className="inline"/></button></div>
            </section>
          </>}
          <footer className="mt-8 flex flex-col items-center justify-between gap-2 text-xs text-[#a1a094] sm:flex-row"><span className="inline-flex items-center gap-1.5"><Leaf size={13}/> Made for meaningful work.</span><span>Grove Workspace · 2026</span></footer>
        </div>
      </main>
    </div>
    {showModal && <NewTaskModal onClose={()=>setShowModal(false)} onAdd={addTask}/>}
    {toast && <div role="status" className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-xl bg-[#294b38] px-4 py-3 text-sm font-medium text-[#fffdf8] shadow-xl"><CircleCheck size={17}/>{toast}</div>}
  </div>
}
