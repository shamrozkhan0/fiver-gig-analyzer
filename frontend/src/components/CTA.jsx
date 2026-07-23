import { Star, TrendingUp, Search, Rocket, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <div className="w-full flex items-center justify-center bg-white px-4 py-10 sm:py-16">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-emerald-100/70"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f4fbf6 55%, #eefaf1 100%)",
          boxShadow:
            "0 1px 2px rgba(16,24,40,0.04), 0 12px 32px -8px rgba(16,185,129,0.10)",
        }}
      >
        {/* Decorative dots */}
        <span className="hidden sm:block absolute left-[11%] top-[28%] h-2.5 w-2.5 rounded-full border-2 border-emerald-200" />
        <span className="hidden sm:block absolute left-[7%] top-[52%] h-1.5 w-1.5 rounded-full bg-emerald-200" />
        <span className="hidden sm:block absolute left-[12%] top-[74%] h-1.5 w-1.5 rounded-full bg-emerald-100" />
        <span className="hidden sm:block absolute right-[12%] top-[24%] h-2 w-2 rounded-full bg-emerald-100" />
        <span className="hidden sm:block absolute right-[7%] top-[76%] h-2 w-2 rounded-full border-2 border-emerald-100" />

        <Sparkles
          className="hidden sm:block absolute left-[8%] bottom-[16%] h-4 w-4 text-emerald-400"
          strokeWidth={2}
        />
        <Sparkles
          className="hidden sm:block absolute right-[8%] top-[36%] h-4 w-4 text-emerald-400"
          strokeWidth={2}
        />

        {/* Left icon bubble */}
        <div className="hidden md:flex absolute left-[6%] top-1/2 -translate-y-1/2 items-center justify-center">
          <div className="relative h-44 w-44 rounded-full bg-emerald-50/60" />
          <div className="absolute h-28 w-28 rounded-full bg-white shadow-sm flex items-center justify-center">
            <TrendingUp className="h-9 w-9 text-emerald-600" strokeWidth={2.25} />
          </div>
        </div>

        {/* Right icon bubble */}
        <div className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 items-center justify-center">
          <div className="relative h-44 w-44 rounded-full bg-emerald-50/60" />
          <div className="absolute h-28 w-28 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Search className="h-9 w-9 text-emerald-600" strokeWidth={2.25} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-14 sm:py-16 md:px-40">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700">
            <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
            GET STARTED FREE
          </div>

          {/* Headline */}
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-slate-900">
            Ready to optimize your gig
            <br />
            and get <span className="text-emerald-600">more orders?</span>
          </h2>

          {/* Subcopy */}
          <p className="mt-4 max-w-md text-[15px] sm:text-base leading-relaxed text-slate-500">
            Join thousands of freelancers who use GigBro to improve their gig
            performance every day.
          </p>

          {/* CTA button */}
          <button
            type="button"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-base sm:text-lg font-bold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.25) inset, 0 10px 24px -8px rgba(22,163,74,0.55)",
            }}
          >
            <Rocket className="h-5 w-5" strokeWidth={2.25} />
            Analyze Your Gig Free
            <ArrowRight
              className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </button>

          {/* Fine print */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={2} />
              No credit card required
            </span>
            <span className="text-emerald-500">•</span>
            <span>Free full analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;