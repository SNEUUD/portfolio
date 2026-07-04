import { ModeToggle } from "@/components/theme-button";
import { Section } from "@/components/section";
import { ProfileHeader } from "@/components/profile-header";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { CarouselProjects } from "@/components/carousel-projects";
import { PhotoGallery } from "@/components/photo-gallery";
import { SkillsSection } from "@/components/skills-section";
import { TimelineSection } from "@/components/timeline-section";
import { SiteFooter } from "@/components/site-footer";
import type {
  profile as profileContent,
  timeline,
  projects as projectsContent,
  interests as interestsContent,
} from "@/lib/content";

export default function PortfolioClient({
  profile,
  timelineData,
  skillsByCategory,
  projects,
  interests,
}: {
  profile: typeof profileContent;
  timelineData: typeof timeline;
  skillsByCategory: { category: string; skills: string[] }[];
  projects: typeof projectsContent;
  interests: typeof interestsContent;
}) {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <ProfileHeader profile={profile} />

          <Section title="Services">
            <ServicesSection />
          </Section>

          <Section title="Comment je travaille">
            <ProcessSection />
          </Section>

          <Section title="Mes projets">
            <CarouselProjects projects={projects} />
          </Section>

          <Section title="Mes compétences">
            <SkillsSection skillsByCategory={skillsByCategory} />
          </Section>

          <Section title="Mon parcours">
            <TimelineSection timelineData={timelineData} />
          </Section>

          <Section title="Hors écran">
            <PhotoGallery intro={interests.intro} photos={interests.photos} />
          </Section>

          <SiteFooter fullName={profile?.full_name} email={profile?.email} />
        </div>
      </main>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
