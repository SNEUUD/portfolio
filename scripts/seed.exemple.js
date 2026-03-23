const Database = require("better-sqlite3");
const path = require("path");

// On cible le fichier à la racine du projet
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
    consigne TEXT,
    role TEXT
  );
`);

// 2. Nettoyage des données existantes (évite les doublons au relancement)
db.exec("DELETE FROM timeline");
db.exec("DELETE FROM skills");
db.exec("DELETE FROM projects");

// Utilisation d'une transaction pour la performance et la sécurité
const runSeed = db.transaction(() => {
  // --- TIMELINE ---
  const insertTimeline = db.prepare(
    "INSERT INTO timeline (date, title, content) VALUES (?, ?, ?)"
  );
  const timelineData = [
  ];
  for (const item of timelineData) insertTimeline.run(...item);

  // --- SKILLS ---
  const insertSkill = db.prepare("INSERT INTO skills (name) VALUES (?)");
  const skills = [
  ];
  for (const skill of skills) insertSkill.run(skill);

  // --- PROJECTS ---
  const insertProject = db.prepare(
    "INSERT INTO projects (name, description, tech, link, consigne, role) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const projects = [];

  for (const p of projects) {
    insertProject.run(p.name, p.description, p.tech, p.link, p.consigne, p.role);
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