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
import type { profile as profileContent, timeline, projects as projectsContent } from "@/lib/content";

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
                      <DialogDescription className="sr-only">
                        Formulaire pour envoyer un message par email.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="absolute -left-[9999px]" aria-hidden="true">
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
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href={`${basePath}/CV.pdf`}
                  download="CV-Christopher-Crepin.pdf"
                >
                  CV
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href={`${basePath}/CV-ATS.pdf`}
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
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
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
                    <h4 className="text-md text-muted-foreground tracking-tight text-left mb-1 pl-3">
                      {entry.date}
                    </h4>
                    <h3 className="rounded-xl py-2 text-xl font-bold tracking-tight text-left pl-3">
                      {entry.title}
                    </h3>
                    <Card className="my-3 border-none shadow-none text-left">
                      <CardContent className="px-3">
                        <p className="text-foreground whitespace-pre-line">
                          {entry.content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>

            <footer className="text-center px-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
                <p>
                  © {new Date().getFullYear()}{" "}
                  {profile?.full_name || "CRÉPIN Christopher"}. Tous droits
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
                      Informations légales concernant l&apos;éditeur, l&apos;hébergement et la protection des données du site.
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
                          {profile?.email || "christopher.crepin.72000@gmail.com"}
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
                          Ce site ne dépose aucun cookie de mesure d&apos;audience
                          ou de suivi publicitaire. Les seules données
                          personnelles collectées sont celles transmises
                          volontairement via le formulaire de contact (email
                          et message), dans le but unique de répondre à votre
                          demande. Ces données sont transmises via un webhook
                          Discord utilisé comme outil de notification interne,
                          puis supprimées une fois la demande traitée. Discord
                          Inc. étant basé aux États-Unis, cette transmission
                          constitue un transfert de données hors Union
                          européenne, encadré par les clauses contractuelles
                          types de Discord.
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
                          une réclamation auprès de la{" "}
                          <strong>CNIL</strong> (www.cnil.fr) si vous estimez
                          que le traitement de vos données ne respecte pas la
                          réglementation.
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
