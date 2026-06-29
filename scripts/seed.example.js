const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(process.cwd(), "database.sqlite"));

// 1. Création des tables
db.exec(`
  CREATE TABLE IF NOT EXISTS timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    title TEXT,
    content TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    tech TEXT,
    link TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    title TEXT,
    availability TEXT,
    bio TEXT,
    email TEXT UNIQUE,
    location TEXT,
    avatar_url TEXT,
    github_url TEXT,
    linkedin_url TEXT
  );
`);

// 2. Nettoyage des données existantes (évite les doublons au relancement)
db.exec("DELETE FROM timeline");
db.exec("DELETE FROM skills");
db.exec("DELETE FROM projects");
db.exec("DELETE FROM profile");

// Utilisation d'une transaction pour la performance et la sécurité
const runSeed = db.transaction(() => {
  // --- PROFILE ---
  const insertProfile = db.prepare(`
    INSERT OR REPLACE INTO profile (
      id, full_name, title, availability, bio, email, location, avatar_url, github_url, linkedin_url
    ) VALUES (
      1, @full_name, @title, @availability, @bio, @email, @location, @avatar_url, @github_url, @linkedin_url
    )
  `);
  insertProfile.run({
    full_name: "John Doe",
    title: "Développeur Full-Stack — Freelance",
    availability: "Disponible pour vos missions",
    bio: "Passionné par le développement web et les nouvelles technologies. J'aime créer des applications web performantes et élégantes.",
    email: "john.doe@example.com",
    location: "Paris, France",
    avatar_url: "",
    github_url: "https://github.com/johndoe",
    linkedin_url: "https://linkedin.com/in/johndoe",
  });

  // --- TIMELINE ---
  const insertTimeline = db.prepare(
    "INSERT INTO timeline (date, title, content) VALUES (?, ?, ?)",
  );
  const timelineData = [
    ["2023", "Début de ma formation", "J'ai commencé ma formation de développeur web chez The Hacking Project."],
    ["2024", "Stage chez Acme Inc.", "J'ai effectué un stage de 6 mois en tant que développeur front-end."],
  ];
  for (const item of timelineData) insertTimeline.run(...item);

  // --- SKILLS ---
  const insertSkill = db.prepare(
    "INSERT INTO skills (name, category) VALUES (?, ?)",
  );
  const skills = [
    ["React", "Front-end"],
    ["Next.js", "Front-end"],
    ["TypeScript", "Front-end"],
    ["JavaScript", "Front-end"],
    ["TailwindCSS", "Front-end"],
    ["Node.js", "Back-end"],
    ["SQLite", "Back-end"],
    ["Git", "Infra & DevOps"],
  ];
  for (const [name, category] of skills) insertSkill.run(name, category);

  // --- PROJECTS ---
  const insertProject = db.prepare(
    "INSERT INTO projects (name, description, tech, link, role) VALUES (?, ?, ?, ?, ?)",
  );
  const projects = [
    {
      name: "Mon Portfolio",
      description: "Le site que vous consultez actuellement. Réalisé avec Next.js et TailwindCSS.",
      tech: "Next.js, TypeScript, TailwindCSS, SQLite",
      link: "https://github.com/johndoe/portfolio",
      role: "Développeur Full-Stack",
    },
    {
      name: "Site E-commerce",
      description: "Une plateforme de vente en ligne complète avec gestion des produits, des commandes et des utilisateurs.",
      tech: "React, Node.js, Express, MongoDB",
      link: "https://github.com/johndoe/ecommerce",
      role: "Développeur Back-End",
    }
  ];

  for (const p of projects) {
    insertProject.run(p.name, p.description, p.tech, p.link, p.role);
  }
});

// Exécution de la transaction
try {
  runSeed();
  console.log("✅ Base de données initialisée avec succès !");
} catch (err) {
  console.error("❌ Erreur lors de l'initialisation :", err);
} finally {
  db.close();
}
