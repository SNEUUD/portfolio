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

export default function Home() {
  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projets" },
    { name: "Compétences", href: "/blog" },
  ];

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4">
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>
        <div>
          <ModeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-6">CRÉPIN Christopher</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-3">
              Manager en architecture et applications logicielles des SI
            </p>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline">Me contacter</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Me contacter</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" />
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
          </section>
        </div>
      </main>
    </div>
  );
}
