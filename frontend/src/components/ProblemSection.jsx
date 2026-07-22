import {
  AlertTriangle,
  Search,
  Target,
  FileText,
  Eye,
  ShoppingCart,
  Activity,
  BarChart3,
} from "lucide-react";

const PROBLEMS = [
  {
    icon: Search,
    title: "Low Visibility",
    body: "Poor keyword usage or wrong search intent means your gig rarely shows up.",
  },
  {
    icon: Target,
    title: "Wrong Targeting",
    body: "Your gig might be attracting clicks, but not the right buyers who actually convert.",
  },
  {
    icon: FileText,
    title: "Weak Message",
    body: "Unclear title or description makes buyers scroll past without interest.",
  },
  {
    icon: Eye,
    title: "Low Trust Signal",
    body: "Missing trust elements like proofs, clarity, or strong positioning reduce buyer confidence.",
  },
  {
    icon: ShoppingCart,
    title: "Poor Conversion",
    body: "Even with traffic, a weak offer or unclear value kills your chances of getting orders.",
  },
  {
    icon: Activity,
    title: "Losing Momentum",
    body: "Outdated content, stale keywords, and inconsistent updates slow your growth.",
  },
];

function ProblemCard({ icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
        <Icon className="h-6 w-6 text-emerald-600" />
      </span>

      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <span className="mx-auto mt-2 block h-0.5 w-8 rounded-full bg-emerald-600" />

      <p className="mt-3 text-sm leading-relaxed text-slate-500">{body}</p>
    </div>
  );
}

function SquiggleArrow() {
  return (
    <svg
      viewBox="0 0 120 70"
      className="h-14 w-24 shrink-0 text-emerald-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 50c10 14 26 14 30-2s-8-24-18-14 2 30 20 30c22 0 40-18 62-46" />
      <path d="M84 16l14 2-4 14" />
    </svg>
  );
}

export default function ProblemSection() {
  return (
    <section className="w-full bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            THE PROBLEM
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Your Fiverr Gig Isn&apos;t{" "}
            <span className="text-emerald-600">Performing</span> (or Why
            It&apos;s Slowing Down)
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Fiverr is competitive. Small issues in your gig can cost you
            big—fewer impressions, less clicks, and slow or no sales.
          </p>
        </div>

        {/* Problem cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {PROBLEMS.map((problem) => (
            <ProblemCard key={problem.title} {...problem} />
          ))}
        </div>

        {/* Callout */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-emerald-100">
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </span>

              <div>
                <p className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                  You&apos;re not doing everything wrong.
                  <br />
                  You just need the{" "}
                  <span className="text-emerald-600">right insights</span> to
                  fix what&apos;s holding you back.
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
                  GigBro analyzes your gig from every important angle and
                  tells you exactly what to improve, so you can start seeing
                  better results—faster.
                </p>
              </div>
            </div>

            <SquiggleArrow />
          </div>
        </div>
      </div>
    </section>
  );
}