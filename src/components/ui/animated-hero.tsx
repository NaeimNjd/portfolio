import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, MapPin, GraduationCap, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import naeimPhoto from "@/assets/naeim.jpg";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["zuverlässig", "skalierbar", "sicher", "effizient", "modern"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="grid max-w-3xl gap-10 py-16 lg:grid-cols-[300px_1fr] lg:py-24">
          {/* Profile card */}
          <div className="pointer-events-auto mx-auto w-full max-w-sm rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-md">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-foreground/30 to-primary blur-sm opacity-60" />
                <img
                  src={naeimPhoto}
                  alt="Naeim Najafvand Drikvand"
                  className="relative h-32 w-32 rounded-full object-cover object-top ring-2 ring-background"
                />
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Verfügbar für neue Stellen
              </div>
              <h2 className="mt-3 text-base font-semibold">
                Naeim Najafvand Drikvand
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                IT-Systemadministrator · Berlin
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> 12277 Berlin
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> M.Sc. Information Technology
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 0178 9376344
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Naeim4naeim@gmail.com
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["🇩🇪 DE B1–B2", "🇬🇧 EN B1–B2", "🇮🇷 FA Muttersprache"].map(
                (l) => (
                  <span
                    key={l}
                    className="rounded border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                  >
                    {l}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Hero text */}
          <div className="flex flex-col gap-6">
            <div className="pointer-events-auto">
              <Button variant="secondary" size="sm" className="gap-4">
                IT Infrastructure Expert · Berlin <MoveRight className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="max-w-2xl text-5xl font-regular tracking-tighter md:text-7xl">
              <span className="text-foreground">IT-Infrastruktur</span>
              <span className="relative flex w-full overflow-hidden text-left md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              IT-Systemadministrator aus Berlin mit über 10 Jahren Erfahrung in
              Linux, Proxmox, pfSense und Windows Server. M.Sc. IT — ich plane,
              automatisiere und betreibe Infrastrukturen, die einfach laufen.
            </p>
            <div className="pointer-events-auto">
              <Link to="/contact">
                <Button size="lg" className="gap-4">
                  Kontakt aufnehmen <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
