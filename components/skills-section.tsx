export function SkillsSection({
  skillsByCategory,
}: {
  skillsByCategory: { category: string; skills: string[] }[];
}) {
  return (
    <div className="flex flex-col gap-8">
      {skillsByCategory.map(({ category, skills }) => (
        <div key={category}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-3 py-1.5 text-sm rounded-full border border-border text-foreground hover:bg-accent transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
