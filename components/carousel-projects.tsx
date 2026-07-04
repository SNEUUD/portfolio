"use client";

import Image from "next/image";
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
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string;
  link: string;
  role: string;
  image?: string | null;
}

function ProjectImage({
  image,
  name,
}: {
  image?: string | null;
  name: string;
}) {
  if (!image) return null;
  return (
    <div className="relative h-40 w-full overflow-hidden border-b border-border">
      <Image
        src={image}
        alt={`Aperçu du projet ${name}`}
        fill
        className="object-cover"
      />
    </div>
  );
}

function ProjectCard({
  project,
  descriptionClassName,
}: {
  project: Project;
  descriptionClassName: string;
}) {
  const techArray = project.tech.split(",").map((t) => t.trim());

  return (
    <Card className="group relative border border-border bg-card rounded-xl h-[560px] flex flex-col overflow-hidden shadow-none transition-colors duration-300 hover:bg-accent/50">
      <ProjectImage image={project.image} name={project.name} />
      <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow gap-4 sm:gap-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          <p className="text-xs text-muted-foreground/70 font-medium mt-1">
            {project.role}
          </p>
        </div>

        <p className={descriptionClassName}>{project.description}</p>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {techArray.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>

      <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-0 flex flex-col gap-2 mt-auto">
        <div className="h-px w-full bg-border mb-3 sm:mb-4" />
        <Button
          onClick={() => window.open(project.link, "_blank")}
          className="w-full gap-2 text-sm"
        >
          Voir le projet <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </Button>
      </div>
    </Card>
  );
}

export function CarouselProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 1) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center px-4">
          <div className="w-full max-w-md">
            <ProjectCard
              project={projects[0]}
              descriptionClassName="text-sm text-muted-foreground leading-relaxed overflow-hidden text-ellipsis line-clamp-4 flex-grow"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent className="-ml-4">
        {projects.map((project) => (
          <CarouselItem key={project.id} className="pl-4 md:basis-1/2 flex">
            <div className="p-1 flex-1">
              <ProjectCard
                project={project}
                descriptionClassName="text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4 flex-grow"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-12 hidden md:flex" />
      <CarouselNext className="-right-12 hidden md:flex" />
    </Carousel>
  );
}
