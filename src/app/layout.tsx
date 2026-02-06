import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Fahali Building & Civil Engineering Ltd",
  description:
      "Fahali Building & Civil Engineering Ltd — construction, design, and project development in East Africa.",
  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_NAME || "Fahali Building & Civil Engineering Ltd",
        description:
          "Fahali Building & Civil Engineering Ltd — construction, design, and project development in Kenya.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fahalibuilders.com",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Fahali Building & Civil Engineering Ltd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fahalibuilders.com";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: process.env.NEXT_PUBLIC_SITE_NAME || "Fahali Building & Civil Engineering Ltd",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+254703204119",
        contactType: "Customer Service",
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          key="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TopBar />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
