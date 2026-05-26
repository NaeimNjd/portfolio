import { SECTIONS, setSection, useSection, type Section } from "@/lib/section-store";

const items: { id: Section; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "Über mich" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Erfahrung" },
  { id: "contact", label: "Kontakt" },
];

export function SiteNav() {
  const active = useSection();
  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setSection(it.id)}
              className={
                isActive
                  ? "rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  : "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              }
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export { SECTIONS };
