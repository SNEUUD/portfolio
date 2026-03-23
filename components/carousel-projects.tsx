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

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string;
  link: string;
  consigne: string | null;
  role: string;
}

export function CarouselProjects({ projects }: { projects: Project[] }) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {projects.map((project) => {
          const techArray = project.tech.split(",").map((t) => t.trim());

          return (
            <CarouselItem key={project.id} className="pl-4 md:basis-1/2 flex">
              <div className="p-1 flex-1">
                <Card className="group relative border border-border bg-card rounded-2xl h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-md">
                  <CardContent className="p-8 flex flex-col flex-grow gap-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground/70 font-medium mt-1">
                        {project.role}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {techArray.map((t) => (
                        <Badge key={t} variant="outline" className="...">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <div className="px-8 pb-8 pt-0 flex flex-col gap-2 mt-auto">
                    <div className="h-px w-full bg-border mb-4" />
                    <Button
                      onClick={() => window.open(project.link, "_blank")}
                      className="w-full gap-2"
                    >
                      Voir le projet <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                    {project.consigne && (
                      <Button
                        onClick={() => window.open(project.consigne!, "_blank")}
                        variant="ghost"
                        className="w-full gap-2"
                      >
                        <FileText className="h-3.5 w-3.5 opacity-60" /> Consigne
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="-left-12 hidden md:flex" />
      <CarouselNext className="-right-12 hidden md:flex" />
    </Carousel>
  );
}
