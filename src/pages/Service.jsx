import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
        min-h-[360px]
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

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-[22px] font-bold mb-5 leading-tight tracking-tight">
          {title}
        </h3>

        <ul className="space-y-[10px] text-gray-300 text-[14px] flex-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-purple-400 mt-[2px] flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link to="/contact">
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

/* ─── Main Component ──────────────────────────────────────────────── */

export default function Services() {
  const services = [
    {
      title: "Software Development",
      items: [
        "Custom Web & Mobile Applications",
        "Scalable Business Solutions",
        "Secure & High-Performance Systems",
        "Maintenance & Technical Support",
      ],
    },
    {
      title: "Projects",
      items: [
        "Academic & Final Year Projects",
        "Industry-Oriented Development",
        "Real-World Problem Solving",
        "End-to-End Project Guidance",
      ],
    },
    {
      title: "Digital Marketing",
      items: [
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Content Marketing Strategies",
        "Lead Generation Campaigns",
      ],
    },
  ];

  const whyItems = [
    {
      side: "right",
      title: "Hands on Learning experience",
      desc: "Build practical skills through workshops, live projects, case studies, and interactive learning sessions.",
    },
    {
      side: "left",
      title: "Career oriented programs",
      desc: "Our programs are designed to enhance employability and prepare learners for successful careers in technology.",
    },
    {
      side: "right",
      title: "innovative tecnical solutions",
      desc: "We deliver modern, scalable, and customized solutions that help businesses achieve their digital goals.",
    },
    {
      side: "left",
      title: "Personalised support",
      desc: "Receive dedicated assistance and mentorship throughout your learning and project development journey.",
    },
  ];

  const [particles] = useState(() => {
    const colors = ['#00c6ff', '#a855f7', '#ec4899', '#ffffff'];
  
    return Array.from({ length: 80 }).map((_, i) => ({
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
    <div className="relative min-h-screen overflow-hidden bg-[#030006] text-white">

      {/* ── Ambient top glow ─────────────────────────────────────── */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-700/10 blur-[200px] pointer-events-none" />

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  HERO                                                        */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="relative pt-16 pb-5 z-10">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="
    text-center
    font-semibold
    text-[72px]
    md:text-[110px]
    lg:text-[150px]
    xl:text-[180px]
    leading-[0.88]
    tracking-[-0.05em]
  "
        >
          Tech Space
        </motion.h1>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  SERVICE CARDS (floating above wave background)              */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section className="relative max-w-[1120px] mx-auto px-6 -mt-4 z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {services.map((svc, i) => (
            <ServiceCard key={i} {...svc} delay={i * 0.15} />
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  WHAT WE DO                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}

      <section
        className="
          relative
          mt-[-160px]
          pt-[240px]
          pb-[120px]
          overflow-hidden
        "
      >
        {/* Background wave image — starts behind cards, fills section */}
        <img
          src="/services1.png"
          alt="services background"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
            pointer-events-none
            opacity-100
          "
        />

        {/* Gradient overlay — light at top (transparent) to dark at bottom */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#030006]/20
            via-[#030006]/10
            to-[#030006]/90
          "
        />

        <div className="relative z-10 max-w-[1120px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 items-start gap-8">
            {/* LEFT */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:lg:-mt-12"
            >
              <h2
                className="
          font-semibold
          leading-[0.82]
          tracking-[-0.06em]
          text-[85px]
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
              className="flex justify-end lg:pt-24 lg:-ml-18"
            >
              <p
                className="
      w-full
      max-w-[2290px]
      ml-2
      text-right
      -translate-x-24
      text-white/90
      text-[20px]
      leading-7
      tracking-[0.01em]
      pr-1
      
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

      <section className="relative py-12">

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

         {/* Timeline - No center line, tighter spacing */}
<div className="relative">
  <div className="space-y-6">
    {whyItems.map((item, i) => {
      const fromX = item.side === "left" ? -120 : 120;
      const card = (
        <motion.div
          initial={{ opacity: 0, x: fromX, y: 30, scale: 0.94, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            y: -8,
            scale: 1.02,
            rotate: item.side === "left" ? -0.8 : 0.8,
            boxShadow: "0 0 30px rgba(168,85,247,0.35)",
            transition: { duration: 0.35, ease: "easeOut" },
          }}
          className={`
            group relative overflow-hidden
            ${item.side === "left" ? "text-left" : "text-right"}
            rounded-[24px]
            border border-white/[0.08]
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            transition-all duration-300
            hover:border-purple-500/40
            hover:bg-white/[0.06]
          `}
        >
          {/* Accent bar that draws in on hover */}
          <span
            className={`
              absolute top-0 left-0 h-[2px] w-full
              bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-500
              origin-${item.side === "left" ? "left" : "right"}
              scale-x-0 group-hover:scale-x-100
              transition-transform duration-500 ease-out
            `}
          />

          <h3 className="text-[20px] font-bold mb-1 tracking-tight">
            {item.title}
          </h3>

          <p className="text-gray-400 text-[13px] leading-[1.6]">
            {item.desc}
          </p>
        </motion.div>
      );

      return (
        <div key={i} className="grid lg:grid-cols-2 gap-8 items-center">
          {item.side === "left" ? (
            <>
              {card}
              <div />
            </>
          ) : (
            <>
              <div />
              {card}
            </>
          )}
        </div>
      );
    })}
  </div>
</div>
        </div>
      </section>

    </div>
  );
}