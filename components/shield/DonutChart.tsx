"use client";
import { useState } from "react";
import { formatINR } from "@/lib/utils";

interface Slice {
  name: string;
  value: number;
  color: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}


function donutSlicePath(cx: number, cy: number, innerR: number, outerR: number, startDeg: number, endDeg: number): string {
  const outerStart = polarToCartesian(cx, cy, outerR, endDeg);
  const outerEnd = polarToCartesian(cx, cy, outerR, startDeg);
  const innerStart = polarToCartesian(cx, cy, innerR, startDeg);
  const innerEnd = polarToCartesian(cx, cy, innerR, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${large} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${large} 1 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

export default function DonutChart({ data, total }: { data: Slice[]; total: number }) {
  const W = 260;
  const H = 208;
  const cx = W / 2;
  const cy = H / 2;
  const outerR = 84;
  const innerR = 58;
  const gap = 1.5;

  const totalVal = data.reduce((s, d) => s + d.value, 0);
  let cursor = 0;

  const slices = data.map((d) => {
    const frac = d.value / totalVal;
    const spanDeg = frac * 360 - gap;
    const start = cursor + gap / 2;
    const end = start + spanDeg;
    cursor += frac * 360;
    return { ...d, start, end };
  });

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative flex items-center justify-center h-52">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {slices.map((s) => (
          <path
            key={s.name}
            d={donutSlicePath(cx, cy, innerR, outerR, s.start, s.end)}
            fill={s.color}
            opacity={hovered && hovered !== s.name ? 0.45 : 1}
            onMouseEnter={() => setHovered(s.name)}
            onMouseLeave={() => setHovered(null)}
            className="transition-opacity cursor-pointer"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-slate-400 text-[10px] uppercase tracking-wider">
          {hovered ?? "Total Spent"}
        </span>
        <span className="text-white font-bold text-lg leading-tight">
          {hovered
            ? formatINR(data.find((d) => d.name === hovered)?.value ?? 0)
            : formatINR(total)}
        </span>
      </div>
    </div>
  );
}

