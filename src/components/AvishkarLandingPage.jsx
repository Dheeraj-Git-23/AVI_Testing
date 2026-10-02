import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Cpu,
  Factory,
  GraduationCap,
  HandCoins,
  Headphones,
  HeartPulse,
  Home,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Microscope,
  Monitor,
  Network,
  Phone,
  PlayCircle,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";


const COLORS = {
  royal: "#1E3A8A",
  teal: "#0D9488",
  amber: "#D97706",
  ink: "#0F172A",
  slate: "#F8FAFC",
};

const deadline = new Date("2027-08-23T23:59:59+05:30");

const domains = [
  {
    name: "Agriculture",
    count: 8,
    subtitle: "Food Production & Processing",
    icon: Leaf,
    examples: ["Food", "Food Preservation", "Baking", "Horticulture"],
  },
  {
    name: "Design",
    count: 15,
    subtitle: "Apparel · Furniture · Automotive",
    icon: Lightbulb,
    examples: ["Design Thinking", "Handicrafts", "Pottery", "Textile Design"],
  },
  {
    name: "Electronics",
    count: 9,
    subtitle: "Robotics · IoT",
    icon: Cpu,
    examples: ["Rockets", "Satellites", "Electrical Technology", "IoT"],
  },
  {
    name: "IT & ITES",
    count: 18,
    subtitle: "AI · Coding · Data Science",
    icon: Monitor,
    examples: ["AI", "Coding", "Data Science", "Web Applications"],
  },
  {
    name: "Health Care",
    count: 17,
    subtitle: "Beauty · Wellness · Pharma · Nutrition",
    icon: HeartPulse,
    examples: ["Beauty & Wellness", "Health Care", "Medical Diagnostics", "Yoga"],
  },
  {
    name: "AVGC & Media",
    count: 8,
    subtitle: "Audio-Visual Graphics · Digital Media",
    icon: PlayCircle,
    examples: ["Photography", "Mass Media", "Multi-Media", "Graphic Novel"],
  },
  {
    name: "Retail + Automotive",
    count: 6,
    subtitle: "E-Commerce · Automotive",
    icon: Factory,
    examples: ["Retail", "Salesmanship", "Automotive", "Land Transportation"],
  },
  {
    name: "Renewable Energy",
    count: 24,
    subtitle: "Solar · Wind · Biogas · Climate · Water",
    icon: Zap,
    examples: ["Solar PV", "Wind", "EV", "Energy Auditing"],
  },
  {
    name: "Tourism & Hospitality",
    count: 6,
    subtitle: "Travel · Front Office · Guest Services",
    icon: MapPin,
    examples: ["Travel & Tourism", "Front Office", "Hospitality", "Guest Services"],
  },
  {
    name: "BFSI",
    count: 8,
    subtitle: "Banking · Financial Services · Insurance",
    icon: CircleDollarSign,
    examples: ["Financial Literacy", "Banking", "Insurance", "Taxation"],
  },
];

const pedagogy = [
  {
    letter: "A",
    title: "Activate",
    text: "Map prior knowledge from home & community.",
    icon: Sparkles,
  },
  {
    letter: "V",
    title: "Visit & Verify",
    text: "Field trips & real expert interaction.",
    icon: MapPin,
  },
  {
    letter: "I",
    title: "Introduce",
    text: "Demo-cum-practice with real tools.",
    icon: GraduationCap,
  },
  {
    letter: "S",
    title: "Synthesise",
    text: "Hands-on project work across multiple sessions.",
    icon: Microscope,
  },
  {
    letter: "H",
    title: "Home-Connect",
    text: "Apply vocational learning at home.",
    icon: Home,
  },
  {
    letter: "K",
    title: "Kaushal Mela",
    text: "Year-end showcase & exhibition.",
    icon: Award,
  },
  {
    letter: "A",
    title: "Assess & Advance",
    text: "Rubric assessment; next cycle planned.",
    icon: ClipboardCheck,
  },
  {
    letter: "R",
    title: "Reflection & Incubation",
    text: "Entrepreneurship exposure through reflected innovations.",
    icon: Rocket,
  },
];

const tiers = [
  {
    id: "starter",
    name: "TEN Starter",
    price: "₹12 Lakhs",
    audience: "200–500 students · new to skill education",
    badge: "",
    labs: "1 Composite Lab",
    facilitator: "Shared Facilitator",
    domains: "3 skill sectors",
    extras: ["NCrF mapping"],
  },
  {
    id: "core",
    name: "TEN Core",
    price: "₹25 Lakhs",
    audience: "CBSE Classes VI–XII · mandate compliance",
    badge: "Most Popular for CBSE Schools",
    labs: "2 Lab Sectors",
    facilitator: "1 Dedicated Facilitator + Visiting Experts",
    domains: "7 skill sectors",
    extras: ["NSQF certification", "CBSE-aligned implementation"],
  },
  {
    id: "premier",
    name: "TEN Premier",
    price: "₹50 Lakhs",
    audience: "High-aspiration private schools",
    badge: "Fully Customized Innovation Hub",
    labs: "3 Lab Sectors",
    facilitator: "Dedicated Kaushal Acharya team",
    domains: "10+ sectors",
    extras: ["Industry Connect", "Demo Day", "Full 10-domain curriculum"],
  },
  {
    id: "social",
    name: "TEN Social",
    price: "₹10 Lakhs",
    audience: "Govt., aided, tribal & low-income schools",
    badge: "CSR Grant Supported",
    labs: "Composite deployment",
    facilitator: "Community / shared facilitator model",
    domains: "Samagra Shiksha-aligned",
    extras: ["DIKSHA integration", "Community Kaushal Mela"],
  },
];

const leaders = [
  {
    name: "K.S. Arvind",
    role: "Co-Founder · Director — Operations",
    icon: Building2,
    points: [
      "Education institution & curriculum building experience.",
      "Author of 50+ STEM textbooks, including IT foundation content.",
      "Holistic K–10 curriculum and teacher-training experience.",
    ],
    badge: "Education & Curriculum Leadership",
  },
  {
    name: "Dr. N. Nagendar",
    role: "Co-Founder · Managing Director",
    icon: ShieldCheck,
    points: [
      "Kaushalacharya Award recipient, Government of India.",
      "Curriculum author for NEP electronics / vocational integration.",
      "Coordinator, World Skills Competition India (NSIT Hyderabad).",
    ],
    badge: "Kaushalacharya Award",
  },
  {
    name: "Seshu Sanyasi Naidu",
    role: "Co-Founder · Director — Sales",
    icon: Users,
    points: [
      "17+ years across education and programme sales.",
      "Large-scale school student reach through trainer networks.",
      "Experience in career counselling, skills programmes and placements.",
    ],
    badge: "17+ Years · Education & Skills",
  },
];

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

function Estimator() {
  const [gradeBand, setGradeBand] = useState("6-10");
  const [students, setStudents] = useState(500);

  const estimate = useMemo(() => {
    const notionalHoursPerStudent = 1200;
    const creditsPerStudent = 40;
    const baglessDays = 10;

    // Planning-only assumption because the supplied materials do not
    // provide a student-strength-to-bagless-hours formula.
    const planningHoursPerBaglessDay = 5;

    const learnerHours = students * notionalHoursPerStudent;
    const credits = students * creditsPerStudent;
    const baglessHours = students * baglessDays * planningHoursPerBaglessDay;

    // These are CBSE skill-subject pathway counts, not a claim that
    // every role is simultaneously available to every student.
    const accessiblePathways = gradeBand === "6-10" ? 22 : 43;

    return {
      learnerHours,
      credits,
      baglessHours,
      accessiblePathways,
    };
  }, [gradeBand, students]);

  return (
    <section id="estimator" className="bg-slate-50 px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Interactive planning tool"
            title="Estimate the annual skill-delivery footprint."
            description="Adjust the school cohort and grade band to see a planning view of annual notional hours, NCrF credits and bagless-day delivery. Use the result for boardroom planning, not as a substitute for school-specific academic mapping."
          />

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="text-sm font-bold text-slate-800">
              Grade level
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
              {[
                ["6-10", "Grades VI–X"],
                ["11-12", "Grades XI–XII"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGradeBand(value)}
                  className={`min-h-11 rounded-lg px-3 text-sm font-bold transition ${
                    gradeBand === value
                      ? "bg-[#1E3A8A] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white"
                  }`}
                  aria-pressed={gradeBand === value}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="student-strength"
                  className="text-sm font-bold text-slate-800"
                >
                  Student strength
                </label>
                <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-black text-teal-700">
                  {students.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                id="student-strength"
                type="range"
                min="100"
                max="2000"
                step="50"
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="mt-5 w-full accent-[#0D9488]"
              />
              <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
                <span>100</span>
                <span>2,000 students</span>
              </div>
            </div>

            <div className="mt-7 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <BarChart3
                className="mt-0.5 shrink-0 text-[#1E3A8A]"
                size={20}
                aria-hidden="true"
              />
              <p className="text-xs leading-5 text-blue-900">
                <strong>Planning note:</strong> the supplied programme material
                states 1,200 notional hours/year and 40 NCrF credits/year. The
                student-strength aggregation shown here is a planning model.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard
            icon={Clock3}
            label="Annual notional learner-hours"
            value={estimate.learnerHours.toLocaleString("en-IN")}
            suffix="hrs"
            tone="blue"
          />
          <MetricCard
            icon={BadgeCheck}
            label="NCrF credit capacity"
            value={estimate.credits.toLocaleString("en-IN")}
            suffix="credit-units"
            tone="teal"
          />
          <MetricCard
            icon={CalendarDays}
            label="Bagless-day planning equivalent"
            value={estimate.baglessHours.toLocaleString("en-IN")}
            suffix="hrs"
            tone="amber"
          />
          <MetricCard
            icon={Target}
            label="CBSE skill-subject pathways in the selected level"
            value={estimate.accessiblePathways}
            suffix={gradeBand === "6-10" ? "subjects (IX–X)" : "subjects (XI–XII)"}
            tone="blue"
          />

          <div className="sm:col-span-2 rounded-3xl bg-[#1E3A8A] p-7 text-white shadow-xl shadow-blue-950/10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                  What the boardroom sees
                </p>
                <h3 className="mt-2 text-2xl font-black">
                  A measurable operating layer — not just equipment.
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                  TEN combines infrastructure, facilitators, curriculum,
                  assessment, operations and maintenance into a managed
                  Lab-as-a-Service model.
                </p>
              </div>
              <a
                href="#pricing"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#0f766e] focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                Compare tiers <ChevronRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, suffix, tone }) {
  const tones = {
    blue: "border-blue-100 bg-white text-[#1E3A8A]",
    teal: "border-teal-100 bg-white text-[#0D9488]",
    amber: "border-amber-100 bg-white text-[#D97706]",
  };

  return (
    <div className={`rounded-3xl border p-6 shadow-sm ${tones[tone]}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50">
        <Icon size={21} aria-hidden="true" />
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap items-end gap-2">
        <span className="text-3xl font-black tracking-tight text-slate-950">
          {value}
        </span>
        <span className="pb-1 text-xs font-bold text-slate-500">{suffix}</span>
      </div>
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

function PedagogySection() {
  const [active, setActive] = useState(0);
  const current = pedagogy[active];
  const CurrentIcon = current.icon;

  return (
    <section id="pedagogy" className="bg-[#1E3A8A] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          dark
          eyebrow="Novel pedagogy"
          title="The 8-stage AVISHKAR Learning Cycle."
          description="Eight structured stages delivered by certified facilitators through activity-led learning aligned to the supplied programme framework."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {pedagogy.map((step, index) => (
              <button
                key={`${step.letter}-${step.title}`}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={`group min-h-28 rounded-2xl border p-4 text-left transition ${
                  active === index
                    ? "border-amber-300 bg-white text-[#1E3A8A] shadow-lg"
                    : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
                    active === index
                      ? "bg-amber-500 text-white"
                      : "bg-white/10 text-amber-300"
                  }`}
                >
                  {step.letter}
                </span>
                <span className="mt-3 block text-sm font-black">{step.title}</span>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white p-7 text-slate-900 shadow-2xl">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0D9488] text-white">
                <CurrentIcon size={27} aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-teal-700">
                  Stage {active + 1} of 8
                </div>
                <h3 className="mt-1 text-3xl font-black">{current.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                  {current.text}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() =>
                  setActive((active - 1 + pedagogy.length) % pedagogy.length)
                }
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold text-slate-600 hover:bg-slate-100"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % pedagogy.length)}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 text-sm font-bold text-white hover:bg-blue-900"
              >
                Next stage <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DomainGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="domains" className="bg-slate-50 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="10 skill domains"
          title="A composite curriculum built around real sectors."
          description="The supplied TEN Premier material maps 119 skill modules across 10 domains, with the in-house Renewable Energy & Environment track explicitly identified as a Co-ignite curriculum framework."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const isSelected = selected === index;
            const styles = [
              { card: "hover:border-emerald-200 hover:shadow-emerald-100/70", icon: "bg-emerald-50 text-emerald-700", badge: "bg-emerald-50 text-emerald-700", line: "bg-emerald-500", link: "text-emerald-700" },
              { card: "hover:border-violet-200 hover:shadow-violet-100/70", icon: "bg-violet-50 text-violet-700", badge: "bg-violet-50 text-violet-700", line: "bg-violet-500", link: "text-violet-700" },
              { card: "hover:border-blue-200 hover:shadow-blue-100/70", icon: "bg-blue-50 text-blue-700", badge: "bg-blue-50 text-blue-700", line: "bg-blue-600", link: "text-blue-700" },
              { card: "hover:border-cyan-200 hover:shadow-cyan-100/70", icon: "bg-cyan-50 text-cyan-700", badge: "bg-cyan-50 text-cyan-700", line: "bg-cyan-500", link: "text-cyan-700" },
              { card: "hover:border-rose-200 hover:shadow-rose-100/70", icon: "bg-rose-50 text-rose-700", badge: "bg-rose-50 text-rose-700", line: "bg-rose-500", link: "text-rose-700" },
              { card: "hover:border-fuchsia-200 hover:shadow-fuchsia-100/70", icon: "bg-fuchsia-50 text-fuchsia-700", badge: "bg-fuchsia-50 text-fuchsia-700", line: "bg-fuchsia-500", link: "text-fuchsia-700" },
              { card: "hover:border-orange-200 hover:shadow-orange-100/70", icon: "bg-orange-50 text-orange-700", badge: "bg-orange-50 text-orange-700", line: "bg-orange-500", link: "text-orange-700" },
              { card: "hover:border-amber-200 hover:shadow-amber-100/70", icon: "bg-amber-50 text-amber-700", badge: "bg-amber-50 text-amber-700", line: "bg-amber-500", link: "text-amber-700" },
              { card: "hover:border-sky-200 hover:shadow-sky-100/70", icon: "bg-sky-50 text-sky-700", badge: "bg-sky-50 text-sky-700", line: "bg-sky-500", link: "text-sky-700" },
              { card: "hover:border-indigo-200 hover:shadow-indigo-100/70", icon: "bg-indigo-50 text-indigo-700", badge: "bg-indigo-50 text-indigo-700", line: "bg-indigo-500", link: "text-indigo-700" },
            ][index];

            return (
              <button
                type="button"
                key={domain.name}
                onClick={() => setSelected(isSelected ? null : index)}
                className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-100 ${styles.card} ${
                  isSelected
                    ? "border-[#0D9488] bg-white shadow-lg ring-1 ring-teal-100"
                    : "border-slate-200 bg-white"
                }`}
                aria-expanded={isSelected}
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${styles.line}`} />

                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 group-hover:rotate-3 ${styles.icon}`}>
                    <Icon size={21} aria-hidden="true" />
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-black ${styles.badge}`}>
                    {domain.count}
                  </span>
                </div>

                <h3 className="mt-5 font-black text-slate-950">{domain.name}</h3>
                <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                  {domain.subtitle}
                </p>

                <div
                  className={`grid transition-[grid-template-rows] ${
                    isSelected ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 pt-3">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${styles.link}`}>
                        Example modules
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {domain.examples.map((example) => (
                          <span
                            key={example}
                            className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <span className={`mt-4 inline-flex items-center gap-1 text-xs font-bold ${styles.link}`}>
                  {isSelected ? "Hide details" : "Explore domain"}
                  <ChevronRight
                    size={14}
                    className={`transition ${isSelected ? "rotate-90" : ""}`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [active, setActive] = useState("core");
  const tier = tiers.find((item) => item.id === active);

  return (
    <section id="pricing" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Partnership model"
          title="Choose the operating layer that matches your school's starting point."
          description="Four tiers from the supplied partnership model. Pricing is presented as supplied; final scope, implementation and commercial terms should be confirmed with Co-ignite."
        />

        <div className="mt-10 pb-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActive(item.id)}
                aria-pressed={active === item.id}
                className={`rounded-2xl border p-5 text-left transition ${
                  active === item.id
                    ? "border-[#1E3A8A] bg-[#1E3A8A] text-white shadow-xl"
                    : "border-slate-200 bg-slate-50 text-slate-900 hover:border-blue-200"
                }`}
              >
                {item.badge && (
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                      active === item.id
                        ? "bg-amber-400 text-amber-950"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <h3 className="mt-3 text-xl font-black">{item.name}</h3>
                <p
                  className={`mt-1 text-sm ${
                    active === item.id ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {item.price}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
              Selected tier
            </span>
            <h3 className="mt-2 text-3xl font-black text-slate-950">
              {tier.name}
            </h3>
            <p className="mt-2 text-2xl font-black text-[#1E3A8A]">{tier.price}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{tier.audience}</p>

            <a
              href="#book-demo-form"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#0f766e] focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              Discuss this tier <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Lab hardware", tier.labs, Factory],
              ["Facilitator deployment", tier.facilitator, Users],
              ["Skill coverage", tier.domains, Network],
            ].map(([title, value, Icon]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <Icon className="text-[#1E3A8A]" size={20} aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {title}
                </p>
                <p className="mt-2 text-sm font-extrabold leading-5 text-slate-900">
                  {value}
                </p>
              </div>
            ))}

            <div className="sm:col-span-3 rounded-2xl border border-teal-100 bg-teal-50 p-5">
              <p className="text-xs font-black uppercase tracking-wider text-teal-800">
                Included / positioning
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tier.extras.map((extra) => (
                  <span
                    key={extra}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-800 shadow-sm"
                  >
                    <Check size={13} />
                    {extra}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section id="leadership" className="bg-slate-50 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Leadership & institutional trust"
          title="Built by education, curriculum and skills-delivery practitioners."
          description="The supplied leadership slide presents three co-founders across operations, curriculum / managing leadership and sales."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {leaders.map((leader) => {
            const Icon = leader.icon;
            return (
              <article
                key={leader.name}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1E3A8A]">
                    <Icon size={25} aria-hidden="true" />
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700">
                    {leader.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-black text-slate-950">{leader.name}</h3>
                <p className="mt-1 text-sm font-bold text-teal-700">{leader.role}</p>

                <ul className="mt-6 space-y-3">
                  {leader.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-5 text-slate-600">
                      <Check className="mt-0.5 shrink-0 text-teal-600" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

async function handleSubmit(event) {
  event.preventDefault();

  setError("");

  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;

    if (!endpoint) {
      throw new Error("Lead API endpoint is not configured.");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(
        data?.detail || "The request could not be submitted."
      );
    }

    setSubmitted(true);
    form.reset();
  } catch (error) {
    console.error("Lead submission error:", error);
    setError(
    error.message ||
      "Something went wrong. Please try again."
  );
  }
}

  return (
    <section id="demo" className="bg-[#1E3A8A] px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
            <CalendarDays size={14} />
            45-minute boardroom presentation
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Make the lab decision with the full operating model on the table.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-blue-100">
            Review the composite lab model, facilitator deployment, curriculum
            coverage, NCrF mapping, maintenance layer and tier options with the
            Avishkar-TEN team.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              [Phone, "92468 18840"],
              [Mail, "info@avishkar10.in"],
              [MapPin, "Hyderabad, Telangana"],
              [Network, "avishkar10.in"],
            ].map(([Icon, text]) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <Icon className="text-amber-300" size={18} aria-hidden="true" />
                <span className="text-sm font-bold text-white">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          id="book-demo-form"
          onSubmit={handleSubmit}
          className="scroll-mt-24 rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
        >
          {submitted ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-[#0D9488]">
                <Check size={30} />
              </div>
              <h3 className="mt-5 text-2xl font-black text-slate-950">
                Request received successfully.
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 font-black text-slate-700">
              Thank you for your interest in Avishkar-TEN Labs. Your boardroom
              presentation request has been received successfully. Our team will
              contact you shortly to coordinate your preferred demo date.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw size={15} />
                Submit another
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
                    Book a demo
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950">
                    Tell us about your school.
                  </h3>
                </div>
                <MessageSquare className="text-blue-200" size={28} />
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="School Name" name="schoolName" required />
                <Field label="City / State" name="location" required />
                <Field
                  label="Contact Number"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                />
                <Field
                  label="Preferred Demo Date"
                  name="demoDate"
                  type="date"
                  required
                />
              </div>

              <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-500">
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#0D9488]"
                />
                <span>
                  I agree to be contacted regarding the Avishkar-TEN boardroom
                  presentation.
                </span>
              </label>
              
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-3 text-sm font-black text-white shadow-md hover:bg-[#0f766e] focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                Schedule Boardroom Demo
                <ArrowRight size={17} />
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                45-minute presentation · School leadership audience · No
                payment required to submit the request
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", inputMode, required }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold text-slate-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-50"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A] text-white">
              <Zap size={19} />
            </div>
            <div>
              <p className="font-black text-slate-950">Avishkar-TEN Labs</p>
              <p className="text-xs font-medium text-slate-500">
                Co-ignite Edtech Services Pvt. Ltd.
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-xs leading-5 text-slate-500">
            Concept to Classroom · Composite Lab-as-a-Service for schools.
            “Skills Aren’t Taught — They Are Engineered.”
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-slate-500">
          <a href="#hero" className="hover:text-[#1E3A8A]">
            Compliance
          </a>
          <a href="#domains" className="hover:text-[#1E3A8A]">
            10 Domains
          </a>
          <a href="#pedagogy" className="hover:text-[#1E3A8A]">
            Pedagogy
          </a>
          <a href="#pricing" className="hover:text-[#1E3A8A]">
            Pricing
          </a>
          <a href="#leadership" className="hover:text-[#1E3A8A]">
            Leadership
          </a>
        </div>

        <div className="text-xs text-slate-500 md:text-right">
          <p className="font-bold text-slate-700">Hyderabad, Telangana</p>
          <p className="mt-1">92468 18840 · info@avishkar10.in</p>
          <p className="mt-1">avishkar10.in</p>
        </div>
      </div>
    </footer>
  );
}

export default function AvishkarLandingPage() {
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
        <section id="hero" className="scroll-mt-16 relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#1E3A8A] px-5 py-10 lg:px-8 lg:py-10">
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
        <Estimator />
        <PedagogySection />
        <DomainGrid />
        <PricingSection />
        <Leadership />
        <LeadForm />
      </main>

      <Footer />
    </div>
  );
}
