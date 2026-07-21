// src/components/PremiumRobot.jsx
// Pure JSX — no TypeScript, no Tailwind needed. Uses framer-motion (already installed).
import { motion } from "framer-motion";

export default function PremiumRobot({ size = 180 }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Ambient glow behind robot */}
      <div style={{
        position: "absolute",
        width: "128px",
        height: "128px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.2), rgba(217,70,239,0.2))",
        filter: "blur(20px)",
        pointerEvents: "none",
        animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
      }} />

      {/* Floating wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", zIndex: 10, width: size, height: size * 1.25 }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 320 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 10px 20px rgba(79,32,171,0.25))" }}
        >
          <defs>
            <filter id="zx-neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="zx-rimGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="zx-helmetGrad" cx="35%" cy="30%" r="65%" fx="35%" fy="30%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f1f5f9" />
              <stop offset="85%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0.8" />
            </radialGradient>
            <linearGradient id="zx-armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#e2e8f0" />
              <stop offset="85%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="zx-visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#090514" />
              <stop offset="50%" stopColor="#120c24" />
              <stop offset="100%" stopColor="#030008" />
            </linearGradient>
            <linearGradient id="zx-chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="30%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="zx-darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#0f0b21" />
            </linearGradient>
            <linearGradient id="zx-ledEye" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="zx-diagRefl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="31%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="zx-thruster" x1="100" y1="145" x2="100" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left arm */}
          <g id="zx-left-arm">
            <circle cx="95" cy="215" r="13" fill="url(#zx-chromeGrad)" stroke="#312e81" strokeWidth="2" />
            <rect x="88" y="224" width="14" height="34" rx="5" fill="url(#zx-darkMetal)" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx="95" cy="264" r="8" fill="url(#zx-chromeGrad)" />
            <rect x="88" y="269" width="14" height="34" rx="5" fill="url(#zx-armorGrad)" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M 85 303 C 80 309, 84 322, 94 322 C 104 322, 108 309, 103 303" fill="url(#zx-darkMetal)" stroke="#a855f7" strokeWidth="2" />
            <path d="M 88 322 Q 91 329 94 322" stroke="url(#zx-chromeGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 94 322 Q 97 330 100 322" stroke="url(#zx-chromeGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Hover propulsion */}
          <g id="zx-propulsion">
            <motion.ellipse cx="160" cy="345" rx="40" ry="12" fill="none" stroke="#a855f7" strokeWidth="3"
              filter="url(#zx-neonGlow)"
              animate={{ rx: [34, 46, 34], ry: [10, 14, 10], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse cx="160" cy="345" rx="20" ry="6" fill="none" stroke="#f472b6" strokeWidth="2"
              filter="url(#zx-neonGlow)"
              animate={{ rx: [16, 24, 16], ry: [4, 8, 4], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path d="M 144 322 L 160 365 L 176 322 Z" fill="url(#zx-ledEye)"
              filter="url(#zx-neonGlow)"
              animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "160px 322px" }}
            />
            <motion.circle cx="152" cy="355" r="3" fill="#ffffff" filter="url(#zx-neonGlow)"
              animate={{ y: [0, 20], opacity: [1, 0], scale: [1, 0.2] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle cx="168" cy="352" r="2.5" fill="#f472b6" filter="url(#zx-neonGlow)"
              animate={{ y: [0, 25], opacity: [1, 0], scale: [1, 0.2] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            />
            <motion.circle cx="160" cy="360" r="2" fill="#d8b4fe" filter="url(#zx-neonGlow)"
              animate={{ y: [0, 15], opacity: [1, 0], scale: [1, 0.1] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut", delay: 0.15 }}
            />
          </g>

          {/* Left earphone + antenna */}
          <rect x="68" y="82" width="14" height="56" rx="7" fill="url(#zx-darkMetal)" stroke="#6366f1" strokeWidth="2.5" />
          <rect x="74" y="93" width="6" height="34" rx="3" fill="#a855f7" filter="url(#zx-rimGlow)" />
          <line x1="75" y1="82" x2="75" y2="34" stroke="url(#zx-chromeGrad)" strokeWidth="4" />
          <circle cx="75" cy="30" r="8" fill="#d8b4fe" filter="url(#zx-neonGlow)" />
          <circle cx="75" cy="30" r="3" fill="#ffffff" />

          {/* Right earphone + antenna */}
          <rect x="238" y="82" width="14" height="56" rx="7" fill="url(#zx-darkMetal)" stroke="#6366f1" strokeWidth="2.5" />
          <rect x="240" y="93" width="6" height="34" rx="3" fill="#a855f7" filter="url(#zx-rimGlow)" />
          <line x1="245" y1="82" x2="245" y2="34" stroke="url(#zx-chromeGrad)" strokeWidth="4" />
          <circle cx="245" cy="30" r="8" fill="#d8b4fe" filter="url(#zx-neonGlow)" />
          <circle cx="245" cy="30" r="3" fill="#ffffff" />

          {/* Neck rings */}
          <rect x="142" y="166" width="36" height="10" rx="3" fill="url(#zx-darkMetal)" />
          <rect x="136" y="174" width="48" height="12" rx="4" fill="url(#zx-chromeGrad)" stroke="#4338ca" strokeWidth="1.5" />
          <rect x="142" y="184" width="36" height="8" rx="2" fill="url(#zx-darkMetal)" />

          {/* Head dome */}
          <circle cx="160" cy="110" r="76" fill="url(#zx-helmetGrad)" stroke="#6366f1" strokeWidth="3" />
          <path d="M 112 56 Q 160 38 208 56" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 125 50 Q 160 36 195 50" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

          {/* Deep visor */}
          <rect x="100" y="62" width="120" height="96" rx="38" fill="url(#zx-visorGrad)" stroke="#818cf8" strokeWidth="4" filter="url(#zx-rimGlow)" />
          <rect x="102" y="64" width="116" height="92" rx="36" fill="url(#zx-diagRefl)" pointerEvents="none" />

          {/* Cheek blush */}
          <circle cx="122" cy="130" r="5" fill="#f472b6" opacity="0.5" filter="url(#zx-neonGlow)" />
          <circle cx="198" cy="130" r="5" fill="#f472b6" opacity="0.5" filter="url(#zx-neonGlow)" />

          {/* Eyes with blink */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.05, 1, 1, 1, 0.05, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.44, 0.46, 0.8, 0.82, 0.84, 1] }}
            style={{ transformOrigin: "160px 105px" }}
          >
            <rect x="124" y="88" width="18" height="30" rx="9" fill="url(#zx-ledEye)" filter="url(#zx-neonGlow)" />
            <line x1="126" y1="94" x2="140" y2="94" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <line x1="125" y1="100" x2="141" y2="100" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <line x1="126" y1="106" x2="140" y2="106" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <circle cx="133" cy="98" r="3" fill="#ffffff" />
            <rect x="178" y="88" width="18" height="30" rx="9" fill="url(#zx-ledEye)" filter="url(#zx-neonGlow)" />
            <line x1="180" y1="94" x2="194" y2="94" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <line x1="179" y1="100" x2="195" y2="100" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <line x1="180" y1="106" x2="194" y2="106" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
            <circle cx="187" cy="98" r="3" fill="#ffffff" />
          </motion.g>

          {/* Smile */}
          <path d="M 146 126 Q 160 140 174 126" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" fill="none" filter="url(#zx-neonGlow)" />

          {/* Torso */}
          <path d="M 115 196 L 205 196 C 224 196 226 264 205 272 L 115 272 C 94 272 96 196 115 196 Z" fill="url(#zx-armorGrad)" stroke="#6366f1" strokeWidth="3.5" />
          <path d="M 125 196 Q 160 216 195 196" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
          <path d="M 115 234 Q 160 248 205 234" stroke="#94a3b8" strokeWidth="1.5" fill="none" />

          {/* Chest power core */}
          <circle cx="160" cy="232" r="15" fill="url(#zx-darkMetal)" stroke="#818cf8" strokeWidth="2" />
          <circle cx="160" cy="232" r="9" fill="#f472b6" filter="url(#zx-neonGlow)" />
          <circle cx="160" cy="232" r="12" stroke="#d8b4fe" strokeWidth="1.2" strokeDasharray="6 3" fill="none" opacity="0.8" />
          <circle cx="160" cy="232" r="3" fill="#ffffff" />

          {/* Belt + pelvis */}
          <rect x="135" y="272" width="50" height="7" rx="1.5" fill="#181132" stroke="#4338ca" strokeWidth="1" />
          <rect x="138" y="279" width="44" height="7" rx="1.5" fill="#0d091e" />
          <rect x="142" y="286" width="36" height="7" rx="1.5" fill="#181132" stroke="#4338ca" strokeWidth="1" />
          <path d="M 126 293 L 194 293 C 206 293 206 316 194 319 L 126 319 C 114 319 114 293 126 293 Z" fill="url(#zx-armorGrad)" stroke="#6366f1" strokeWidth="2.5" />
          <path d="M 140 293 Q 160 306 180 293" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

          {/* Right arm — waving */}
          <motion.g
            animate={{ rotate: [0, -32, -15, -32, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            style={{ transformOrigin: "225px 215px" }}
          >
            <circle cx="225" cy="215" r="13" fill="url(#zx-chromeGrad)" stroke="#312e81" strokeWidth="2" />
            <rect x="218" y="224" width="14" height="34" rx="5" fill="url(#zx-darkMetal)" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx="225" cy="264" r="8" fill="url(#zx-chromeGrad)" />
            <rect x="218" y="269" width="14" height="34" rx="5" fill="url(#zx-armorGrad)" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M 217 303 C 212 309, 216 322, 226 322 C 236 322, 240 309, 235 303" fill="url(#zx-darkMetal)" stroke="#a855f7" strokeWidth="2" />
            <path d="M 220 322 Q 223 329 226 322" stroke="url(#zx-chromeGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 226 322 Q 229 330 232 322" stroke="url(#zx-chromeGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 232 322 Q 235 328 238 322" stroke="url(#zx-chromeGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
