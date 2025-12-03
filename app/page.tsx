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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CarouselProjects } from "@/components/carousel-projects";

export default function Home() {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projets" },
    { name: "Compétences", href: "/blog" },
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
          </section>
        </div>
      </main>
    </div>
  );
}
