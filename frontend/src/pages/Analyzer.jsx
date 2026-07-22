import React from 'react'
import logo from '../images/wrench.png'
import { SiGoogleanalytics } from "react-icons/si";
import {
  FiFileText,
  FiBarChart2,
  FiCheckCircle,
  FiInfo,
  FiEdit2,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi";


// --- Circular progress ring ---------------------------------------------
function ScoreRing({ percent, color, size = 100, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
 
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EFEFEF"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">{percent}%</span>
      </div>
    </div>
  );
}
 
// --- Badge ----------------------------------------------------------------
function Badge({ tone, children }) {
  const tones = {
    yellow: "bg-amber-100 text-amber-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-500",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
 
const checklistItems = [
  "Responsive & Modern Design",
  "SEO-Friendly Structure",
  "Fast Loading Speed",
  "Easy to Edit",
  "Unlimited Revisions",
  "100% Satisfaction Guarantee",
];
 
const remarks = [
  "The description is clear and well-structured.",
  "Consider adding more keywords for better SEO.",
  "The title can be more specific and engaging.",
  "Overall content quality is good.",
];


const analyzer = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 px-6 py-10">
        <div className="max-w-[1140px] mx-auto">
          <div className="mb-8 text-2xl font-bold gap-1.5 flex items-center justify-start tracking-tight">
            <img src={logo} className='size-8' alt="" />

            <span className="text-slate-900"><span className="text-emerald-500">Gig</span> Bro</span>
          </div>

          <div className="">
            <h3 className='flex items-center justify-center gap-2 text-black text-2xl font-semibold'>
              <SiGoogleanalytics className='text-emerald-500' /> Anylytics
            </h3>



          </div>
           


             <div className='py-8'>
      <div className="w-full rounded-3xl bg-white border border-slate-100 shadow-sm p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <FiFileText size={18} />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold text-slate-800 leading-tight">
                  Re-created Gig Content
                </h2>
              </div>
            </div>
            <p className="text-sm text-slate-400 ml-12 -mt-1 mb-[30px]">
              AI-generated content based on the scraped gig
            </p>
 
            <div className="rounded-2xl border border-gray-300 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-800 leading-snug mb-4">
                I will design a professional, modern, and responsive
                WordPress website for your business
              </h3>
 
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Looking for a stunning website that not only looks great but
                also converts visitors into customers? You're in the right
                place!
              </p>
 
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                With 5+ years of experience in WordPress development, I create
                custom websites tailored to your brand and goals. Whether you
                need a business site, landing page, or eCommerce solution,
                I've got you covered.
              </p>
 
              <h4 className="text-sm font-semibold text-slate-800 mb-3">
                What You'll Get:
              </h4>
 
              <ul className="space-y-2.5 mb-6">
                {checklistItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <FiCheckCircle className="text-emerald-500 shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
 
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FiInfo size={14} />
                  Content re-created successfully by AI
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  1538 characters
                </span>
              </div>
            </div>
          </div>
 
          {/* ---------------- RIGHT COLUMN ---------------- */}
          <div className='pl-[30px] border-l border-gray-300'>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <FiBarChart2 size={18} />
              </span>
              <h2 className="text-[15px] font-semibold text-slate-800 leading-tight">
                Content Scores
              </h2>
            </div>
            <p className="text-sm text-black ml-12 -mt-1 mb-[30px]">
              AI analysis results based on best practices
            </p>
 
            {/* SEO Score */}
            <div className="rounded-2xl border border-gray-300 p-6 mb-4 flex items-center gap-5">
              <ScoreRing percent={50} color="#F5B93F" size={90} />
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  SEO Score
                </h3>
                <p className="text-xs text-slate-400 mb-2 max-w-[220px]">
                  Optimization level for search engines
                </p>
                <Badge tone="yellow">Average</Badge>
              </div>
            </div>
 
            {/* Profile + Title Score */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-2xl border border-gray-300 p-5">
                <ScoreRing percent={80} color="#34A853" size={72} stroke={7} />
                <h3 className="text-sm font-semibold text-slate-800 mt-3 mb-1">
                  Profile Description Score
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Clarity and quality of profile description
                </p>
                <Badge tone="green">Good</Badge>
              </div>
 
              <div className="rounded-2xl border border-gray-300 p-5">
                <ScoreRing percent={20} color="#EF4444" size={72} stroke={7} />
                <h3 className="text-sm font-semibold text-slate-800 mt-3 mb-1">
                  Title Score
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Effectiveness and grammar of title
                </p>
                <Badge tone="red">Needs Improvement</Badge>
              </div>
            </div>
 
            {/* Remarks */}
            <div className="rounded-2xl border border-gray-300 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FiMessageSquare className="text-slate-500" size={16} />
                <h3 className="text-sm font-semibold text-slate-800">
                  Remarks
                </h3>
              </div>
              <ul className="space-y-2">
                {remarks.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-slate-500"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
 
        {/* ---------------- FOOTER BUTTONS ---------------- */}
        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-300">
          <button className="flex items-center gap-2 rounded-full border border-emerald-500 text-emerald-600 font-semibold text-sm px-6 py-2.5 hover:bg-emerald-50 transition-colors">
            <FiEdit2 size={15} />
            Edit Content
          </button>
          <button className="flex items-center gap-2 rounded-full bg-emerald-600 text-white font-semibold text-sm px-6 py-2.5 hover:bg-emerald-700 transition-colors">
            <FiDownload size={15} />
            Export / Use This Content
          </button>
        </div>
      </div>
    </div>
        </div> {/**container**/}
      </div> {/**main**/}
    </>
  )
}

export default analyzer