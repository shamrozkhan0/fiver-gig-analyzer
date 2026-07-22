import HeroSectionImage from "../images/gig-hero-img.png"
import {
  Sparkles,
  Play,
  CheckCircle2,
  Star,
} from "lucide-react";


const TRUST_BADGES = ["AI Powered", "Instant Reports", "24/7 Access"];
const PARTNER_LOGOS = ["fiverr.", "peopleperhour", "upwork", "freelancer", "guru"];

function AvatarRating() {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex -space-x-3">
        <img
          src="https://i.pravatar.cc/64?img=13"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white object-cover"
        />
        <img
          src="https://i.pravatar.cc/64?img=32"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white object-cover"
        />
        <img
          src="https://i.pravatar.cc/64?img=51"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="text-sm text-slate-500">Loved by Fiverr sellers worldwide</p>
      </div>
    </div>
  );
}


export default function HeroSection() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-[110px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered Fiverr Gig Analyzer
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Turn Your Fiverr Gig Into a{" "}
            <span className="text-emerald-600">Better-Performing Gig.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
            GigBro analyzes your Fiverr gig, finds what&apos;s holding it back,
            and gives you actionable AI-powered recommendations to improve
            your SEO, content, and conversions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">
              Analyze My Gig Free
              <Sparkles className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-6 py-3 text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50">
              <Play className="h-4 w-4 fill-current" />
              See How It Works
            </button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <AvatarRating />
          </div>
        </div>

        <div className="">
            <img src={HeroSectionImage} alt="Analytics" className="shadow-sm"/>
        </div>

      </div>

      {/* Trusted by strip */}
      <div className="mx-auto mt-16 max-w-7xl text-center sm:mt-20">
        <p className="text-lm text-slate-500">
          Trusted by freelancers who want to grow faster on Fiverr
        </p>
        <div className="mt-6 flex flex-wrap text-slate-400 items-center justify-center gap-x-10 gap-y-4 grayscale">
          {PARTNER_LOGOS.map((logo) => (
            <span
              key={logo}
              className="text-2xl font-semibold text-slate-400"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}