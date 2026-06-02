"use client";

import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { motion } from "framer-motion";
import LinkedinIcon from "@mui/icons-material/LinkedIn";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { staggerContainerWith, fadeUpFrom } from "@/components/motion";
import { GithubIcon } from "@/components/icons";

// Hero uses slower, more deliberate timing than the site-wide default rhythm.
const container = staggerContainerWith(0.3, 0.2);
const item = fadeUpFrom(25, 0.8);

export default function Home() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-center overflow-hidden px-6 sm:px-8 md:px-12">
      {/* === HERO CONTENT === */}
      <motion.div
        animate="visible"
        className="max-w-3xl w-full flex flex-col items-center justify-center relative z-10"
        initial="hidden"
        variants={container}
      >
        <motion.h1
          className={`${title()} text-4xl sm:text-5xl md:text-6xl font-bold leading-tight`}
          variants={item}
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
          className="mt-6 md:mt-8 text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl"
          variants={item}
        >
          I’m an adaptable{" "}
          <span className="text-primary font-semibold">Software Developer</span>{" "}
          passionate about <span className="font-semibold">Full-Stack</span> and{" "}
          <span className="font-semibold">Backend Development</span>. I craft{" "}
          <span className="text-primary">scalable, efficient solutions</span>{" "}
          that merge technical excellence with collaborative leadership.
        </motion.p>

        <motion.p
          className="mt-4 md:mt-6 text-foreground/60 text-sm md:text-base leading-relaxed"
          variants={item}
        >
          Currently based in{" "}
          <span className="text-primary font-medium">Melbourne, Australia</span>
          , exploring{" "}
          <span className="font-semibold text-primary">
            Full-Stack and Backend Developer
          </span>{" "}
          opportunities.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8 md:mt-12"
          variants={item}
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
            <LinkedinIcon className="mr-1" fontSize="small" /> LinkedIn
          </Link>

          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon className="mr-1" size={18} /> GitHub
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
