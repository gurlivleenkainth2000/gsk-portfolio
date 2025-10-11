"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import LinkedinIcon from "@mui/icons-material/LinkedIn";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-center overflow-hidden px-6 sm:px-8 md:px-12 bg-gradient-to-b from-background to-background/80">
      {/* === BACKGROUND SHAPES === */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Top-right soft circle */}
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-primary/25 via-violet-500/10 to-transparent rounded-full blur-3xl" />

        {/* Bottom-left soft blob */}
        <div className="absolute bottom-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-gradient-to-bl from-violet-500/25 via-primary/10 to-transparent rounded-full blur-3xl" />

        {/* Center subtle glow */}
        <div className="absolute inset-0 mx-auto my-auto w-[70vw] h-[70vw] bg-gradient-radial from-primary/5 via-transparent to-transparent blur-2xl" />
      </div>

      {/* === HERO CONTENT === */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full flex flex-col items-center justify-center relative z-10"
      >
        <motion.h1
          variants={item}
          className={`${title()} text-4xl sm:text-5xl md:text-6xl font-bold leading-tight`}
        >
          Hi, I’m{" "}
          <span
            className={title({
              color: "violet",
              class:
                "bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text",
            })}
          >
            Gurlivleen Singh Kainth
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 md:mt-8 text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl"
        >
          I’m an adaptable{" "}
          <span className="text-primary font-semibold">Software Developer</span>{" "}
          passionate about{" "}
          <span className="font-semibold">Full-Stack</span> and{" "}
          <span className="font-semibold">Backend Development</span>.{" "}
          I craft{" "}
          <span className="text-primary">scalable, efficient solutions</span>{" "}
          that merge technical excellence with collaborative leadership.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 md:mt-6 text-foreground/60 text-sm md:text-base leading-relaxed"
        >
          Currently based in{" "}
          <span className="text-primary font-medium">Melbourne, Australia</span>,
          exploring{" "}
          <span className="font-semibold text-primary">
            Full-Stack and Backend Developer
          </span>{" "}
          opportunities.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-4 mt-8 md:mt-12"
        >
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="#projects"
          >
            View My Projects
          </Link>

          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.linkedin}
          >
            <LinkedinIcon fontSize="small" className="mr-1" /> LinkedIn
          </Link>

          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={18} className="mr-1" /> GitHub
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
