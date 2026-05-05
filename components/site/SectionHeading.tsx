import { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  tone = "light",
  className = "",
  children,
}: Props) => {
  const isDark = tone === "dark";

  return (
    <div
      className={`mb-6 md:mb-8 flex-col gap-4 text-start flex items-start justify-start ${className}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.3em] ${
              isDark ? "text-background/60" : "text-muted-foreground"
            }`}
          >
            {eyebrow}
          </p>
        </div>
      )}
      <h2
        className={`text-2xl md:text-5xl leading-[0.95] max-w-3xl font-bold ${
          isDark ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-xl text-sm md:text-base leading-relaxed ${
            isDark ? "text-background/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
