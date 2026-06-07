"use client";

import { useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { link as linkStyles } from "@heroui/theme";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { staggerContainerWith, fadeUpFrom } from "@/components/motion";
import {
  GithubIcon,
  LinkedinIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";

// Snappy stagger for the slide-out menu — quicker than the page-level rhythm.
const menuList = staggerContainerWith(0.05, 0.04);
const menuItem = fadeUpFrom(10, 0.28);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const closeMenu = () => setIsMenuOpen(false);

  const MenuRow = ({ label, href }: { label: string; href: string }) => {
    const active = isActive(href);

    return (
      <NavbarMenuItem isActive={active}>
        <motion.div variants={menuItem}>
          <NextLink
            className={clsx(
              "flex items-center rounded-lg px-3 py-2.5 text-lg transition-colors",
              "hover:bg-default-100 active:bg-default-200",
              active ? "font-medium text-primary" : "text-foreground",
            )}
            href={href}
            onClick={closeMenu}
          >
            {label}
          </NextLink>
        </motion.div>
      </NavbarMenuItem>
    );
  };

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">
              Er.{" "}
              <span className="bg-gradient-to-r from-[#5EA2EF] to-[#b249f8] bg-clip-text text-transparent">
                GSK
              </span>
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                data-active={isActive(item.href) || undefined}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2">
          <Link
            isExternal
            aria-label="LinkedIn"
            href={siteConfig.links.linkedin}
          >
            <LinkedinIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <motion.div
          animate="visible"
          className="mx-1 mt-2 flex flex-col gap-1"
          initial="hidden"
          variants={menuList}
        >
          {siteConfig.navItems.map((item) => (
            <MenuRow key={item.href} href={item.href} label={item.label} />
          ))}

          <motion.div variants={menuItem}>
            <Divider className="my-3" />
            <p className="px-3 pb-1 text-tiny font-semibold uppercase tracking-wide text-default-400">
              More
            </p>
          </motion.div>

          {siteConfig.navMenuItems.map((item) => (
            <MenuRow key={item.href} href={item.href} label={item.label} />
          ))}

          <motion.div variants={menuItem}>
            <Divider className="my-3" />
            <div className="flex items-center gap-4 px-3 pt-1">
              <Link
                isExternal
                aria-label="LinkedIn"
                href={siteConfig.links.linkedin}
              >
                <LinkedinIcon className="text-default-500" />
              </Link>
              <Link
                isExternal
                aria-label="Github"
                href={siteConfig.links.github}
              >
                <GithubIcon className="text-default-500" />
              </Link>
              <Link
                isExternal
                aria-label="Discord"
                href={siteConfig.links.discord}
              >
                <DiscordIcon className="text-default-500" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
