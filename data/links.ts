interface Link {
  href: string;
  key: string;
  title: string;
}

export const footerLinks: Link[] = [
  {
    href: "mailto:mknepprath@gmail.com",
    key: "email",
    title: "Email Me",
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
  href: string;
  imgSrc?: string;
  title: string;
}

/** @type {Array<{ description: string, href: string, title: string, imgSrc: string }>} */
export const projectLinks: ProjectLink[] = [
  {
    description: "A simple Pokédex app for Go",
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
    description: "A Twitter text adventure",
    href: "https://twitter.com/familiarlilt",
    title: "lilt",
    imgSrc: "/assets/lilt.png",
  },
  {
    description: "A prompt a day, every day",
    href: "https://twitter.com/designprompts",
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
    description: "AI Twitter bot",
    href: "https://twitter.com/robot_mk",
    title: "Robot MK",
    imgSrc: "/assets/robot-mk.png",
  },
  {
    description: "A thread of Cinema 4D renders",
    href: "https://twitter.com/mknepprath/status/959812218119512065",
    title: "Cinema 4D Animations",
  },
  {
    description: "Chrome extension",
    href: "/patched-tomatoes",
    title: "Patched Tomatoes",
    imgSrc: "/assets/patched-tomatoes.png",
  },
  {
    description: "A React RPG",
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
    href: "https://botsin.space/@bout",
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
