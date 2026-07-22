import GigHeroImage from "../images/gig-hero-img.png"

import {
  Search,
  FileText,
  AlignLeft,
  Tag,
  Package,
  Folder,
  Puzzle,
  Star,
  User,
  Target,
  Users,
  Scale,
  Shield,
  Lightbulb,
  ArrowRight,
} from "lucide-react";



const GIG_DATA = [
  {
    icon: FileText,
    label: "TITLE",
    value:
      "\u201Cdesign redesign wordpress website, website development as a full stack developer\u201D",
  },
  {
    icon: AlignLeft,
    label: "DESCRIPTION",
    value: "WordPress-focused with Elementor, WooCommerce, speed optimization, etc.",
  },
  {
    icon: Tag,
    label: "TAGS",
    value: "Wordpress developer, Build website, Full stack developer, Website development...",
  },
  {
    icon: Package,
    label: "PACKAGES",
    value: "3 packages (Landing Page, Ultimate Website, Advanced Website)",
  },
  {
    icon: Folder,
    label: "CATEGORY",
    value: "Programming & Tech > Website Development > WordPress",
  },
  {
    icon: Puzzle,
    label: "EXPERTISE & PLUGINS",
    value: "Elementor, WooCommerce, Yoast SEO, Rank Math, Contact Form 7, WP Rocket, etc.",
  },
  {
    icon: Star,
    label: "SELLER SIGNALS",
    value: "4.9 Rating \u2022 1,039 Orders \u2022 Fiverr's Choice",
  },
  {
    icon: User,
    label: "PROFILE & ABOUT",
    value: "WordPress Expert Team, Flutter Developer, From Bangladesh, 1 Hour Response Time",
  },
];

const ANALYSIS_AREAS = [
  {
    icon: Target,
    title: "SEO & KEYWORDS",
    body: "Analyzes keywords, search intent, relevance, and keyword placement.",
  },
  {
    icon: Users,
    title: "BUYER INTENT & ALIGNMENT",
    body: "Checks whether your gig matches what buyers are actually searching for.",
  },
  {
    icon: Scale,
    title: "POSITIONING & CONSISTENCY",
    body: "Evaluates consistency across title, description, tags, packages, and category.",
  },
  {
    icon: Shield,
    title: "TRUST & CONVERSION SIGNALS",
    body: "Analyzes seller trust, ratings, packages, and overall conversion potential.",
  },
];


function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-2 lg:px-1 lg:py-0">
      <ArrowRight className="h-5 w-5 rotate-90 text-emerald-500 lg:rotate-0" />
    </div>
  );
}

function GigContextCard() {
  return (
    <div className="flex h-fit flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-center text-sm font-bold tracking-wide text-emerald-700">
        YOUR ACTUAL GIG{" "}
        <span className="font-medium text-slate-400">(FULL CONTEXT)</span>
      </p>

      <div className="mt-4 space-y-2.5">
        {GIG_DATA.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex gap-3 rounded-xl bg-emerald-50/40 p-3"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-xs font-bold tracking-wide text-slate-900">
                {label}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyzesCard() {
  return (
    <div className="flex h-fit flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-center text-sm font-bold tracking-wide text-emerald-700">
        GIGBRO ANALYZES
      </p>

      <div className="mt-4 space-y-3">
        {ANALYSIS_AREAS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl bg-emerald-50/40 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-xs font-bold tracking-wide text-slate-900">
                {title}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GigReportCard() {
  return (
    <div className="flex h-fit flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-center text-sm font-bold tracking-wide text-emerald-700">
        YOUR GIG REPORT
      </p>

      <div className="">
        <img src={GigHeroImage} alt="" />
      </div>

  
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-emerald-50/50 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
          <Lightbulb className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-700">
            Actionable Recommendations
          </p>
          <p className="mt-0.5 text-xs leading-snug text-slate-500">
            Get clear, step-by-step suggestions to fix issues, optimize your
            gig, and rank higher.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600" />
      </div>
    </div>
  );
}

export default function Analysis() {
  return (
    <section className="w-full bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700">
            <Search className="h-3.5 w-3.5" />
            WHAT GIGBRO ANALYZES
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            GigBro Doesn&apos;t Guess.
            <br />
            <span className="text-emerald-600">It Reads the Whole Picture.</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Your gig isn&apos;t just a title and description. It&apos;s a
            combination of keywords, services, packages, category, seller
            positioning, and buyer signals. GigBro analyzes the full context
            of your gig to understand what&apos;s working, what&apos;s
            conflicting, and what may be holding you back.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-stretch lg:flex-row">
          <div className="lg:flex-1 flex items-center">
            <GigContextCard />
          </div>

          <FlowArrow />

          <div className="lg:flex-1 flex items-center">
            <AnalyzesCard />
          </div>

          <FlowArrow />

          <div className="lg:flex-[1.3] flex items-center">
            <GigReportCard />
          </div>
        </div>
      </div>
    </section>
  );
}