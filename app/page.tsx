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
    <section className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-center px-6 sm:px-8 md:px-12 bg-gradient-to-b from-background to-background/80">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full flex flex-col items-center justify-center"
      >
        {/* === Heading === */}
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

        {/* === Description === */}
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

        {/* === Location Line === */}
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

        {/* === Buttons === */}
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
