"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// State coordinates for flow lines
const stateCoords: Record<string, [number, number]> = {
    Kansas: [-98.4, 38.5],
    Colorado: [-105.5, 39.0],
    Iowa: [-93.5, 42.0],
    Texas: [-99.9, 31.5],
    Pennsylvania: [-77.2, 41.0],
    Michigan: [-85.6, 43.0],
    Illinois: [-89.4, 40.0],
    California: [-119.4, 36.8],
    Oregon: [-120.5, 44.0],
    Nevada: [-117.0, 39.5],
};

interface FlowData {
    id: string;
    commodity: string;
    from: string;
    to: string;
    volume: string;
    value: string;
}

const flowData: FlowData[] = [
    { id: "1", commodity: "Hemp", from: "Kansas", to: "Colorado", volume: "10,000 tons", value: "$2.4M" },
    { id: "2", commodity: "Corn", from: "Iowa", to: "Texas", volume: "50,000 bushels", value: "$8.7M" },
    { id: "3", commodity: "Steel", from: "Pennsylvania", to: "Michigan", volume: "25,000 tons", value: "$15.2M" },
    { id: "4", commodity: "Soya", from: "Illinois", to: "California", volume: "30,000 bushels", value: "$5.1M" },
    { id: "5", commodity: "Timber", from: "Oregon", to: "Nevada", volume: "15,000 cu ft", value: "$3.8M" },
];

// Marketing stat flashcards
const leftStats = [
    { label: "Active Routes", value: "127", sub: "Nationwide" },
    { label: "Partners", value: "500+", sub: "Verified" },
    { label: "States", value: "50", sub: "Coverage" },
];

const rightStats = [
    { label: "Monthly Volume", value: "$2.4B", sub: "Transactions" },
    { label: "Avg Delivery", value: "48h", sub: "Turnaround" },
    { label: "Uptime", value: "99.9%", sub: "Reliability" },
];

// Generate curved path
function generateCurvedPath(from: [number, number], to: [number, number]): string {
    const midX = (from[0] + to[0]) / 2;
    const midY = (from[1] + to[1]) / 2;
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const curveAmount = dist * 0.25;
    const perpX = -dy / dist * curveAmount;
    const perpY = dx / dist * curveAmount;
    return `M ${from[0]} ${from[1]} Q ${midX + perpX} ${midY + perpY} ${to[0]} ${to[1]}`;
}

export function InteractiveUSMap() {
    return (
        <div className="w-full">
            {/* Animation styles */}
            <style jsx>{`
                @keyframes flowDash {
                    from { stroke-dashoffset: 100; }
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
            <style>{`.flow-anim { stroke-dasharray: 100 100; stroke-dashoffset: 100; animation: flowDash 2.5s ease-in-out infinite; } @keyframes flowDash { to { stroke-dashoffset: -100; } }`}</style>

            {/* Main layout: 3 columns GRID for perfect centering */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start justify-items-center w-full max-w-[1400px] mx-auto">
                {/* LEFT: Stat cards (justify-self-end to stick to map) */}
                <div className="flex flex-col gap-3 shrink-0 justify-self-end pt-12">
                    {leftStats.map((stat, i) => (
                        <div key={i} className="w-32 p-3 rounded-xl border border-red-500/20 bg-background/50 backdrop-blur-sm">
                            <div className="text-2xl font-light text-foreground font-[family-name:var(--font-space-grotesk)]">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5">{stat.label}</div>
                            <div className="text-[9px] text-muted-foreground/60">{stat.sub}</div>
                        </div>
                    ))}
                </div>

                {/* CENTER: Map */}
                <div className="w-[800px] max-w-full">
                    <ComposableMap
                        projection="geoAlbersUsa"
                        width={800}
                        height={500}
                        className="w-full h-auto"
                    >
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>

                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="rgba(220, 38, 38, 0.1)"
                                        stroke="#DC2626"
                                        strokeWidth={0.4}
                                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                                    />
                                ))
                            }
                        </Geographies>

                        {/* Flow lines */}
                        {flowData.map((flow, i) => {
                            const from = stateCoords[flow.from];
                            const to = stateCoords[flow.to];
                            if (!from || !to) return null;
                            return (
                                <g key={flow.id}>
                                    {/* Stronger Outer Glow */}
                                    <path d={generateCurvedPath(from, to)} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={8} filter="url(#glow)" />
                                    {/* Solid Base Line - connecting line - BOOSTED */}
                                    <path d={generateCurvedPath(from, to)} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeOpacity={0.8} strokeLinecap="round" />
                                    {/* Animated Movement Line - longer dash for flow effect - BOOSTED */}
                                    <path d={generateCurvedPath(from, to)} fill="none" stroke="#fff" strokeWidth={3.5} className="flow-anim" style={{ animationDelay: `${i * 0.3}s` }} />

                                    {/* Origin Dot */}
                                    <Marker coordinates={from}>
                                        <circle r={6} fill="#fff" stroke="rgba(220, 38, 38, 0.5)" strokeWidth={2} />
                                    </Marker>

                                    {/* Destination Dot */}
                                    <Marker coordinates={to}>
                                        <circle r={6} fill="#9CA3AF" stroke="#fff" strokeWidth={2} />
                                    </Marker>
                                </g>
                            );
                        })}
                    </ComposableMap>
                </div>

                {/* RIGHT: Stat cards */}
                <div className="flex flex-col gap-3 shrink-0 justify-self-start pt-12">
                    {rightStats.map((stat, i) => (
                        <div key={i} className="w-32 p-3 rounded-xl border border-red-500/20 bg-background/50 backdrop-blur-sm">
                            <div className="text-2xl font-light text-foreground font-[family-name:var(--font-space-grotesk)]">{stat.value}</div>
                            <div className="text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5">{stat.label}</div>
                            <div className="text-[9px] text-muted-foreground/60">{stat.sub}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom: Transaction flashcards */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {flowData.map((flow) => (
                    <div key={flow.id} className="px-4 py-2 rounded-lg bg-foreground/5 border border-red-500/20 text-xs font-[family-name:var(--font-space-grotesk)]">
                        <span className="text-foreground font-medium">{flow.commodity}</span>
                        <span className="text-muted-foreground/40 mx-2">|</span>
                        <span className="text-muted-foreground">{flow.from} → {flow.to}</span>
                        <span className="text-muted-foreground/40 mx-2">|</span>
                        <span className="text-green-400 font-medium">{flow.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
