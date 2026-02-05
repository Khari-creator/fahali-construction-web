import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import dynamic from "next/dynamic";
export const metadata = {
  title: "Contact Us | Fahali Construction Ltd",
};

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header spacer */}
      <div className="h-24" />

      <ContactHero />
      <ContactCards />
      {/* Map embed */}
      <section className="py-12 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <p className="mb-4 text-gray-600">Biashara Street, Hison Plaza, Nairobi</p>
          <div className="w-full aspect-[16/7] rounded overflow-hidden border">
            <iframe
              title="Fahali Builders Location"
              src="https://www.google.com/maps?q=Biashara%20Street%2C%20Hison%20Plaza%2C%20Nairobi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
