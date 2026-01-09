import ProjectsSection from "@/components/projects/ProjectsSection";

export const metadata = {
  title: "Maisonettes | Fahali Construction Ltd",
};

export default function ApartmentsPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="h-24" />
      <ProjectsSection
        initialCategory="Apartments"
        showTabs={false}
      />
    </main>
  );
}
