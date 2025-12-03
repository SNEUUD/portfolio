import { ModeToggle } from "@/components/theme-button";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CarouselProjects } from "@/components/carousel-projects";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projets" },
    { name: "Compétences", href: "/blog" },
  ];

  const timelineData = [
    {
      date: "2025-2027",
      title: "CESI - Le Mans",
      content: "Manager en architecture et applications logicielles des SI en alternance",
    },
    {
      date: "2024-2025",
      title: "CESI - Le Mans",
      content: "Bachelor Concepteur Développeur d’Applications en alternance",
    },
    {
      date: "2023 - 2024",
      title: "ITM Graduate School - Le Mans",
      content: "Bachelor Journalisme Automobile",
    },
    {
      date: "2021 - 2023",
      title: "Saint Charles Sainte Croix - Le Mans",
      content: "BTS SIO SLAM",
    },
  ];

  const skillTags = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Git",
    "Tailwind",
    "Shadcn UI",
    "Python",
    "GraphQL",
    "mySQL",
    "PostgreSQL",
    "Docker",
  ];

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-4">
        <nav className="flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div>
          <ModeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-6">
              CRÉPIN Christopher
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">
              Manager en architecture et applications logicielles des SI
            </p>
            <div className="flex justify-center space-x-4 mt-8 mb-12">
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button variant="default">Me contacter</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Me contacter</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="Votre email"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Votre message"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Annuler</Button>
                      </DialogClose>
                      <Button type="submit">Envoyer</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
              <Button asChild variant="outline">
                <a href="/CV.pdf" download="CV_Christopher_CREPIN.pdf">
                  Télécharger mon CV
                </a>
              </Button>
            </div>
            <section className="py-12">
              <h2 className="text-4xl font-bold text-center mb-6">
                Mes projets
              </h2>
              <CarouselProjects />
            </section>
            <section className="py-12">
              <h2 className="text-4xl font-bold text-center mb-6">
                Mes compétences
              </h2>
              <div className="grid grid-cols-5 gap-4">
                {skillTags.map((skill, index) => (
                  <div
                    key={index}
                    className="p-3 text-sm font-medium text-center rounded-lg"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>
            <section className="py-12">
              <h2 className="text-4xl font-bold text-center mb-6">
                Mon parcours
              </h2>
              <div className="relative max-w-2xl mx-auto">
                <Separator
                  orientation="vertical"
                  className="bg-muted absolute left-2 top-4 h-full"
                />
                {timelineData.map((entry, index) => (
                  <div key={index} className="relative mb-10 pl-8">
                    <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full z-10" />
                    <h5 className="text-md text-muted-foreground tracking-tight text-left mb-1 pl-3">
                      {entry.date}
                    </h5>
                    <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight text-left pl-3">
                      {entry.title}
                    </h4>
                    <Card className="my-3 border-none shadow-none text-left">
                      <CardContent className="px-3">
                        <div
                          className="prose dark:prose-invert text-foreground"
                          dangerouslySetInnerHTML={{
                            __html: entry.content,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}
