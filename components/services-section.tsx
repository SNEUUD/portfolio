import { Code2, Database, Cloud } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Front-end",
    description:
      "Interfaces web modernes, performantes et accessibles avec React, Next.js et TypeScript.",
  },
  {
    icon: Database,
    title: "Back-end & APIs",
    description:
      "APIs avec Node.js, PHP, Python, Prisma, PostgreSQL et GraphQL.",
  },
  {
    icon: Cloud,
    title: "DevOps",
    description:
      "Conception et exploitation d'infrastructures auto-hébergées avec Docker, Coolify et CI/CD.",
  },
];

export function ServicesSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
      {services.map(({ icon: Icon, title, description }) => (
        <div key={title}>
          <Icon
            className="h-5 w-5 mb-3 text-foreground"
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold mb-1.5">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
