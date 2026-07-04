import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ContactDialog } from "@/components/contact-dialog";
import { basePath } from "@/lib/utils";
import type { profile as profileContent } from "@/lib/content";

const linkClass =
  "text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors";

export function ProfileHeader({ profile }: { profile: typeof profileContent }) {
  return (
    <div>
      <div className="flex items-center gap-5 mb-8">
        {profile?.avatar_url && (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || "Photo de profil"}
            width={72}
            height={72}
            className="rounded-full object-cover size-16 sm:size-18 shrink-0"
          />
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
            {profile?.full_name}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {profile?.title}
          </p>
        </div>
      </div>

      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
        {profile?.bio}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-10">
        {profile?.location && <span>{profile.location}</span>}
        {profile?.languages && <span>{profile.languages}</span>}
        {profile?.availability && (
          <Badge variant="secondary">{profile.availability}</Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-16 sm:mb-20 text-sm">
        <ContactDialog />
        <a
          href={`${basePath}/CV.pdf`}
          download="CV-Christopher-Crepin.pdf"
          className={linkClass}
        >
          CV
        </a>
        <a
          href={`${basePath}/CV-ATS.pdf`}
          download="CV-Christopher-Crepin-ATS.pdf"
          className={linkClass}
        >
          CV (format ATS)
        </a>
        <a
          href={profile?.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          LinkedIn
        </a>
        <a
          href={profile?.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
