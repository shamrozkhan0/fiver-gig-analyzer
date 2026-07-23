import { useLayoutEffect, useRef, useState } from "react";
import {
  Star,
  Type,
  FileText,
  Tag,
  Package,
  Folder,
  User,
  BarChart3,
  Crosshair,
  Search,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const LEFT_ITEMS = [
  { icon: Type, label: "Title" },
  { icon: FileText, label: "Description" },
  { icon: Tag, label: "Tags" },
  { icon: Package, label: "Packages" },
  { icon: Folder, label: "Category & Subcategory" },
  { icon: User, label: "Expertise" },
  { icon: Star, label: "Seller Profile & Ratings" },
  { icon: BarChart3, label: "Seller Signals & Performance" },
];

const RIGHT_ITEMS = [
  {
    icon: Crosshair,
    title: "Find Inconsistencies",
    body: "We spot mismatches that may be hurting your visibility.",
  },
  {
    icon: Search,
    title: "Understand What's Working",
    body: "See the strengths of your gig backed by data.",
  },
  {
    icon: AlertTriangle,
    title: "Identify What's Holding You Back",
    body: "Uncover gaps and issues others overlook.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Recommendations",
    body: "Get clear, practical steps to improve your gig.",
  },
  {
    icon: FileText,
    title: "Your Report, 24/7",
    body: "Access your detailed report anytime you need it.",
  },
];

function curvePath(x1, y1, x2, y2) {
  const midX = (x1 + x2) / 2;
  return `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`;
}

function LeftRow({ label, icon: Icon, dotRef }) {
  return (
    <div className="relative flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span
        ref={dotRef}
        className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-500"
      />
    </div>
  );
}

function RightRow({ title, body, icon: Icon, dotRef }) {
  return (
    <div className="relative flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="mt-0.5 text-sm leading-snug text-slate-500">{body}</p>
      </div>
      <span
        ref={dotRef}
        className="absolute left-0 top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-500"
      />
    </div>
  );
}

export default function WhyGigBro() {
  const containerRef = useRef(null);
  const leftDotRefs = useRef(LEFT_ITEMS.map(() => null));
  const rightDotRefs = useRef(RIGHT_ITEMS.map(() => null));
  const centerLeftRef = useRef(null);
  const centerRightRef = useRef(null);

  const [paths, setPaths] = useState({ left: [], right: [] });
  const [isLarge, setIsLarge] = useState(false);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;

      const large = window.innerWidth >= 1024;
      setIsLarge(large);
      if (!large) return;

      const cRect = container.getBoundingClientRect();
      const relPoint = (rect) => ({
        x: rect.left + rect.width / 2 - cRect.left,
        y: rect.top + rect.height / 2 - cRect.top,
      });

      const centerLeft = centerLeftRef.current
        ? relPoint(centerLeftRef.current.getBoundingClientRect())
        : null;
      const centerRight = centerRightRef.current
        ? relPoint(centerRightRef.current.getBoundingClientRect())
        : null;

      if (!centerLeft || !centerRight) return;

      const left = leftDotRefs.current
        .filter(Boolean)
        .map((el) => {
          const p = relPoint(el.getBoundingClientRect());
          return curvePath(p.x, p.y, centerLeft.x, centerLeft.y);
        });

      const right = rightDotRefs.current
        .filter(Boolean)
        .map((el) => {
          const p = relPoint(el.getBoundingClientRect());
          return curvePath(centerRight.x, centerRight.y, p.x, p.y);
        });

      setPaths({ left, right });
    }

    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700">
            <Star className="h-3.5 w-3.5 fill-current" />
            WHY GIGBRO?
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why <span className="text-emerald-600">GigBro?</span>
          </h2>

          <p className="mt-4 text-lg font-medium text-slate-700">
            Because a gig is more than just keywords.
          </p>

          <p className="mt-3 text-base leading-relaxed text-slate-500">
            GigBro analyzes your entire gig—not just parts of it—so you can
            understand what&apos;s really happening and how to improve.
          </p>
        </div>

        {/* Diagram */}
        <div
          ref={containerRef}
          className="relative mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6"
        >
          {/* Connector lines (lg only) */}
          {isLarge && (
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              style={{ zIndex: 0 }}
            >
              {paths.left.map((d, i) => (
                <path
                  key={`l-${i}`}
                  d={d}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
              ))}
              {paths.right.map((d, i) => (
                <path
                  key={`r-${i}`}
                  d={d}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
              ))}
            </svg>
          )}

          {/* Left card */}
          <div className="relative z-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-bold text-emerald-700">Your Gig</h3>
            <p className="mt-1 text-sm text-slate-500">
              Every piece of your gig matters.
            </p>

            <div className="mt-4 space-y-2.5">
              {LEFT_ITEMS.map((item, i) => (
                <LeftRow key={item.label} {...item} dotRef={(el) => {
                  leftDotRefs.current[i] = el;
                }} />
              ))}
            </div>
          </div>

          {/* Center circle */}
          <div className="relative z-10 flex justify-center py-4 lg:px-10">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-emerald-50/60 sm:h-64 sm:w-64">
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-white text-center shadow-md sm:h-52 sm:w-52">
                <span className="text-4xl font-extrabold text-emerald-600">G</span>
                <p className="text-lg font-bold text-slate-900">GigBro</p>
                <p className="mt-2 px-6 text-xs leading-snug text-slate-500">
                  AI analyzes the complete context and connects the dots.
                </p>
              </div>

              <span
                ref={centerLeftRef}
                className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-500"
              />
              <span
                ref={centerRightRef}
                className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-500"
              />
            </div>
          </div>

          {/* Right card */}
          <div className="relative z-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-bold text-emerald-700">What You Get</h3>
            <p className="mt-1 text-sm text-slate-500">
              Clarity, insights, and direction.
            </p>

            <div className="mt-4 space-y-4">
              {RIGHT_ITEMS.map((item, i) => (
                <RightRow key={item.title} {...item} dotRef={(el) => {
                  rightDotRefs.current[i] = el;
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}