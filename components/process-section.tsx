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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
      {steps.map(({ icon: Icon, title, description }) => (
        <div key={title}>
          <Icon
            className="h-4 w-4 mb-2 text-muted-foreground"
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
