import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { timeline } from "@/lib/content";

export function TimelineSection({
  timelineData,
}: {
  timelineData: typeof timeline;
}) {
  return (
    <div className="relative">
      <Separator
        orientation="vertical"
        className="bg-border absolute left-2 top-4 h-full"
      />
      {timelineData.map((entry, index) => (
        <div key={index} className="relative mb-10 pl-8">
          <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full z-10" />
          <h4 className="text-sm text-muted-foreground tracking-tight mb-1 pl-3">
            {entry.date}
          </h4>
          <h3 className="py-1 text-lg font-semibold tracking-tight pl-3">
            {entry.title}
          </h3>
          <Card className="my-3 border-none shadow-none">
            <CardContent className="px-3">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {entry.content}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
