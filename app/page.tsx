import {
  profile,
  timeline,
  skillsByCategory,
  projects,
  interests,
} from "@/lib/content";
import PortfolioClient from "@/components/portfolio-client";

export default function Page() {
  return (
    <PortfolioClient
      profile={profile}
      timelineData={timeline}
      skillsByCategory={skillsByCategory}
      projects={projects}
      interests={interests}
    />
  );
}
