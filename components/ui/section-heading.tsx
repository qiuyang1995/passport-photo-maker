type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="text-muted text-sm tracking-[0.24em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-foreground mt-3 text-4xl leading-tight sm:text-5xl">
        {title}
      </h2>
      <p className="text-muted mt-4 max-w-2xl text-base leading-8">
        {description}
      </p>
    </div>
  );
}
