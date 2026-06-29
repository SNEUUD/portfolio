import db from "@/lib/db";
import PortfolioClient from "@/components/portfolio-client";

const SKILL_CATEGORY_ORDER = ["Front-end", "Back-end", "Infra & DevOps"];

export default function Page() {
  const timelineData = db.prepare("SELECT * FROM timeline").all();
  const skillRows = db
    .prepare("SELECT name, category FROM skills")
    .all() as { name: string; category: string }[];
  const skillsByCategory = SKILL_CATEGORY_ORDER.map((category) => ({
    category,
    skills: skillRows
      .filter((s) => s.category === category)
      .map((s) => s.name),
  })).filter((group) => group.skills.length > 0);
  const projects = db.prepare("SELECT * FROM projects").all() as any[];
  const profile = db.prepare("SELECT * FROM profile WHERE id = 1").get() as any;

  return (
    <PortfolioClient
      profile={profile}
      timelineData={timelineData}
      skillsByCategory={skillsByCategory}
      projects={projects}
    />
  );
}
