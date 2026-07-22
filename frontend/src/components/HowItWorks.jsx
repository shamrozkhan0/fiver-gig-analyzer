import GigAnalyzeImage from "../images/gig-hero-img.png"
import FiverDemoGig from "../images/fiver-demo-gig.png"
import {
  Zap,
  MoreVertical,
  Check,
  ChevronRight,
  Aperture,
  Lightbulb,
  ArrowUpCircle,
} from "lucide-react";


const STATS = [
  {
    icon: Aperture,
    title: "Super Easy",
    lines: ["3 simple steps", "Anyone can do it"],
  },
  {
    icon: Lightbulb,
    title: "Lightning Fast",
    lines: ["Analyze in seconds", "Save hours of manual work"],
  },
  {
    icon: ArrowUpCircle,
    title: "Actionable Insights",
    lines: ["Clear recommendations", "that drive real results"],
  },
];



function StepArrow() {
  return (
    <div className="hidden lg:flex lg:items-center lg:justify-center lg:px-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-emerald-300 bg-white text-emerald-600">
        <ChevronRight className="h-4 w-4" />
      </span>
    </div>
  );
}



function StepHeader({ number, title, body }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
          {number}
        </span>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
    </div>
  );
}



function FiverrGigMockup() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <img src={FiverDemoGig} alt="" />
    </div>
  );
}



function ScrapeMockup() {
  return (
    <div className="relative rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-2 w-full rounded bg-slate-100" />
        <div className="h-2 w-5/6 rounded bg-slate-100" />
        <div className="h-2 w-2/3 rounded bg-slate-100" />
        <div className="h-16 w-full rounded bg-slate-50" />
        <div className="h-2 w-3/4 rounded bg-slate-100" />
      </div>

      <div className="absolute inset-x-4 bottom-4 rounded-xl border border-slate-100 bg-white p-4 text-center shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-600 text-[10px] font-bold text-white">
              G
            </span>
            GigBro
          </span>
          <MoreVertical className="h-4 w-4 text-slate-300" />
        </div>

        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
          <Check className="h-6 w-6 text-white" strokeWidth={3} />
        </span>

        <p className="mt-3 text-sm font-semibold text-slate-900">
          Gig Scraped Successfully!
        </p>
        <p className="mt-1 text-xs text-slate-400">Redirecting for analysis...</p>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-2/3 rounded-full bg-emerald-600" />
        </div>
      </div>
    </div>
  );
}



function ReportMockup() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <img src={GigAnalyzeImage} alt="" />
    </div>
  );
}



function StatItem({ icon: Icon, title, lines }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        {lines.map((line) => (
          <p key={line} className="text-sm text-slate-500">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}



export default function HowItWorks() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700">
            <Zap className="h-3.5 w-3.5" />
            HOW GIGBRO WORKS
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Analyze Your Gig. Get Clear Insights.
            <br />
            <span className="text-emerald-600">Improve</span> With Confidence.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            GigBro makes gig analysis simple, fast, and actionable.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 flex flex-col justify-between lg:flex-row lg:items-stretch lg:gap-0">
          <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
            <StepHeader
              number="01"
              title="Open a Fiverr Gig"
              body="Go to any Fiverr gig you want to analyze and optimize."
            />
            <FiverrGigMockup />
          </div>

          <StepArrow />

          <div className="flex-1 flex flex-col justify-start gap-10 rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
            <StepHeader
              number="02"
              title="Scrape with GigBro"
              body="Use the GigBro Chrome Extension to capture the gig data in one click."
            />
            <ScrapeMockup />
          </div>

          <StepArrow />

          <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 flex flex-col justify-between">
            <StepHeader
              number="03"
              title="Analyze & Improve"
              body="Get a comprehensive report with insights, weaknesses, and actionable recommendations."
            />
            <ReportMockup />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-emerald-100">
                <Zap className="h-6 w-6 text-emerald-600" />
              </span>
              <div>
                <p className="text-lg font-bold text-emerald-600">That&apos;s it!</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  In less than a minute, you&apos;ll know exactly what&apos;s
                  holding your gig back and how to fix it.
                </p>
              </div>
            </div>

            {STATS.map((stat) => (
              <StatItem key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}