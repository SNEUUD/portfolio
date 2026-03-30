"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/theme-button";
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
import { toast } from "sonner";

export default function PortfolioClient({
  profile,
  timelineData,
  skillTags,
  projects,
}: {
  profile: {
    full_name?: string;
    title?: string;
    github_url?: string;
    linkedin_url?: string;
  };
  timelineData: any[];
  skillTags: string[];
  projects: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Récupération du préfixe configuré dans le .env
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

    try {
      // On concatène le basePath avec la route de l'API
      const res = await fetch(`${basePath}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message envoyé !");
        e.target.reset();
        setOpen(false);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }
    } catch (err: any) {
      toast.error(err.message || "Mince, ça n'a pas marché...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <section className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-6">
              {profile?.full_name}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-6 px-4 sm:px-0">
              {profile?.title}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 mb-12 max-w-2xl mx-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="w-full sm:w-auto">
                    Me contacter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Me contacter</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Votre email"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Votre message"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          type="button"
                          className="w-full sm:w-auto"
                        >
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto"
                      >
                        {loading ? "Envoi..." : "Envoyer"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV.pdf`}
                  download="CV_Christopher_CREPIN.pdf"
                >
                  Télécharger mon CV
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href={profile?.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href={profile?.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>

            <section className="py-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
                Mes projets
              </h2>
              <CarouselProjects projects={projects} />
            </section>

            <section className="py-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
                Mes compétences
              </h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto px-4">
                {skillTags.map((skill, index) => (
                  <div
                    key={index}
                    className="w-[calc(33.333%-0.5rem)] sm:w-[calc(20%-1rem)] min-w-[100px] sm:min-w-[120px] p-2 sm:p-3 text-xs sm:text-sm font-semibold text-center rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
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

            <footer className="text-center px-4">
              <p className="text-xs sm:text-sm text-gray-500">
                © {new Date().getFullYear()}{" "}
                {profile?.full_name || "CRÉPIN Christopher"}. Tous droits
                réservés.
              </p>
            </footer>
          </section>
        </div>
      </main>
      <div className="fixed bottom-4 right-4 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
