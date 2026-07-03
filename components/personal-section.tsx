import Image from "next/image";

interface PersonalPhoto {
  image: string | null;
  caption: string;
}

function PersonalPhotoCard({ image, caption }: PersonalPhoto) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-muted">
        {image ? (
          <Image
            src={image}
            alt={caption}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Photo à venir
          </div>
        )}
      </div>
      <figcaption className="text-xs text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

export function PersonalSection({ photos }: { photos: PersonalPhoto[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
      {photos.map((photo, index) => (
        <PersonalPhotoCard key={index} {...photo} />
      ))}
    </div>
  );
}
