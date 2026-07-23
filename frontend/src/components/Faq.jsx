import { useState } from "react";
import {
  HelpCircle,
  Search,
  Target,
  BarChart3,
  DollarSign,
  Clock,
  Headphones,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

const FAQS = [
  {
    icon: Search,
    question: "What is GigBro?",
    answer:
      "GigBro is an AI-powered Fiverr gig analyzer that helps freelancers optimize their gigs for better visibility, more clicks, and higher orders.",
  },
  {
    icon: Target,
    question: "How does GigBro analyze my gig?",
    answer:
      "GigBro reads the full context of your gig \u2014 title, description, tags, packages, category, and seller signals \u2014 to score its SEO, buyer alignment, positioning, and conversion potential.",
  },
  {
    icon: BarChart3,
    question: "Is my gig data safe with GigBro?",
    answer:
      "Yes. GigBro only reads publicly available gig information and never stores sensitive account data or shares it with third parties.",
  },
  {
    icon: DollarSign,
    question: "Do I need to add my Fiverr credentials?",
    answer:
      "No. GigBro works entirely from your public gig page, so you never need to enter your Fiverr username or password.",
  },
  {
    icon: Clock,
    question: "How long does the analysis take?",
    answer:
      "Most gigs are analyzed in under a minute. You'll get a full report with a score, insights, and recommendations almost instantly.",
  },
  {
    icon: Headphones,
    question: "Do you offer support?",
    answer:
      "Yes, our support team is available to help with setup, questions about your report, or anything else you need.",
  },
];

function FaqItem({ icon: Icon, question, answer, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white px-5 shadow-sm sm:px-6">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Icon className="h-4 w-4" />
        </span>

        <span className="flex-1 text-base font-semibold text-slate-900">
          {question}
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 pb-5 pt-4 ">
            <p className="pl-0 text-sm leading-relaxed text-slate-500 sm:pl-[52px]">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Everything you need to know about GigBro.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-4">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          Still have questions?{" "}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shamrozkhan0319@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-600 hover:underline"
            >
            Contact us
            </a>
        </div>
      </div>
    </section>
  );
}