import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Projects() {
  const projects = [
    { name: "cesizen" },
    { name: "(Re)sources relationnelles" },
  ];
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent className="-ml-4">
        {Array.from({ length: projects.length }).map((_, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-4">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-4xl font-semibold text-gray-900 dark:text-gray-50">
                    {projects[index].name}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
