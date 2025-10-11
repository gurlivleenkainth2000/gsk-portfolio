"use client";

import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Snippet } from "@heroui/snippet";
import { DiscordIcon, GithubIcon, TwitterIcon } from "./icons";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const { name, title, location, email, phone, links } = siteConfig;

  return (
    <footer className="w-full bg-background/60 backdrop-blur-md border-t border-divider py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-foreground-500">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          <p className="text-sm text-foreground-400">
            {title} • {location}
          </p>

          <div className="mt-2 flex flex-col md:flex-row md:items-center gap-1 text-sm">
            <Snippet
              size="sm"
              variant="flat"
              symbol=""
              color="primary"
              className="bg-transparent text-foreground-400 hover:text-primary transition"
            >
              <a href={`mailto:${email}`}>{email}</a>
            </Snippet>

            <Snippet
              size="sm"
              variant="flat"
              symbol=""
              color="primary"
              className="bg-transparent text-foreground-400 hover:text-primary transition"
            >
              <a href={`tel:${phone}`}>{phone}</a>
            </Snippet>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex space-x-3 text-foreground-400">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
        </div>
      </div>

      <Divider className="my-6" />

      <div className="text-center text-xs text-foreground-400">
        © {new Date().getFullYear()} {name} — All Rights Reserved
      </div>
    </footer>
  );
}
