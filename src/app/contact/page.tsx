import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import Testimonials from "@/components/sections/Testimonials";
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
      <Testimonials />
    </main>
  );
}
