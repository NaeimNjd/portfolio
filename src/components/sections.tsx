import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, MapPin, GraduationCap, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSection } from "@/lib/section-store";
import naeimPhoto from "@/assets/naeim.jpg";

/* ---------- HOME ---------- */
export function HomeSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["zuverlässig", "skalierbar", "sicher", "effizient", "modern"],
    []
  );

  useEffect(() => {
    const t = setTimeout(
      () => setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1)),
      2000
    );
    return () => clearTimeout(t);
  }, [titleNumber, titles]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-md">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-foreground/30 to-primary opacity-60 blur-sm" />
            <img
              src={naeimPhoto}
              alt="Naeim Najafvand Drikvand"
              className="relative h-28 w-28 rounded-full object-cover object-top ring-2 ring-background"
            />
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Verfügbar für neue Stellen
          </div>
          <h2 className="mt-3 text-base font-semibold">Naeim Najafvand Drikvand</h2>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            IT-Systemadministrator · Berlin
          </p>
        </div>
        <ul className="mt-5 space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> 12277 Berlin</li>
          <li className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5" /> M.Sc. Information Technology</li>
          <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> 0178 9376344</li>
          <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Naeim4naeim@gmail.com</li>
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <Button variant="secondary" size="sm" className="gap-4">
            IT Infrastructure Expert · Berlin <MoveRight className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="max-w-2xl text-4xl font-regular tracking-tighter md:text-6xl lg:text-7xl">
          <span className="text-foreground">IT-Infrastruktur</span>
          <span className="relative flex w-full overflow-hidden text-left md:pb-2 md:pt-1">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-semibold text-primary"
                initial={{ opacity: 0, y: -100 }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed tracking-tight text-muted-foreground md:text-lg">
          IT-Systemadministrator aus Berlin mit über 10 Jahren Erfahrung in
          Linux, Proxmox, pfSense und Windows Server. M.Sc. IT — ich plane,
          automatisiere und betreibe Infrastrukturen, die einfach laufen.
        </p>
        <div>
          <Button size="lg" className="gap-4" onClick={() => setSection("contact")}>
            Kontakt aufnehmen <MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
export function AboutSection() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">01 · Über mich</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
        Wer ich <span className="text-primary">bin</span>
      </h2>
      <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        <p>
          Ich bin <strong className="text-foreground">Naeim Najafvand Drikvand</strong> —
          IT-Systemadministrator mit über <strong className="text-foreground">10 Jahren internationaler Erfahrung</strong>.
          Mein Weg führte mich vom Iran über Brandenburg bis nach Berlin.
        </p>
        <p>
  Akademisches Fundament: <strong className="text-foreground">Bachelor IT</strong> (Esfahan) und{" "}
  <strong className="text-foreground">Master Information Technology</strong> (Teheran). Zusätzlich
  habe ich an der <strong className="text-foreground">Technischen Hochschule Brandenburg</strong> studiert.
  Neben klassischer Administration bringe ich Know-how in KI-Tools, Webentwicklung und digitalem Marketing mit.
</p>
        <p>
          Mein Fokus: robuste, sichere und skalierbare Systeme — administriert mit Sorgfalt, automatisiert mit Python &amp; Bash,
          gesichert mit pfSense und Fortinet.
        </p>
      </div>
    </div>
  );
}

/* ---------- SKILLS ---------- */
const groups = [
  { cat: "Server & OS", items: ["Linux Ubuntu/Debian", "Windows Server", "Bash", "Active Directory", "Samba AD-DC"] },
  { cat: "Hypervisor", items: ["Proxmox VE", "VMware vSphere", "Hyper-V"] },
  { cat: "Firewall & Netz", items: ["pfSense", "Fortinet", "VPN", "VLAN"] },
  { cat: "Backup", items: ["Borg Backup", "Veeam", "Disaster Recovery", "MySQL"] },
  { cat: "Cloud & Office", items: ["Office 365", "MS Dynamics", "Zoho CRM"] },
  { cat: "Dev & KI", items: ["Python", "Bash", "Java", "KI-Tools"] },
];

export function SkillsSection() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">02 · Kompetenzen</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
        Was ich <span className="text-primary">beherrsche</span>
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.cat} className="rounded-xl border border-border bg-card/70 p-4 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{g.cat}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <span key={i} className="rounded border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- EXPERIENCE ---------- */
const jobs = [
  { tab: "Modul-bildung", date: "04/2023 – heute · Berlin", role: "IT-Systemadministrator", company: "Modul-bildung GmbH",
    bullets: ["Linux-Server (Ubuntu/Debian)", "Proxmox-Virtualisierung", "pfSense & Fortinet", "Backup mit Borg & Veeam", "Samba AD-DC, Office 365, Zoho"],
    tags: ["Linux", "Proxmox", "pfSense", "Fortinet", "Veeam"] },
  { tab: "Chenare", date: "06/2018 – 02/2023 · Iran", role: "Systemadministrator", company: "Chenare Andimeshk",
    bullets: ["Windows Server & Active Directory", "VMware-Administration", "MySQL & WordPress", "IT-Support 2nd/3rd-Level"],
    tags: ["Windows Server", "AD", "VMware", "MySQL"] },
  { tab: "Sedak", date: "12/2017 – 04/2018 · Brandenburg", role: "IT-Praktikum", company: "Sedak GmbH",
    bullets: ["Ubuntu-Installation & Wartung", "Hard- und Softwarebeschaffung", "Backup-Prozesse"],
    tags: ["Ubuntu", "Hardware"] },
  { tab: "Pegah", date: "07/2013 – 01/2016 · Iran", role: "Help Desk (Werkstudent)", company: "Pegah",
    bullets: ["IT-Support für Endbenutzer", "Hard-/Software-Diagnose", "Arbeitsplatz-Einrichtung"],
    tags: ["IT-Support", "Hardware"] },
];

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const job = jobs[active];
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">03 · Berufserfahrung</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
        Mein <span className="text-primary">Weg</span>
      </h2>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {jobs.map((j, i) => (
          <button
            key={j.tab}
            onClick={() => setActive(i)}
            className={`rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              active === i ? "bg-primary/15 text-primary border border-primary/40" : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {j.tab}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">{job.date}</p>
        <h3 className="mt-1 text-xl font-bold tracking-tight">{job.role}</h3>
        <p className="font-mono text-xs text-muted-foreground">{job.company}</p>
        <ul className="mt-3 space-y-1.5">
          {job.bullets.map((b) => (
            <li key={b} className="relative pl-5 text-sm text-muted-foreground">
              <span className="absolute left-0 font-bold text-primary">›</span>{b}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.tags.map((t) => (
            <span key={t} className="rounded border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-mono text-primary">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- CONTACT ---------- */
const contacts = [
  { icon: Mail, label: "E-Mail", value: "Naeim4naeim@gmail.com", href: "mailto:Naeim4naeim@gmail.com" },
  { icon: Phone, label: "Telefon", value: "0178 9376344", href: "tel:+4917893763444" },
  { icon: MapPin, label: "Standort", value: "An den Klostergärten 45, 12277 Berlin", href: null as string | null },
];

export function ContactSection() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">04 · Kontakt</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
        Lass uns <span className="text-primary">sprechen</span>
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
        Verfügbar für Festanstellung oder Freelance-Projekte in Berlin.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {contacts.map(({ icon: Icon, label, value, href }) => {
          const inner = (
            <div className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card/70 p-4 backdrop-blur-sm transition-colors hover:border-primary/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          );
          return href ? <a key={label} href={href}>{inner}</a> : <div key={label}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
