# Photos — section « Hors écran »

Déposez ici vos images (automobile, course, photographie), puis renseignez le
champ `src` de chaque entrée dans `lib/content.ts` → `interests.photos`.

Exemple :

```ts
{ src: "/photos/le-mans.jpg", caption: "Sur le circuit des 24 Heures du Mans" }
```

Tant que `src` vaut `null`, une vignette légendée avec une icône d'appareil
photo s'affiche à la place de l'image.

Format conseillé : JPEG/PNG en ratio 4:3, ~1200 px de large.
