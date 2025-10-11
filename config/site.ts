export const siteConfig = {
  name: "Gurlivleen Singh Kainth",
  title: "Software Developer",
  description:
    "Portfolio of Gurlivleen Singh Kainth — Melbourne-based Software Developer experienced in full-stack web and mobile app development using Next.js, Flutter, Angular, Firebase, and Google Cloud. Explore innovative projects like Finlo Parking Management and Online Therapy Platform.",
  url: "https://gurlivleen.dev",
  author: "Gurlivleen Singh Kainth",
  twitterHandle: "@gurlivleenkainth",
  email: "gurlivleen.kainth2000@gmail.com",
  location: "Melbourne, Victoria, Australia",
  phone: "+61470554455",

  navItems: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" }, // optional
    { label: "Contact", href: "/contact" },
  ],

  navMenuItems: [
    { label: "Resume", href: "/resume" },
    { label: "Achievements", href: "/achievements" },
    { label: "Skills", href: "/skills" },
  ],

  links: {
    github: "https://github.com/gurlivleenkainth2000",
    linkedin: "https://www.linkedin.com/in/gurlivleen2000/",
    twitter: "https://twitter.com/gurlivleen2000",
    portfolio: "https://gurlivleen.dev",
    email: "mailto:gurlivleen.kainth2000@gmail.com",
    discord: "https://discord.com/users/779623906448637953",
    resume: "https://docs.google.com/document/d/e/2PACX-1vSzAndeHb1Z-evv3kbdhykzanvedNUZYvhfiT3w40Fw5Lcg9QdCe-Qnu2pnthWySFVJ5t9bElQX_Z_O/pub?embedded=true",
  },

  // Optional metadata defaults
  meta: {
    title: "Gurlivleen Singh Kainth | Software Developer Portfolio",
    ogImage: "/og-home.jpg",
    keywords: [
      "Gurlivleen Singh Kainth",
      "Software Developer",
      "Full Stack Developer",
      "Next.js",
      "Flutter",
      "Angular",
      "Firebase",
      "Google Cloud",
      "Melbourne",
      "Portfolio",
    ],
  },

  // Optional footer content or social group
  footer: {
    text: "© 2025 Gurlivleen Singh Kainth. All rights reserved.",
    socials: [
      { label: "GitHub", href: "https://github.com/gurlivleenkainth2000" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gurlivleen2000/" },
      { label: "Twitter", href: "https://twitter.com/gurlivleenkainth" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;