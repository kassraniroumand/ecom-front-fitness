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
      className={`mb-6 md:mb-8 flex flex-col gap-4 text-start items-start justify-start w-full min-w-0 ${className}`}
    >
      {eyebrow && (
        <div className="flex flex-wrap items-center gap-3 max-w-full">
          <span className="h-px w-8 bg-accent shrink-0" />
          <p
            className={`min-w-0 break-words text-[11px] font-bold uppercase tracking-[0.3em] ${
              isDark ? "text-background/60" : "text-muted-foreground"
            }`}
          >
            {eyebrow}
          </p>
        </div>
      )}
      <h2
        className={`text-2xl md:text-5xl leading-[0.95] max-w-3xl break-words font-bold ${
          isDark ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-xl break-words text-sm md:text-base leading-relaxed ${
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
