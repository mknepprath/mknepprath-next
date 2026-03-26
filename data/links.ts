interface Link {
  href: string;
  key: string;
  title: string;
}

export const footerLinks: Link[] = [
  {
    href: "mailto:mknepprath@gmail.com",
    key: "email",
    title: "Contact Me",
  },
];

export const navLinks: Link[] = [
  {
    href: "https://github.com/mknepprath",
    key: "code",
    title: "GitHub",
  },
  // {
  //   href: "https://dribbble.com/mknepprath",
  //   key: "illustration",
  //   title: "Dribbble",
  // },
];

interface ProjectLink {
  description: string;
  githubRepo?: string;
  href: string;
  imgSrc?: string;
  title: string;
}

/** @type {Array<{ description: string, href: string, title: string, imgSrc: string }>} */
export const projectLinks: ProjectLink[] = [
  {
    description: "A multiplayer map-building deduction game",
    githubRepo: "mknepprath/wgt-server",
    href: "/who-goes-there",
    title: "Who Goes There?",
  },
  {
    description: "A simple Pokédex app for Go",
    githubRepo: "mknepprath/lily-dex",
    href: "https://lilydex.com",
    title: "lily dex",
    imgSrc: "/assets/lily-dex-icon.png",
  },
  {
    description: "A website inspired by a podcast",
    href: "https://culturallyirrelevant.com",
    title: "Culturally Irrelevant",
    imgSrc: "/assets/culturally-irrelevant.png",
  },
  {
    description: "Movie review site",
    href: "https://tardycritic.com",
    title: "Tardy Critic",
    imgSrc: "/assets/tardy-critic.png",
  },
  {
    description: "A text adventure",
    githubRepo: "mknepprath/lilt",
    href: "/lilt",
    title: "lilt",
    imgSrc: "/assets/lilt.png",
  },
  {
    description: "A prompt a day, every day",
    href: "https://mastodon.social/@designprompts",
    title: "Design Prompts",
    imgSrc: "/assets/design-prompts.png",
  },
  {
    description: "Comic book art",
    href: "/welcome-to-showside",
    title: "8-Bit Kit",
  },
  {
    description: "Illustration series",
    href: "https://dribbble.com/mknepprath/buckets/257652-Design-Prompts-Series",
    title: "Dribbble Series",
    imgSrc: "/assets/dribbble-series.png",
  },
  {
    description: "AI bot",
    githubRepo: "mknepprath/robot-mk",
    href: "https://mastodon.social/@robot_mk",
    title: "Robot MK",
    imgSrc: "/assets/robot-mk.png",
  },
  {
    description: "Chrome extension",
    githubRepo: "mknepprath/patched-tomatoes",
    href: "/patched-tomatoes",
    title: "Patched Tomatoes",
    imgSrc: "/assets/patched-tomatoes.png",
  },
  {
    description: "A React RPG",
    githubRepo: "mknepprath/tiny-mystery-club",
    href: "https://tinymystery.club",
    title: "Tiny Mystery Club",
    imgSrc: "/assets/prize-sparkle.gif",
  },
  {
    description: "A comic retrospective",
    href: "/writing/sequential-art",
    title: "Sequential Art™",
  },
  {
    description: "Battle your friends on Mastodon",
    githubRepo: "mknepprath/bout",
    href: "https://mastodon.social/@boutbot",
    title: "Bout",
  },
  {
    description: "College projects",
    href: "https://vimeo.com/mknepprath",
    title: "Film & Animation",
    imgSrc: "/assets/film.png",
  },
  {
    description: "College projects",
    href: "/writing/giant-portraits",
    title: "Giant Portraits",
    imgSrc: "/assets/giant-portraits.png",
  },
  {
    description: "A Minecraft server",
    href: "/dynoland",
    title: "Dynoland",
  },
  {
    description: "GIF collection",
    href: "/gifs",
    title: "GIFs",
  },
];
