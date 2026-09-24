import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardCheck,
  Factory,
  Menu,
  Network,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";



const problemSolution = {
  reality: {
    eyebrow: "Traditional School Reality",
    title: "The implementation gap is operational, not aspirational.",
    intro:
      "Schools are expected to deliver practical skill education while carrying curriculum, faculty, infrastructure, maintenance and assessment complexity internally.",
    items: [
      ["Faculty Crisis", "43 skill subjects require domain expertise that most schools cannot maintain on payroll."],
      ["Capex Void", "Composite Skill Lab infrastructure and equipment require significant upfront planning and spend."],
      ["O&M Burden", "Equipment can become non-functional without a maintenance and replenishment protocol."],
      ["Curriculum Fragmentation", "NSQF resources alone do not create a credit-linked delivery pedagogy."],
      ["Assessment Gaps", "Rubric assessment, portfolios and Kaushal Mela workflows need operating capability."],
    ],
  },
  solution: {
    eyebrow: "Avishkar-TEN LaaS Solution",
    title: "One managed service turns the lab into a living curriculum infrastructure.",
    intro:
      "TEN combines equipment, facilitator deployment, pedagogy, operations, maintenance, assessment and industry linkages as one managed service.",
    items: [
      ["Turnkey Deployment", "Composite lab equipment and a structured implementation layer are delivered together."],
      ["Deployed Trainers", "Resident / dedicated Kaushal Acharya support replaces the need to build every capability internally."],
      ["Continuous Maintenance", "Quarterly audits, consumable replenishment, helpdesk and a 48-hour replacement SLA."],
      ["Credit Mapping", "Annual academic-calendar integration and NCrF / ABC-oriented mapping support."],
      ["Assessment System", "NSQF assessment kits, digital portfolios, rubric workflows and Kaushal Mela support."],
    ],
  },
};



function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className={`max-w-3xl ${dark ? "text-white" : "text-slate-900"}`}>
      <div
        className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
          dark
            ? "border-white/20 bg-white/10 text-amber-300"
            : "border-amber-200 bg-amber-50 text-amber-700"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            dark ? "text-blue-100" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}



function ProblemSolutionToggle() {
  const [mode, setMode] = useState("solution");
  const data = problemSolution[mode];

  return (
    <section id="solution" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The implementation gap"
          title="Move from fragmented capability to one managed delivery chain."
          description="The pitch material frames the gap across curriculum complexity, faculty, infrastructure, operations and assessment. TEN packages the operating capability into a single service."
        />

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-2">
          <div className="grid grid-cols-2 gap-2">
            {[
              ["reality", "Traditional School Reality"],
              ["solution", "Avishkar-TEN LaaS Solution"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setMode(value)}
                aria-pressed={mode === value}
                className={`min-h-12 rounded-2xl px-4 text-sm font-extrabold transition ${
                  mode === value
                    ? value === "solution"
                      ? "bg-[#0D9488] text-white shadow-md"
                      : "bg-white text-[#1E3A8A] shadow-md"
                    : "text-slate-500 hover:bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-sm font-black uppercase tracking-wider text-amber-600">
                {data.eyebrow}
              </div>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {data.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {data.intro}
              </p>
            </div>

            <div className="grid gap-3">
              {data.items.map(([title, text], index) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                      mode === "solution"
                        ? "bg-teal-50 text-teal-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900">{title}</h4>
                    <p className="mt-1 text-sm leading-5 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



export default function HeroAndSolution() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    ["Compliance", "#hero"],
    ["10 Domains", "#domains"],
    ["Pedagogy", "#pedagogy"],
    ["Pricing", "#pricing"],
    ["Leadership", "#leadership"],
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      
      <header className="sticky top-0 z-50 border-b border-blue-950/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Avishkar-TEN Labs home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A] text-white shadow-sm">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight text-[#1E3A8A] sm:text-base">
                Avishkar-TEN Labs
              </div>
              <div className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:block">
                Concept to Classroom
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {nav.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-bold text-slate-600 transition hover:text-[#1E3A8A]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#book-demo-form"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-[#0f766e] focus:outline-none focus:ring-4 focus:ring-teal-100"
            >
              Book Boardroom Demo
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
            <nav className="grid gap-1" aria-label="Mobile">
              {nav.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  {label}
                </a>
              ))}
              <a
                href="#book-demo-form"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-4 py-3 text-sm font-extrabold text-white"
              >
                Book Boardroom Demo <ArrowRight size={16} />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        
        <section
          id="hero"
          className="scroll-mt-16 relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#1E3A8A] px-5 py-10 lg:px-8 lg:py-10"
        >
          <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-blue-700/30" />
          <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[600px] rounded-full bg-blue-900/40" />

          <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                <ShieldCheck size={14} />
                CBSE Composite Skill Lab · Lab-as-a-Service
              </div>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Skills Aren’t Taught —
                <span className="block text-amber-300">They Are Engineered.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                Avishkar-TEN Labs gives school leadership a managed composite
                skill-lab operating system: equipment, certified facilitators,
                pedagogy, curriculum, operations, maintenance and assessment.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#book-demo-form"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-[#0f766e] focus:outline-none focus:ring-4 focus:ring-teal-200"
                >
                  Book Boardroom Demo
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#solution"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white hover:bg-white/15"
                >
                  See the operating model
                  <ChevronRight size={17} />
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-7 sm:max-w-2xl sm:gap-8">
                {[
                  ["138+", "NSQF job roles nationally"],
                  ["10", "Skill domains"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-black text-amber-300 sm:text-3xl">
                      {value}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-wider text-blue-200 sm:text-xs">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-2.5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-5 text-slate-900 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-600">
                      Executive dashboard
                    </p>
                    <h2 className="mt-2 text-2xl font-black">
                      One service. One operating layer.
                    </h2>
                  </div>
                  <div className="rounded-xl bg-teal-50 p-3 text-[#0D9488]">
                    <Network size={24} />
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    [Factory, "Equipment", "Multi-sector composite lab"],
                    [Users, "Facilitator", "Certified Kaushal Acharya deployment"],
                    [BookOpen, "Pedagogy", "Structured AVISHKAR learning cycle"],
                    [ClipboardCheck, "Assessment", "NSQF / rubric / portfolio layer"],
                    [RefreshCw, "Maintenance", "Quarterly audit + replenishment"],
                  ].map(([Icon, title, text]) => (
                    <div
                      key={title}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#1E3A8A] shadow-sm">
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">{title}</p>
                        <p className="text-[11px] text-slate-500">{text}</p>
                      </div>
                      <Check className="ml-auto text-teal-600" size={16} />
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-[#1E3A8A] p-4 text-white">
                  <p className="text-xs font-bold text-blue-100">
                    TEN = Technology Experience-lab Network
                  </p>
                  <p className="mt-1 text-sm font-extrabold">
                    A living curriculum infrastructure — not a static equipment room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProblemSolutionToggle />
      </main>
    </div>
  );
}
