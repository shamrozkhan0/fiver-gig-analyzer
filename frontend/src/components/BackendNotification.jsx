import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function BackendNotification() {
  // Start visible immediately on mount — no synchronous setState-in-effect needed
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-200 w-full max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 shadow-lg">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />

        <p className="flex-1 text-sm font-medium text-amber-800">
          Backend is not currently hosted
        </p>

        <button
          onClick={() => setVisible(false)}
          aria-label="Close notification"
          className="flex-shrink-0 rounded p-1 text-amber-500 hover:bg-amber-100 hover:text-amber-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}