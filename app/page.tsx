import db from '@/lib/db';
import PortfolioClient from '@/components/portfolio-client';

export default function Page() {
  const timelineData = db.prepare('SELECT * FROM timeline').all();
  const skillTags = db.prepare('SELECT name FROM skills').all().map((s: any) => s.name);
  const projects = db.prepare('SELECT * FROM projects').all();

  return (
    <PortfolioClient 
      timelineData={timelineData} 
      skillTags={skillTags} 
      projects={projects} 
    />
  );
}