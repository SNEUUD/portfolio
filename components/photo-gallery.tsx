import Image from "next/image";
import { Camera } from "lucide-react";

interface Photo {
  src: string | null;
  caption: string;
}

// Grille de photos « Hors écran ». Une vignette légendée s'affiche
// tant qu'aucune image n'est fournie (src null).
export function PhotoGallery({
  intro,
  photos,
}: {
  intro: string;
  photos: Photo[];
}) {
  return (
    <div>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-2xl">
        {intro}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {photos.map(({ src, caption }) => (
          <figure
            key={caption}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted"
          >
            {src ? (
              <Image
                src={src}
                alt={caption}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground/50">
                <Camera className="h-6 w-6" aria-hidden="true" />
              </div>
            )}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
