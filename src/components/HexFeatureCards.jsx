import { motion } from "framer-motion";
import { GraduationCap, Brain, Network } from "lucide-react";

/**
 * A single hexagon feature card — pointy-top orientation
 * (point at top, point at bottom, flat vertical sides left/right).
 * The hex outline + glow is drawn in SVG — stroke-linejoin="round" gives the
 * softly rounded corners, and the drop-shadow filter hugs the hex shape
 * instead of showing as a rectangular halo like a plain box-shadow would.
 */
function HexCard({ icon, title, text, className = "", initial, transition }) {
  return (
    <motion.div
      className={`absolute flex flex-col items-center text-center ${className}`}
      style={{ width: "50%", aspectRatio: "240 / 277" }}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={transition}
      whileHover={{ scale: 1.04 }}
    >
      <svg
        viewBox="0 0 240 277"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "drop-shadow(0 0 22px rgba(168,85,247,0.45))" }}
      >
        <defs>
          <linearGradient id="hexStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <polygon
          points="120,4 236,71 236,206 120,273 4,206 4,71"
          fill="#0b0319"
          stroke="url(#hexStroke)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <div className="w-16 h-16 rounded-full border border-purple-500/30 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-white text-base md:text-lg font-semibold mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[220px]">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function HexFeatureCards() {
  return (
    <>
      {/* Desktop — pointy-top hexagon honeycomb: one top-center, two fixed left/right below */}
      <div
        className="relative mt-6 hidden md:block mx-auto"
        style={{ width: "clamp(480px, 55vw, 620px)", aspectRatio: "480 / 485" }}
      >
        {/*
          Hex-grid math for POINTY-TOP hexagons (point at top/bottom, flat
          vertical sides): each card is exactly half the container's width
          (W), and the container height works out to ~1.0104 x width.
            top card:          left 25%,  top 0
            bottom-left card:  left 0%,   top 42.857%
            bottom-right card: left 50%,  top 42.857%
          Same percentages as the flat-top version — the hex-grid offset
          ratio (0.75H / 1.75H) is orientation-independent — only the
          polygon points and each card's own aspect ratio changed.
        */}

        {/* faint decorative hex grid, purely atmospheric */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
          viewBox="0 0 480 485"
        >
          <pattern id="hexGrid" width="52" height="60" patternUnits="userSpaceOnUse">
            <polygon
              points="24,1 47,15 47,40 24,54 1,40 1,15"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>

        <HexCard
          icon={<GraduationCap className="w-8 h-8 text-purple-400" />}
          title="Learning Beyond Classrooms"
          text="Practical training focused on industry readiness."
          className="left-[25%] top-0"
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        />

        <HexCard
          icon={<Brain className="w-8 h-8 text-purple-400" />}
          title="Innovation Driven Mindset"
          text="Transforming ideas into impactful solutions."
          className="left-0 top-[42.857%]"
          initial={{ opacity: 0, x: -80, y: 40, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        />

        <HexCard
          icon={<Network className="w-8 h-8 text-purple-400" />}
          title="One Ecosystem Endless Opportunities"
          text="Services, Training & Product Development under one roof."
          className="left-[50%] top-[42.857%]"
          initial={{ opacity: 0, x: 80, y: 40, scale: 0.9 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Mobile — simple stacked hex cards, same pointy-top shape */}
      <div className="md:hidden flex flex-col items-center gap-8 mt-10">
        {[
          { icon: GraduationCap, title: "Learning Beyond Classrooms", text: "Practical training focused on industry readiness." },
          { icon: Brain, title: "Innovation Driven Mindset", text: "Transforming ideas into impactful solutions." },
          { icon: Network, title: "One Ecosystem Endless Opportunities", text: "Services, Training & Product Development under one roof." },
        ].map(({ icon: Icon, title, text }, i) => (
          <div key={i} className="relative w-[220px]" style={{ aspectRatio: "240 / 277" }}>
            <svg
              viewBox="0 0 240 277"
              className="absolute inset-0 w-full h-full"
              style={{ filter: "drop-shadow(0 0 16px rgba(168,85,247,0.4))" }}
            >
              <polygon
                points="120,4 236,71 236,206 120,273 4,206 4,71"
                fill="#0b0319"
                stroke="#a855f7"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
              <Icon className="w-7 h-7 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}