import { Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-black text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* FACEBOOK */}
        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/share/17s3mW59Z8/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-500 hover:underline"
            aria-label="Fahali Construction Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.4-3.62 3.54-3.62 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.58l-.41 2.9h-2.17v7.03C18.34 21.19 22 17.06 22 12.07z" />
            </svg>
            <span className="tracking-wide">Facebook</span>
          </a>
        </div>

      </div>
    </div>
  );
}
