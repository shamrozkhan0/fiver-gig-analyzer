import { Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
        <p className="text-sm text-slate-500 order-1">
          © {year} <span className="font-semibold text-emerald-600">GigBro</span>. All
          rights reserved.
        </p>

        <p className="order-3 flex items-center gap-1.5 text-sm text-slate-500 sm:order-2">
          <Heart className="h-4 w-4 fill-emerald-600 text-emerald-600" />
          Built with passion for freelancers
        </p>
      </div>
    </footer>
  );
};

export default Footer;