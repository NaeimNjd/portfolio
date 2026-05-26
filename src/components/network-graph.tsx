import { useEffect, useRef } from "react";

type NodeT = {
  x: number; y: number; z: number;
  ox: number; oy: number; oz: number;
  type: "core" | "server" | "vm" | "firewall" | "cloud" | "backup";
  label: string;
  color: string;
};

const baseNodes: Omit<NodeT, "ox" | "oy" | "oz">[] = [
  { x: 0, y: 0, z: 0, type: "core", label: "Core Switch", color: "#1556d6" },
  { x: -110, y: -30, z: 30, type: "server", label: "Linux Server", color: "#0098b8" },
  { x: 110, y: -30, z: 30, type: "server", label: "Windows Server", color: "#1556d6" },
  { x: -110, y: 30, z: -30, type: "vm", label: "Proxmox VE", color: "#6d3fdb" },
  { x: 110, y: 30, z: -30, type: "vm", label: "VMware vSphere", color: "#6d3fdb" },
  { x: 0, y: -120, z: 50, type: "firewall", label: "pfSense", color: "#0aa17a" },
  { x: 0, y: 120, z: -50, type: "firewall", label: "Fortinet", color: "#0aa17a" },
  { x: -90, y: 90, z: 60, type: "firewall", label: "VPN / VLAN", color: "#0aa17a" },
  { x: 90, y: -90, z: -60, type: "cloud", label: "Office 365", color: "#c7841a" },
  { x: 140, y: 60, z: 60, type: "cloud", label: "Zoho ERP", color: "#c7841a" },
  { x: -140, y: 60, z: 60, type: "cloud", label: "MS Dynamics", color: "#c7841a" },
  { x: 90, y: 90, z: 60, type: "backup", label: "Veeam Backup", color: "#d63a59" },
  { x: -90, y: -90, z: -60, type: "backup", label: "Borg Backup", color: "#d63a59" },
  { x: 140, y: -60, z: -60, type: "server", label: "MySQL DB", color: "#0098b8" },
  { x: -140, y: -60, z: -60, type: "vm", label: "Samba AD-DC", color: "#6d3fdb" },
  { x: 0, y: 0, z: 140, type: "core", label: "Python Automation", color: "#1556d6" },
  { x: 0, y: 0, z: -140, type: "core", label: "Monitoring", color: "#1556d6" },
];

const links: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 15], [0, 16],
  [1, 5], [2, 5], [3, 6], [4, 6], [1, 7], [3, 7],
  [2, 8], [2, 9], [4, 10], [4, 9],
  [1, 12], [3, 14], [2, 13], [1, 11], [4, 11],
  [5, 7], [6, 7],
  [15, 1], [15, 2], [15, 3], [15, 4], [16, 5], [16, 6], [16, 12], [16, 13],
];

const ICONS: Record<NodeT["type"], string> = {
  server: "🖥",
  firewall: "🔥",
  vm: "📦",
  cloud: "☁",
  backup: "💾",
  core: "🔗",
};

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes: NodeT[] = baseNodes.map((n) => ({
      ...n, x: n.x * 1.1, y: n.y * 1.1, z: n.z * 1.1, ox: 0, oy: 0, oz: 0,
    }));

    let W = 520, H = 520;
    const resize = () => {
      const parent = canvas.parentElement!;
      W = canvas.width = parent.clientWidth;
      H = canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let rotX = 0.3, rotY = 0;
    const rotYv = 0.003;
    let t = 0;
    const drag = { on: false, sx: 0, sy: 0, rx: 0, ry: 0 };
    const nodeDrag = { on: false, idx: -1, sx: 0, sy: 0, ox: 0, oy: 0, oz: 0 };

    const rot = (x: number, y: number, z: number, rx: number, ry: number) => {
      const y2 = y * Math.cos(rx) - z * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z * Math.cos(rx);
      const x3 = x * Math.cos(ry) + z2 * Math.sin(ry);
      const z3 = -x * Math.sin(ry) + z2 * Math.cos(ry);
      return { x: x3, y: y2, z: z3 };
    };
    const project = (x: number, y: number, z: number) => {
      const fov = 400;
      const s = fov / (fov - z);
      const cx = W >= 768 ? W * 0.7 : W / 2;
      return { px: cx + x * s, py: H / 2 + y * s, scale: s };
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      if (!drag.on && !nodeDrag.on) rotY += rotYv;

      const proj = nodes.map((n) => {
        const r = rot(n.x + n.ox, n.y + n.oy, n.z + n.oz, rotX, rotY);
        const p = project(r.x, r.y, r.z);
        return { px: p.px, py: p.py, z: r.z, scale: p.scale, node: n };
      });

      links.forEach((l, i) => {
        const a = proj[l[0]], b = proj[l[1]];
        const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py);
        grad.addColorStop(0, a.node.color + "66");
        grad.addColorStop(1, b.node.color + "66");
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        const tk = Math.sin(t + i * 1.3) * 0.5 + 0.5;
        const dpx = a.px + (b.px - a.px) * tk;
        const dpy = a.py + (b.py - a.py) * tk;
        ctx.beginPath();
        ctx.arc(dpx, dpy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#1556d6";
        ctx.fill();
      });

      [...proj].sort((a, b) => a.z - b.z).forEach((p) => {
        const n = p.node;
        const s = Math.max(0.5, p.scale * 1.2);
        const r = 16 * s;
        const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 2);
        g.addColorStop(0, n.color + "55");
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "22";
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
        ctx.font = 12 * s + "px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ICONS[n.type] || "⚙", p.px, p.py);
        if (s > 0.6) {
          ctx.font = "bold " + 9 * s + "px JetBrains Mono,monospace";
          ctx.fillStyle = n.color;
          ctx.textBaseline = "top";
          ctx.fillText(n.label, p.px, p.py + r + 3);
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const hit = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (W / rect.width);
      const my = (e.clientY - rect.top) * (H / rect.height);
      let best = -1, bestD = 24;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const r = rot(n.x + n.ox, n.y + n.oy, n.z + n.oz, rotX, rotY);
        const p = project(r.x, r.y, r.z);
        const d = Math.hypot(p.px - mx, p.py - my);
        const hitR = 18 * Math.max(0.6, p.scale);
        if (d < hitR && d < bestD) { bestD = d; best = i; }
      }
      return best;
    };

    const onDown = (e: PointerEvent) => {
      const idx = hit(e);
      if (idx >= 0) {
        const n = nodes[idx];
        nodeDrag.on = true; nodeDrag.idx = idx; nodeDrag.sx = e.clientX; nodeDrag.sy = e.clientY;
        nodeDrag.ox = n.ox; nodeDrag.oy = n.oy; nodeDrag.oz = n.oz;
      } else {
        drag.on = true; drag.sx = e.clientX; drag.sy = e.clientY; drag.rx = rotX; drag.ry = rotY;
      }
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (nodeDrag.on) {
        const dx = e.clientX - nodeDrag.sx;
        const dy = e.clientY - nodeDrag.sy;
        const cy = Math.cos(-rotY), sy = Math.sin(-rotY);
        const n = nodes[nodeDrag.idx];
        n.ox = nodeDrag.ox + dx * cy;
        n.oz = nodeDrag.oz - dx * sy;
        n.oy = nodeDrag.oy + dy;
        return;
      }
      if (drag.on) {
        rotY = drag.ry + (e.clientX - drag.sx) * 0.005;
        rotX = Math.max(-1, Math.min(1, drag.rx + (e.clientY - drag.sy) * 0.005));
      }
    };
    const onUp = () => { drag.on = false; nodeDrag.on = false; };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="relative h-full min-h-[420px] w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
      />
    </div>
  );
}
