"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface Photo {
  src: string | null;
  caption: string;
}

// Grille de photos « Hors écran ». Une vignette légendée s'affiche
// tant qu'aucune image n'est fournie (src null). Cliquer sur une photo
// l'ouvre en grand dans une lightbox, navigable au clavier.
export function PhotoGallery({
  intro,
  photos,
}: {
  intro: string;
  photos: Photo[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  const reportRatio = (src: string, width: number, height: number) => {
    setRatios((prev) => (prev[src] ? prev : { ...prev, [src]: width / height }));
  };

  const showPrev = () =>
    setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
  const showNext = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, photos.length]);

  const current = openIndex !== null ? photos[openIndex] : null;

  return (
    <div>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-2xl text-justify">
        {intro}
      </p>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {photos.map(({ src, caption }, index) => (
          <figure
            key={caption}
            onClick={() => src && setOpenIndex(index)}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.667rem)] grow-0 shrink-0 ${
              src ? "cursor-pointer" : ""
            }`}
          >
            {src ? (
              <Image
                src={src}
                alt={caption}
                fill
                quality={60}
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (img.naturalWidth && img.naturalHeight) {
                    reportRatio(src, img.naturalWidth, img.naturalHeight);
                  }
                }}
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

      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-xs sm:max-w-sm p-0 gap-0 overflow-hidden bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col"
        >
          <DialogTitle className="sr-only">{current?.caption}</DialogTitle>
          <DialogDescription className="sr-only">
            Utilisez les flèches gauche et droite pour naviguer entre les photos.
          </DialogDescription>

          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fermer"
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <X className="h-4 w-4" />
          </button>

          {current?.src && (
            <LightboxImage
              src={current.src}
              alt={current.caption}
              ratio={ratios[current.src]}
              onRatio={reportRatio}
              onPrev={photos.length > 1 ? showPrev : undefined}
              onNext={photos.length > 1 ? showNext : undefined}
            />
          )}

          <div className="flex flex-col gap-2 p-4">
            {photos.length > 1 && (
              <div className="flex justify-center gap-1.5">
                {photos.map((photo, index) => (
                  <span
                    key={photo.caption}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      index === openIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
            <p className="text-center text-sm text-white/80">{current?.caption}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LightboxImage({
  src,
  alt,
  ratio,
  onRatio,
  onPrev,
  onNext,
}: {
  src: string;
  alt: string;
  ratio?: number;
  onRatio: (src: string, width: number, height: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  return (
    <div
      className="relative w-full bg-black transition-[aspect-ratio] duration-300 ease-out"
      style={{ aspectRatio: ratio ?? 3 / 4, maxHeight: "70vh" }}
    >
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        quality={85}
        sizes="(max-width: 640px) 100vw, 384px"
        className={`object-contain transition-opacity duration-300 ease-out ${
          loadedSrc === src ? "opacity-100" : "opacity-0"
        }`}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            onRatio(src, img.naturalWidth, img.naturalHeight);
          }
          setLoadedSrc(src);
        }}
      />
      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Photo précédente"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Photo suivante"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
