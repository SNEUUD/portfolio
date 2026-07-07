"use client";

import { Scale } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const FALLBACK_EMAIL = "christopher.crepin.72000@gmail.com";
const FALLBACK_NAME = "CRÉPIN Christopher";

export function SiteFooter({
  fullName,
  email,
}: {
  fullName?: string;
  email?: string;
}) {
  const contactEmail = email || FALLBACK_EMAIL;

  return (
    <footer className="pt-12 border-t border-border">
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {fullName || FALLBACK_NAME} - Tous droits
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
                Informations légales concernant l&apos;éditeur, l&apos;hébergement
                et la protection des données du site.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 min-h-0 pr-4 text-sm text-muted-foreground leading-relaxed text-justify">
              <div className="space-y-6 py-4">
                <section>
                  <h4 className="font-bold text-foreground mb-2">
                    1. Édition du site
                  </h4>
                  <p>
                    <strong>Responsable de la publication :</strong> Christopher
                    Crépin
                    <br />
                    <strong>Statut :</strong> Entrepreneur individuel —
                    immatriculation en cours (SIRET en cours d&apos;attribution)
                    <br />
                    <strong>Localisation :</strong> Le Mans (72), France
                    <br />
                    <strong>Contact :</strong> {contactEmail}
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-foreground mb-2">
                    2. Hébergement
                  </h4>
                  <p>
                    Le site est auto-hébergé par l&apos;éditeur lui-même, sur une
                    infrastructure personnelle, via une connexion à internet
                    fournie par <strong>Free SAS</strong> (groupe Iliad).
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-foreground mb-2">
                    3. Propriété intellectuelle
                  </h4>
                  <p>
                    Sauf mention contraire, tous les contenus (textes, images,
                    logos, code) présents sur ce site sont la propriété exclusive
                    de l&apos;éditeur. Toute reproduction, même partielle, est
                    interdite sans accord préalable.
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-foreground mb-2">
                    4. Protection des données (RGPD)
                  </h4>
                  <p>
                    Ce site ne dépose aucun cookie de mesure d&apos;audience ou de
                    suivi publicitaire. Les seules données personnelles collectées
                    sont celles transmises volontairement via le formulaire de
                    contact (email et message), dans le but unique de répondre à
                    votre demande. Ces données sont transmises via un webhook
                    Discord utilisé comme outil de notification interne, puis
                    supprimées une fois la demande traitée. Discord Inc. étant basé
                    aux États-Unis, cette transmission constitue un transfert de
                    données hors Union européenne, encadré par les clauses
                    contractuelles types de Discord.
                    <br />
                    <br />
                    Conformément au RGPD, vous disposez d&apos;un droit
                    d&apos;accès, de rectification et de suppression de ces
                    données, exerçable à tout moment auprès de{" "}
                    <strong>{contactEmail}</strong>. Vous disposez également du
                    droit d&apos;introduire une réclamation auprès de la{" "}
                    <strong>CNIL</strong> (www.cnil.fr) si vous estimez que le
                    traitement de vos données ne respecte pas la réglementation.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
}
