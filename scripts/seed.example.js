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
    name TEXT UNIQUE
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    job_title TEXT,
    bio TEXT,
    email TEXT,
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
  const insertProfile = db.prepare(
    "INSERT INTO profile (name, job_title, bio, email, github_url, linkedin_url) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const profileData = [
    "John Doe",
    "Développeur Full-Stack",
    "Passionné par le développement web et les nouvelles technologies. J'aime créer des applications web performantes et élégantes.",
    "john.doe@example.com",
    "https://github.com/johndoe",
    "https://linkedin.com/in/johndoe",
  ];
  insertProfile.run(...profileData);

  // --- TIMELINE ---
  const insertTimeline = db.prepare(
    "INSERT INTO timeline (date, title, content) VALUES (?, ?, ?)"
  );
  const timelineData = [
    ["2023", "Début de ma formation", "J'ai commencé ma formation de développeur web chez The Hacking Project."],
    ["2024", "Stage chez Acme Inc.", "J'ai effectué un stage de 6 mois en tant que développeur front-end."],
  ];
  for (const item of timelineData) insertTimeline.run(...item);

  // --- SKILLS ---
  const insertSkill = db.prepare("INSERT INTO skills (name) VALUES (?)");
  const skills = [
    "React",
    "Node.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "SQLite",
    "Git",
  ];
  for (const skill of skills) insertSkill.run(skill);

  // --- PROJECTS ---
  const insertProject = db.prepare(
    "INSERT INTO projects (name, description, tech, link, role) VALUES (?, ?, ?, ?, ?)"
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