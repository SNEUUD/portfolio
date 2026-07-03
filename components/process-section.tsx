import { Search, Code2, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Cadrage",
    description: "Échange sur le besoin, périmètre et contraintes techniques.",
  },
  {
    icon: Code2,
    title: "Développement",
    description: "Implémentation itérative, points d'avancement réguliers.",
  },
  {
    icon: Rocket,
    title: "Déploiement",
    description: "Mise en production sécurisée (Docker, CI/CD).",
  },
  {
    icon: LifeBuoy,
    title: "Suivi",
    description: "Corrections, évolutions et maintenance après livraison.",
  },
];

export function ProcessSection() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
      {steps.map(({ icon: Icon, title, description }, index) => (
        <div key={title} className="text-center">
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold">
            {index + 1}
          </div>
          <Icon
            className="h-5 w-5 mx-auto mb-2 text-muted-foreground"
            aria-hidden="true"
          />
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
