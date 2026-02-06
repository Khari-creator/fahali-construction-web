export default function WhatsAppFloat() {
  const waNumber = "254703204119";
  const message = encodeURIComponent("Hello, I would like to discuss a project.");
  const href = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg text-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.373 0 .08 5.293.08 11.92c0 2.097.552 4.147 1.6 5.945L0 24l6.323-1.644A11.88 11.88 0 0012 23.84c6.627 0 11.92-5.293 11.92-11.92 0-3.187-1.243-6.187-3.4-8.44zM12 21.2c-1.5 0-2.97-.4-4.24-1.16l-.3-.18-3.75.98.98-3.66-.19-.31A8.9 8.9 0 013.1 11.92C3.1 7.02 7.1 3 12 3c2.38 0 4.58.93 6.26 2.62A8.92 8.92 0 0120.92 11.92 8.92 8.92 0 0112 21.2z" />
          <path d="M17.24 14.06c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.19.3-.74.97-.9 1.17-.16.19-.32.22-.6.07-.28-.15-1.17-.43-2.22-1.36-.82-.73-1.37-1.63-1.53-1.92-.16-.28-.02-.43.12-.58.12-.12.28-.32.42-.48.14-.15.18-.26.28-.43.1-.16.05-.3-.03-.45-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51-.17-.01-.36-.01-.55-.01s-.45.07-.68.32c-.23.24-.9.88-.9 2.15 0 1.26.92 2.48 1.05 2.65.12.16 1.81 2.77 4.38 3.88 3.06 1.33 3.06.89 3.62.83.56-.06 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.07-.12-.28-.18-.58-.33z" />
        </svg>
      </a>
    </div>
  );
}
