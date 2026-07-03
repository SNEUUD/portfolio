export const profile = {
  full_name: "Christopher Crépin",
  title: "Développeur Full-Stack — Freelance",
  availability: "Disponible pour missions",
  languages: "Anglais B1",
  bio: "Développeur full-stack en Mastère architecture & applications logicielles. Je conçois et développe des applications web de bout en bout, du front jusqu'à l'infrastructure. Je suis disponible pour des missions freelance en développement web full-stack.",
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
      "CESI  en alternance - Le Mans. Spécialité : Manager en architecture & applications logicielles des SI : méthodes et outils de gestion de projets.",
  },
  {
    date: "2024 - 2025",
    title: "Bachelor Concepteur Développeur d'Applications (BAC+3)",
    content:
      "CESI en alternance - Le Mans. Spécialités Concepteur Développeur d'Applications : développement d'applications web et logicielles, bases de données, méthodes de gestion de projet.",
  },
  {
    date: "2023 - 2024",
    title: "Bachelor Journalisme Automobile",
    content:
      "ITM Graduate School - Le Mans. Écriture journalistique et culture automobile.",
  },
  {
    date: "2021 - 2023",
    title: "BTS SIO — SLAM (BAC+2)",
    content:
      "Saint Charles Sainte Croix - Le Mans. Spécialités Solutions Logicielles et Applications Métiers : développement, bases de données, gestion de projet informatique.",
  },
  {
    date: "2018 - 2021",
    title: "Baccalauréat Général — Mathématiques, NSI",
    content:
      "Saint Charles Sainte Croix - Le Mans. Spécialités Mathématiques et Numérique et Sciences Informatiques (NSI).",
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
    skills: ["Docker", "Coolify", "Linux", "CI/CD", "Git"],
  },
];

export const projects = [
  {
    id: 1,
    name: "Staylow",
    description:
      "Plateforme web full-stack de découverte d'événements automobiles (rencontres, trackdays) : carte interactive des événements, authentification, géocodage des lieux, stockage de fichiers (photos/affiches) et e-mails transactionnels.",
    tech: "Next.js, TypeScript, Prisma, PostgreSQL, Docker, Coolify",
    link: "https://events.staylow.fr",
    role: "Projet personnel — conception, développement & infrastructure",
    image: null as string | null,
  }
];
