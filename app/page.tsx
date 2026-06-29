import { profile, timeline, skillsByCategory, projects } from "@/lib/content";
import PortfolioClient from "@/components/portfolio-client";

export default function Page() {
  return (
    <PortfolioClient
      profile={profile}
      timelineData={timeline}
      skillsByCategory={skillsByCategory}
      projects={projects}
    />
  );
}
