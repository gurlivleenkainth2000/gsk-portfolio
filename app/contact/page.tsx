"use client";

import type { ContactFormValues } from "@/types/contact";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { staggerContainer, fadeUp } from "@/components/motion";
import {
  GithubIcon,
  LocationOnIcon,
  EmailIcon,
  LinkedinIcon,
  CheckCircleIcon,
} from "@/components/icons";

// Simple RFC-5322-ish email check — good enough for client-side UX.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    clearErrors("root");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as {
          error?: string;
        };

        setError("root.serverError", {
          message: payload.error ?? "Something went wrong. Please try again.",
        });

        return;
      }

      reset();
      setSent(true);
    } catch {
      setError("root.serverError", {
        message: "Network error — please try again in a moment.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col gap-12">
      {/* ============== HERO ============== */}
      <motion.section
        animate="visible"
        initial="hidden"
        variants={staggerContainer}
      >
        <motion.h1 variants={fadeUp}>
          <span className={title({ size: "md" })}>Get in </span>
          <span className={title({ color: "violet", size: "md" })}>touch</span>
        </motion.h1>

        <motion.p className={subtitle({ class: "mt-4" })} variants={fadeUp}>
          Have a role, a project, or an idea worth building? Send a message and
          I&apos;ll get back to you.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-foreground/50"
          variants={fadeUp}
        >
          <span className="flex items-center gap-1">
            <LocationOnIcon fontSize="small" />
            {siteConfig.location}
          </span>
          <span className="text-foreground/20">·</span>
          <Link
            className="flex items-center gap-1 text-foreground/50 hover:text-primary transition-colors text-sm"
            href={siteConfig.links.email}
          >
            <EmailIcon fontSize="small" />
            {siteConfig.email}
          </Link>
        </motion.div>
      </motion.section>

      <Divider />

      {/* ============== FORM ============== */}
      <motion.section
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.1 }}
        whileInView="visible"
      >
        {sent ? (
          <motion.div
            animate="visible"
            className="flex flex-col items-center text-center gap-3 py-10"
            initial="hidden"
            variants={fadeUp}
          >
            <CheckCircleIcon className="text-success" fontSize="large" />
            <h2 className={title({ size: "sm" })}>Message sent</h2>
            <p className="text-foreground/60 max-w-md">
              Thanks for reaching out — I&apos;ll reply as soon as I can. In the
              meantime, feel free to connect on LinkedIn or browse the code on
              GitHub.
            </p>
            <Button
              className="mt-2"
              radius="full"
              size="sm"
              variant="flat"
              onPress={() => {
                setSent(false);
                reset();
              }}
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            className="flex flex-col gap-5"
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Honeypot — hidden from humans, lures bots into revealing themselves. */}
            <input
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
              {...register("company")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                isRequired
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                label="Name"
                labelPlacement="outside"
                placeholder="Your name"
                variant="bordered"
                {...register("name", {
                  required: "Please enter your name.",
                  minLength: {
                    value: 2,
                    message: "That seems a little short.",
                  },
                })}
              />
              <Input
                isRequired
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                label="Email"
                labelPlacement="outside"
                placeholder="you@example.com"
                type="email"
                variant="bordered"
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
            </div>

            <Input
              label="Subject"
              labelPlacement="outside"
              placeholder="What's this about? (optional)"
              variant="bordered"
              {...register("subject")}
            />

            <Textarea
              isRequired
              errorMessage={errors.message?.message}
              isInvalid={!!errors.message}
              label="Message"
              labelPlacement="outside"
              minRows={5}
              placeholder="Tell me a bit about what you have in mind…"
              variant="bordered"
              {...register("message", {
                required: "Please enter a message.",
                minLength: {
                  value: 10,
                  message: "A little more detail would help.",
                },
              })}
            />

            {errors.root?.serverError && (
              <p className="text-sm text-danger" role="alert">
                {errors.root.serverError.message}
              </p>
            )}

            <Button
              className="self-start"
              color="primary"
              isLoading={isSubmitting}
              radius="full"
              type="submit"
              variant="shadow"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </motion.form>
        )}
      </motion.section>

      <Divider />

      {/* ============== SOCIAL FALLBACK ============== */}
      <motion.section
        className="flex flex-wrap items-center gap-3"
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.2 }}
        whileInView="visible"
      >
        <motion.span
          className="text-sm text-foreground/40 mr-1"
          variants={fadeUp}
        >
          Or find me on
        </motion.span>
        <motion.div variants={fadeUp}>
          <Link
            isExternal
            className="flex items-center gap-1 text-foreground/60 hover:text-primary transition-colors text-sm"
            href={siteConfig.links.linkedin}
          >
            <LinkedinIcon fontSize="small" /> LinkedIn
          </Link>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link
            isExternal
            className="flex items-center gap-1 text-foreground/60 hover:text-primary transition-colors text-sm"
            href={siteConfig.links.github}
          >
            <GithubIcon size={16} /> GitHub
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
