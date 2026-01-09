import ProjectsSection from "@/components/projects/ProjectsSection";

export const metadata = {
  title: "Maisonettes | Fahali Construction Ltd",
};

export default function MaisonettesPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="h-24" />
      <ProjectsSection
        initialCategory="Maisonettes"
        showTabs={false}
      />
    </main>
  );
}
