export const profile = {
  full_name: "Christopher Crépin",
  title: "Développeur Full-Stack — Freelance",
  availability: "Disponible pour vos missions",
  modality: "Télétravail ou sur site · Permis B + véhicule",
  languages: "Anglais B1 · Espagnol A2",
  bio: "Développeur full-stack en Mastère architecture & applications logicielles au CESI, en alternance chez KLOCEL où je développe et pilote un projet client sur Cella, leur logiciel WMS (Warehouse Management System) : développement des fonctionnalités et gestion de projet côté client au quotidien. Je conçois et développe des applications web de bout en bout, du front jusqu'à l'infrastructure. Mon projet phare, Staylow, illustre cette approche complète : c'est le besoin de le déployer qui m'a poussé à concevoir et opérer moi-même son architecture d'hébergement, auto-hébergée sur un VPS Linux durci avec Coolify, Traefik et CI/CD. Je suis disponible pour des missions freelance en développement web full-stack.",
  email: "christopher.crepin.72000@gmail.com",
  location: "Le Mans (72), France",
  avatar_url: "",
  github_url: "https://github.com/SNEUUD",
  linkedin_url: "https://www.linkedin.com/in/christopher-cr%C3%A9pin/",
};

export const timeline = [
  {
    date: "Depuis sept. 2024",
    title: "Développeur en alternance — KLOCEL, Chartres",
    content:
      "Développement, amélioration et maintenance de Cella, logiciel de gestion d'entrepôt (WMS) de KLOCEL, au sein de l'équipe de développement. Je code les fonctionnalités demandées sur un projet client et j'assure la gestion de projet côté client (cahier des charges, planning, points d'avancement), en alternance dans le cadre de mes études au CESI.",
  },
  {
    date: "2025 - en cours",
    title: "Mastère — Manager en architecture & applications logicielles des SI (BAC+5)",
    content:
      "CESI - Le Mans, en alternance. Conception d'architectures logicielles et de systèmes d'information, pilotage de projets IT.",
  },
  {
    date: "2024 - 2025",
    title: "Bachelor Concepteur Développeur d'Applications (BAC+3)",
    content:
      "CESI - Le Mans, en alternance. Développement d'applications web et logicielles, bases de données, méthodes de gestion de projet.",
  },
  {
    date: "2023 - 2024",
    title: "Bachelor Journalisme Automobile (BAC+3)",
    content:
      "ITM Graduate School - Le Mans. Écriture journalistique et culture automobile — à l'origine de mon goût pour l'univers automobile, retrouvé dans mon projet Staylow.",
  },
  {
    date: "2021 - 2023",
    title: "BTS SIO — option SLAM (BAC+2)",
    content:
      "Saint Charles Sainte Croix - Le Mans. Solutions Logicielles et Applications Métiers : développement, bases de données, gestion de projet informatique.",
  },
  {
    date: "2018 - 2021",
    title: "Baccalauréat Général — Mathématiques, NSI",
    content:
      "Le Mans. Spécialités Mathématiques et Numérique &amp; Sciences Informatiques (NSI), premiers pas en programmation.",
  },
];

export const skillsByCategory = [
  {
    category: "Front-end",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind"],
  },
  {
    category: "Back-end",
    skills: [
      "Node.js",
      "PHP",
      "Python",
      "Prisma",
      "GraphQL",
      "PostgreSQL",
      "SQL",
    ],
  },
  {
    category: "Infra & DevOps",
    skills: ["Docker", "Coolify", "Traefik", "Linux", "CI/CD", "Git"],
  },
];

export const projects = [
  {
    id: 1,
    name: "Staylow",
    description:
      "Plateforme web full-stack de découverte d'événements automobiles (rencontres, trackdays) : carte interactive des événements, authentification, géocodage des lieux, stockage de fichiers (photos/affiches) et e-mails transactionnels. C'est le besoin de déployer Staylow qui m'a conduit à concevoir et opérer toute l'architecture d'hébergement : VPS Linux durci, Coolify, Traefik et CI/CD, en auto-hébergement de bout en bout.",
    tech: "Next.js, TypeScript, Prisma, PostgreSQL, Docker, Coolify, Traefik",
    link: "https://staylow.fr",
    role: "Projet personnel — conception, développement & infrastructure",
    image: null as string | null,
  },
  {
    id: 2,
    name: "Infra & IA auto-hébergées",
    description:
      "Lab personnel : VPS Linux durci avec déploiement continu (Coolify, Traefik, CI/CD) et API de LLM local (Ollama) servie depuis un Raspberry Pi — exploration de l'intégration d'IA en local, sans dépendance à un cloud tiers.",
    tech: "Linux, Docker, Traefik, Ollama, systemd",
    link: "https://github.com/SNEUUD",
    role: "Lab personnel — infrastructure & expérimentation IA",
    image: null as string | null,
  },
];
