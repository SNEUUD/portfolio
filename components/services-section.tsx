import { Code2, Database, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {services.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="text-left">
            <CardHeader>
              <Icon
                className="h-6 w-6 mb-2 text-foreground"
                aria-hidden="true"
              />
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
