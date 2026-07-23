import { useEffect, useState } from "react";
import { Menu, X, Sparkles} from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Report Preview", href: "#report-preview" },
  // { label: "`Pricing`", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2 shrink-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4v13a3 3 0 0 0 3 3h13" />
          <path d="M9 16v-3" />
          <path d="M13 16v-6" />
          <path d="M17 16V7" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        Gig<span className="text-emerald-600">Bro</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const authURL = import.meta.env.VITE_BACKEND_URL + "me"
  console.log("url", authURL)


  useEffect(() => {
  async function checkIsLogin() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("ME RESPONSE:", data);

      setIsLogin(data.success);
    } catch (error) {
      console.error("Check login error:", error);
      setIsLogin(false);
    }
  }

  checkIsLogin();
}, []);

  return (
    <header className="w-full px-3 py-4 sm:px-6 fixed z-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-6">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`relative pb-1 text-[15px] font-medium transition-colors ${isActive
                    ? "text-emerald-600"
                    : "text-slate-700 hover:text-emerald-600"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-0 h-[2px] w-full rounded-full bg-emerald-600" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop actions */}
        {!isLogin ?
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login" className="rounded-lg border border-slate-200 px-5 py-2 text-[15px] font-medium text-slate-800 transition-colors hover:bg-slate-50">
              Login
            </Link>
            <Link to="/signup" className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">
              Analyze My Gig Free
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
          : <div className="">
            <Link
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700" 
              to="/dahboard">
              Dashboard
            </Link>
          </div>
        }

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-slate-700 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl bg-white p-4 shadow-sm lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.label);
                      setMobileOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <Link
              to="/login"
              onClick={() => console.log("LOGIN CLICKED")}
              className="w-full rounded-lg border border-slate-200 px-5 py-2.5 text-[15px] font-medium text-slate-800 transition-colors hover:bg-slate-50">
              Login
            </Link>
            <Link to="/signup" className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700">
              Analyze My Gig Free
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}