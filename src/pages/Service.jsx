import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Boxes, BrainCircuit, HeartHandshake } from "lucide-react";

/* ─── Animation Variants ──────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ─── Service Card ────────────────────────────────────────────────── */

function ServiceCard({ title, items, delay = 0 }) {
  return (
    <motion.div
      variants={cardVariant}
      className="
        relative
        flex flex-col
        overflow-hidden
        rounded-[28px]
        border border-white/[0.12]
        bg-white/[0.04]
        backdrop-blur-[40px]
        p-7
        min-h-[440px]
        group
        transition-all duration-500
        hover:border-purple-500/40
        hover:bg-white/[0.07]
        shadow-[0_0_40px_rgba(139,92,246,0.08)]
        hover:shadow-[0_0_60px_rgba(139,92,246,0.18)]
      "
      style={{ willChange: "transform" }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Internal gradient shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent rounded-[28px]" />
      {/* Purple edge glow */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-purple-600/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full mt-4" >
        <h3 className="text-[22px] font-bold mb-5 text-center leading-tight tracking-tight">
          {title}
        </h3>

        <ul className="space-y-[10px] text-gray-300 text-[16px] flex-1 ml-8 mt-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-purple-400 mt-[2px] flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link to="/your-next-step#get-in-touch">
          <button
            className="
              mt-8
              w-full
              py-[10px]
              rounded-full
              bg-black/60
              border border-purple-500/70
              text-[13px]
              font-medium
              tracking-wide
              hover:bg-purple-600/80
              hover:border-purple-400
              transition-all duration-300
              backdrop-blur-sm
            "
          >
            Enquire now
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Why Choose Us — stacked glow-pill cards ─────────────────────────
   Matches the reference: a vertical stack of rounded pill cards, each
   with a glowing circular icon on the left and title/description on
   the right. No connecting line, no left/right alternation.            */

function WhyChooseUsCards({ items }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -5,
              boxShadow: "0 0 42px rgba(168,85,247,0.32)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="
              group relative flex items-center gap-8
              overflow-hidden rounded-[32px]
              border border-purple-500/25
              bg-gradient-to-br from-purple-950/40 via-black/40 to-black/60
              px-9 py-8
              backdrop-blur-xl
              transition-colors duration-300
              hover:border-purple-400/50
            "
            style={{
              boxShadow: "0 0 26px rgba(168,85,247,0.12)",
            }}
          >
            {/* subtle inner glow wash */}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-purple-500/[0.05] to-transparent" />

            {/* glowing icon avatar */}
            <div
              className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-700/60 to-purple-950/60"
              style={{
                boxShadow:
                  "0 0 26px rgba(168,85,247,0.55), 0 0 52px rgba(168,85,247,0.28), inset 0 0 16px rgba(216,180,254,0.25)",
              }}
            >
              <Icon className="h-10 w-10 text-purple-100" strokeWidth={1.5} />
            </div>

            {/* copy */}
            <div className="relative z-10">
              <h3 className="text-[22px] font-bold leading-snug text-white sm:text-[25px]">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-gray-400 sm:text-[17px]">
                {item.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export default function Services() {
  const services = [
    {
      title: "Software Development",
      items: [
        "Custom Web & Mobile Applications",
        <>Scalable Business<br />Solutions</>,
        <>Secure & High-<br />Performance Systems</>,
        <>Maintenance &<br />Technical Support</>,
      ],
    },
    {
      title: "Projects",
      items: [
        "Academic & Final Year Projects",
        "Industry-Oriented Development",
        <>Real-World Problem <br/>Solving</>,
        <>End-to-End Project <br/>Guidance</>,
      ],
    },
    {
      title: "Digital Marketing",
      items: [
        <>Search Engine<br/> Optimization (SEO)</>,
        "Social Media Marketing",
        <>Content Marketing<br/> Strategies</>,
        <>Lead Generation <br/>Campaigns</>,
      ],
    },
  ];

  const whyItems = [
    {
      icon: GraduationCap,
      title: "Hands on Learning experience",
      desc: "Build practical skills through workshops, live projects, case studies, and interactive learning sessions.",
    },
    {
      icon: Boxes,
      title: "Career oriented programs",
      desc: "Our programs are designed to enhance employability and prepare learners for successful careers in technology.",
    },
    {
      icon: BrainCircuit,
      title: "Innovative technical solutions",
      desc: "We deliver modern, scalable, and customized solutions that help businesses achieve their digital goals.",
    },
    {
      icon: HeartHandshake,
      title: "Personalised support",
      desc: "Receive dedicated assistance and mentorship throughout your learning and project development journey.",
    },
  ];

  const [particles] = useState(() => {
    const colors = ['#00c6ff', '#a855f7', '#ec4899', '#ffffff'];
  
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 150}px`,
      ty: `${(Math.random() - 0.5) * 150}px`,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ── Full Page Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/tech stack bg.png" alt="Background" className="w-full h-full object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-transparent to-[#02010A]/90" />
      </div>

      {/* ── Ambient top glow ─────────────────────────────────────── */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-900/10 blur-[200px] pointer-events-none z-0" />

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  HERO                                                        */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-4 sm:pb-6 z-10">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="
    text-center
    font-semibold
    text-[56px]
    sm:text-[80px]
    md:text-[110px]
    lg:text-[150px]
    xl:text-[180px]
    leading-[0.95]
    tracking-[-0.04em]
  "
        >
          Tech Space
        </motion.h1>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SERVICE CARDS (floating above wave background)              */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="relative max-w-[1130px] mx-auto px-6 sm:px-8 mt-2 md:-mt-4 z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((svc, i) => (
            <ServiceCard key={i} {...svc} delay={i * 0.15} />
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  WHAT WE DO                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="relative pt-8 pb-4 md:pt-16 md:pb-8 z-20 overflow-hidden">
        {/* Secondary wave background removed to allow the full-page smooth waves background to flow perfectly in all sections */}

<div className="relative z-10 max-w-[1120px] mx-auto px-6">
  <div className="grid lg:grid-cols-2 items-start gap-8">

    {/* LEFT */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="lg:-mt-12"
    >
      <h2
        className="
          font-semibold
          leading-[0.82]
          tracking-[-0.06em]
          text-[65px]
          sm:text-[85px]
          md:text-[100px]
          lg:text-[150px]
        "
      >
        <span className="block whitespace-nowrap">
          What we
        </span>
        <span className="block">
          do?
        </span>
      </h2>
    </motion.div>

    {/* RIGHT */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex justify-start lg:justify-end pt-6 lg:pt-24"
    >
      <p
        className="
          w-full
          max-w-full lg:max-w-[560px]
          text-left lg:text-right
          text-white/90
          text-base sm:text-lg lg:text-[20px]
          leading-relaxed lg:leading-7
          tracking-[0.01em]
        "
      >
        Zentrix Technology empowers individuals and businesses through
        innovative technology solutions, industry-focused training, and
        digital transformation services. From software development and
        UI/UX design to project building, digital marketing, and emerging
        technologies, we help clients and learners achieve their goals
        through practical expertise, creative thinking, and modern
        solutions tailored to today's rapidly evolving digital landscape.
      </p>
    </motion.div>

  </div>
</div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  WHY CHOOSE US                                               */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="relative pt-4 pb-12 md:pt-8 md:pb-16">

      {particles.map((p) => (
      <div
        key={p.id}
        className="service-particle"
        style={{
          width: p.size,
          height: p.size,
          top: p.top,
          left: p.left,
          backgroundColor: p.color,
          boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          '--tx': p.tx,
          '--ty': p.ty,
          '--duration': `${p.duration}s`,
          '--delay': `${p.delay}s`,
        }}
      />
    ))}


        <div className="relative z-10 max-w-5xl mx-auto px-6">

          {/* Heading Container */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              mb-10
              rounded-[32px]
              border border-white/[0.06]
              bg-white/[0.02]
              backdrop-blur-2xl
              py-6
              text-center
            "
          >
            <h2
              className="
                text-[44px]
                md:text-[60px]
                font-black
                tracking-[-0.04em]
                lowercase
              "
            >
              why choose us ?
            </h2>
          </motion.div>

          {/* Stacked glow-pill cards (new reference-image style) */}
          <WhyChooseUsCards items={whyItems} />

        </div>
      </section>

    </div>
  );
}