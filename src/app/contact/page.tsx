import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import ContactFormSection from "@/components/contact/ContactFormSection";

export const metadata = {
  title: "Contact Us | Fahali Construction Ltd",
};

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header spacer */}
      <div className="h-24" />

      <ContactHero />
      <ContactCards />
      <ContactFormSection />
    </main>
  );
}

