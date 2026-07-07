interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// Enveloppe commune à toutes les sections de la page : espacement, bordure et titre.
export function Section({ title, children }: SectionProps) {
  return (
    <section className="py-16 sm:py-20 border-t border-border">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-8 sm:mb-10">
        {title}
      </h2>
      {children}
    </section>
  );
}
