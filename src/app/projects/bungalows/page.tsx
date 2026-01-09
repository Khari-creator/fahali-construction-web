import ProjectsSection from "@/components/projects/ProjectsSection";

export const metadata = {
  title: "Bungalows | Fahali Construction Ltd",
};

export default function BungalowsPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="h-24" />
      <ProjectsSection
        initialCategory="Bungalows"
        showTabs={false}
      />
    </main>
  );
}

