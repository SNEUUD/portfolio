"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText } from "lucide-react";

export function CarouselProjects() {
  const projects = [
    {
      index: "01",
      name: "(Re)sources Relationnelles",
      description:
        "Plateforme collaborative dédiée au partage de ressources pédagogiques et sociales. Système de modération complet, gestion fine des droits utilisateurs et interactions sociales sécurisées.",
      tech: ["Flutter Web", "Node.js", "Express", "MySQL"],
      link: "https://ccrepin.freeboxos.fr/projects/re-sources",
      consigne: "re-sources.docx",
      role: "Projet scolaire",
    },
    {
      index: "02",
      name: "Cesizen",
      description:
        "Solution complète de gestion citoyenne permettant aux résidents de signaler des incidents urbains et de suivre les résolutions en temps réel.",
      tech: ["Flutter Web", "Node.js", "Express", "MySQL"],
      link: "https://ccrepin.freeboxos.fr/projects/cesizen",
      consigne: "cesizen.pdf",
      role: "Projet scolaire",
    },
    {
      index: "03",
      name: "Staylow",
      description:
        "Plateforme événementielle pour passionnés d'automobile. Géolocalisation des rassemblements, expositions et trackdays. L'agenda central de la culture automotive.",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      link: "https://staylow.fr",
      role: "Projet personnel",
    },
  ];

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {projects.map((project, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 flex">
            <div className="p-1 flex-1">
              <Card className="group relative border border-border bg-card rounded-2xl h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-md">

                <CardContent className="p-8 flex flex-col flex-grow gap-6">

                  {/* Header */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground/70 font-medium mt-1">
                      {project.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-150"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Footer actions */}
                <div className="px-8 pb-8 pt-0 flex flex-col gap-2 mt-auto">
                  <div className="h-px w-full bg-border mb-4" />
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full h-10 text-sm font-semibold rounded-xl gap-2 transition-all duration-150 active:scale-[0.98]"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    Voir le projet
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                  {project.consigne && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-10 text-sm font-medium rounded-xl gap-2 text-muted-foreground hover:text-foreground transition-all duration-150 active:scale-[0.98]"
                      onClick={() => window.open(project.consigne, "_blank")}
                    >
                      <FileText className="h-3.5 w-3.5 opacity-60" />
                      Consigne
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-12 hidden md:flex h-9 w-9 border-border hover:bg-accent transition-colors" />
      <CarouselNext className="-right-12 hidden md:flex h-9 w-9 border-border hover:bg-accent transition-colors" />
    </Carousel>
  );
}
