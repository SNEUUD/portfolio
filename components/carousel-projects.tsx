import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselProjects() {
  const projects = [
    { name: "Cesizen" },
    { name: "(Re)sources relationnelles" },
  ];
  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: projects.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-4xl font-semibold">
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
