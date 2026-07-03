"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Scale } from "lucide-react";
import { ModeToggle } from "@/components/theme-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { basePath } from "@/lib/utils";
import type {
  profile as profileContent,
  timeline,
  projects as projectsContent,
} from "@/lib/content";

export default function PortfolioClient({
  profile,
  timelineData,
  skillsByCategory,
  projects,
}: {
  profile: typeof profileContent;
  timelineData: typeof timeline;
  skillsByCategory: { category: string; skills: string[] }[];
  projects: typeof projectsContent;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

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
        form.reset();
        setOpen(false);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : undefined;
      toast.error(message || "Mince, ça n'a pas marché...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <section>
            <div className="flex items-center gap-5 mb-8">
              {profile?.avatar_url && (
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name || "Photo de profil"}
                  width={72}
                  height={72}
                  className="rounded-full object-cover size-16 sm:size-18 shrink-0"
                />
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
                  {profile?.full_name}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  {profile?.title}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              {profile?.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-8">
              {profile?.location && <span>{profile.location}</span>}
              {profile?.languages && <span>{profile.languages}</span>}
              {profile?.availability && (
                <Badge variant="secondary">{profile.availability}</Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4 text-sm">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Me contacter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Me contacter</DialogTitle>
                      <DialogDescription className="sr-only">
                        Formulaire pour envoyer un message par email.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div
                        className="absolute -left-[9999px]"
                        aria-hidden="true"
                      >
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
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
              <a
                href={`${basePath}/CV.pdf`}
                download="CV-Christopher-Crepin.pdf"
                className="text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                CV
              </a>
              <a
                href={`${basePath}/CV-ATS.pdf`}
                download="CV-Christopher-Crepin-ATS.pdf"
                className="text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                CV (format ATS)
              </a>
              <a
                href={profile?.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={profile?.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                GitHub
              </a>
            </div>

            <section className="py-16 sm:py-20 border-t border-border">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-8 sm:mb-10">
                Services
              </h2>
              <ServicesSection />
            </section>

            <section className="py-16 sm:py-20 border-t border-border">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-8 sm:mb-10">
                Comment je travaille
              </h2>
              <ProcessSection />
            </section>

            <section className="py-16 sm:py-20 border-t border-border">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-8 sm:mb-10">
                Mes projets
              </h2>
              <CarouselProjects projects={projects} />
            </section>

            <section className="py-16 sm:py-20 border-t border-border">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-8 sm:mb-10">
                Mes compétences
              </h2>
              <div className="flex flex-col gap-8">
                {skillsByCategory.map(({ category, skills }) => (
                  <div key={category}>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="px-3 py-1.5 text-sm rounded-full border border-border text-foreground hover:bg-accent transition-colors"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-16 sm:py-20 border-t border-border">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-8 sm:mb-10">
                Mon parcours
              </h2>
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
            </section>

            <footer className="pt-12 border-t border-border">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <p>
                  © {new Date().getFullYear()}{" "}
                  {profile?.full_name || "CRÉPIN Christopher"} - Tous droits
                  réservés
                </p>
                <span aria-hidden="true">·</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                    >
                      Mentions légales
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5" />
                        Mentions Légales
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Informations légales concernant l&apos;éditeur,
                        l&apos;hébergement et la protection des données du site.
                      </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="flex-1 min-h-0 pr-4 text-sm text-muted-foreground leading-relaxed text-left">
                      <div className="space-y-6 py-4">
                        <section>
                          <h4 className="font-bold text-foreground mb-2">
                            1. Édition du site
                          </h4>
                          <p>
                            <strong>Responsable de la publication :</strong>{" "}
                            Christopher Crépin
                            <br />
                            <strong>Statut :</strong> Entrepreneur individuel —
                            immatriculation en cours (SIRET en cours
                            d&apos;attribution)
                            <br />
                            <strong>Localisation :</strong> Le Mans (72), France
                            <br />
                            <strong>Contact :</strong>{" "}
                            {profile?.email ||
                              "christopher.crepin.72000@gmail.com"}
                          </p>
                        </section>

                        <section>
                          <h4 className="font-bold text-foreground mb-2">
                            2. Hébergement
                          </h4>
                          <p>
                            Le site est auto-hébergé par l&apos;éditeur
                            lui-même, sur une infrastructure personnelle, via
                            une connexion à internet fournie par{" "}
                            <strong>Free SAS</strong> (groupe Iliad).
                          </p>
                        </section>

                        <section>
                          <h4 className="font-bold text-foreground mb-2">
                            3. Propriété intellectuelle
                          </h4>
                          <p>
                            Sauf mention contraire, tous les contenus (textes,
                            images, logos, code) présents sur ce site sont la
                            propriété exclusive de l&apos;éditeur. Toute
                            reproduction, même partielle, est interdite sans
                            accord préalable.
                          </p>
                        </section>

                        <section>
                          <h4 className="font-bold text-foreground mb-2">
                            4. Protection des données (RGPD)
                          </h4>
                          <p>
                            Ce site ne dépose aucun cookie de mesure
                            d&apos;audience ou de suivi publicitaire. Les seules
                            données personnelles collectées sont celles
                            transmises volontairement via le formulaire de
                            contact (email et message), dans le but unique de
                            répondre à votre demande. Ces données sont
                            transmises via un webhook Discord utilisé comme
                            outil de notification interne, puis supprimées une
                            fois la demande traitée. Discord Inc. étant basé aux
                            États-Unis, cette transmission constitue un
                            transfert de données hors Union européenne, encadré
                            par les clauses contractuelles types de Discord.
                            <br />
                            <br />
                            Conformément au RGPD, vous disposez d&apos;un droit
                            d&apos;accès, de rectification et de suppression de
                            ces données, exerçable à tout moment auprès de{" "}
                            <strong>
                              {profile?.email ||
                                "christopher.crepin.72000@gmail.com"}
                            </strong>
                            . Vous disposez également du droit d&apos;introduire
                            une réclamation auprès de la <strong>CNIL</strong>{" "}
                            (www.cnil.fr) si vous estimez que le traitement de
                            vos données ne respecte pas la réglementation.
                          </p>
                        </section>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
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
