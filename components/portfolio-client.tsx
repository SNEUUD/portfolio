"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
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
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function PortfolioClient({
  profile,
  timelineData,
  skillsByCategory,
  projects,
}: {
  profile: {
    full_name?: string;
    title?: string;
    availability?: string;
    modality?: string;
    languages?: string;
    bio?: string;
    email?: string;
    location?: string;
    avatar_url?: string;
    github_url?: string;
    linkedin_url?: string;
  };
  timelineData: any[];
  skillsByCategory: { category: string; skills: string[] }[];
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
            {profile?.avatar_url && (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || "Photo de profil"}
                width={112}
                height={112}
                className="mx-auto mb-6 rounded-full object-cover size-28"
              />
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-6">
              {profile?.full_name}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-3 px-4 sm:px-0">
              {profile?.title}
            </p>
            {profile?.availability && (
              <Badge variant="secondary" className="mb-4">
                {profile.availability}
              </Badge>
            )}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-8">
              {profile?.location && <span>{profile.location}</span>}
              {profile?.modality && <span>{profile.modality}</span>}
              {profile?.languages && <span>{profile.languages}</span>}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 mb-4 max-w-2xl mx-auto">
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
                  download="CV-Christopher-Crepin.pdf"
                >
                  Télécharger mon CV
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/CV-ATS.pdf`}
                  download="CV-Christopher-Crepin-ATS.pdf"
                >
                  CV (format ATS)
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

            {profile?.email && (
              <p className="text-sm text-muted-foreground mb-12">
                Ou écrivez-moi directement à{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="underline hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </a>
              </p>
            )}

            <section className="py-12 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
                À propos de moi
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
                {profile?.bio}
              </p>
            </section>

            <section className="py-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
                Services
              </h2>
              <ServicesSection />
            </section>

            <section className="py-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-10">
                Comment je travaille
              </h2>
              <ProcessSection />
            </section>

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
              <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
                {skillsByCategory.map(({ category, skills }) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3 text-left">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="w-[calc(33.333%-0.5rem)] sm:w-[calc(20%-1rem)] min-w-[100px] sm:min-w-[120px] p-2 sm:p-3 text-xs sm:text-sm font-semibold text-center rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
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
