"use client";

interface DataPoint {
  name: string;
  "Apr 2026": number;
  "Mar 2026": number;
}

const AMBER = "#f59e0b";
const SLATE = "#334155";
const PAD = { top: 12, right: 8, bottom: 36, left: 42 };
const BAR_GAP = 3;
const GROUP_GAP = 12;

export default function BarChartClient({ data }: { data: DataPoint[] }) {
  const W = 580;
  const H = 220;
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...data.flatMap((d) => [d["Apr 2026"], d["Mar 2026"]]));
  const yMax = Math.ceil(maxVal / 1000) * 1000;

  const groupW = chartW / data.length;
  const barW = (groupW - GROUP_GAP - BAR_GAP) / 2;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * yMax));

  const scaleY = (v: number) => chartH - (v / yMax) * chartH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
      {/* Y gridlines + labels */}
      {yTicks.map((t) => {
        const y = PAD.top + scaleY(t);
        return (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#475569">
              {t === 0 ? "₹0" : `₹${(t / 1000).toFixed(0)}k`}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const gx = PAD.left + i * groupW + GROUP_GAP / 2;
        const aprH = (d["Apr 2026"] / yMax) * chartH;
        const marH = (d["Mar 2026"] / yMax) * chartH;
        const aprY = PAD.top + scaleY(d["Apr 2026"]);
        const marY = PAD.top + scaleY(d["Mar 2026"]);

        return (
          <g key={d.name}>
            {/* Apr bar */}
            <rect x={gx} y={aprY} width={barW} height={aprH} fill={AMBER} rx={3} />
            {/* Mar bar */}
            <rect x={gx + barW + BAR_GAP} y={marY} width={barW} height={marH} fill={SLATE} rx={3} />
            {/* X label */}
            <text
              x={gx + barW + BAR_GAP / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize={10}
              fill="#64748b"
            >
              {d.name}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(${PAD.left}, ${H - 18})`}>
        <rect x={0} y={0} width={8} height={8} fill={AMBER} rx={2} />
        <text x={12} y={8} fontSize={10} fill="#94a3b8">Apr 2026</text>
        <rect x={72} y={0} width={8} height={8} fill={SLATE} rx={2} />
        <text x={84} y={8} fontSize={10} fill="#94a3b8">Mar 2026</text>
      </g>
    </svg>
  );
}
