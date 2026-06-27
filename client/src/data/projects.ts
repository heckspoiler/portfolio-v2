// Typed project data, migrated from the legacy projectsArray.js.
// The old data embedded raw HTML (tech list + GitHub SVG) inside a
// `technologies` string; here those are split into structured fields.

export interface Project {
  slug: string;
  image: string;
  video: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  link: string;
  github: string;
  technologies: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'calvaquiz',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782507513/calvaquiz_duggkd.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782507486/calvaquiz_uzw7up.mov',
    name: 'calvaquiz',
    shortDescription: 'Quiz Application For Sportsfans',
    longDescription:
      "Music's got tons of faces, but most of them get buried in the crowd. Thanks to those big-shot music platforms with their fancy algorithms that seem to cozy up to the big labels, so many rad artists and tunes get drowned out. This makes musical diversity sound like some old-school myth for most mainstream listeners. Finding a track that truly vibes differently? Tough gig. Enter sinecloud. This is our little corner of the web for all the sound junkies and synth enthusiasts to geek out and share their beats. We tap into the soundcloud API to fetch the most recent tracks from 5 radio stations (for now) and combine them in a wild mix of genres. We're running on that popular javascript baddie, react, for our front-end scene to make everything smooth and fast like a song by the Cure and got express.js rocking the backstage. With this, we can at least try to escape the numbness of the cultural industry and make Adorno proud.",
    link: 'https://www.calvaquiz.ch/',
    github: 'https://github.com/heckspoiler/sinecloud/tree/main/sinecloud',
    technologies: [
      'TS',
      'Next.js',
      'Payload CMS',
      'Neon DB',
      'Tailwind CSS',
      'Tanstack Query',
      'Shadcn UI',
      'Zustand',
    ],
  },

  {
    slug: 'konomi',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782503738/konomi_dvzclm.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782504160/konomi_thcpkx.mov',
    name: 'konomi',
    shortDescription:
      'Website for the biggest Japanese Culture Festival in Basel',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.konomi.ch/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'Next.js',
      'Three.js',
      'R3F',
      'CSS Modules',
      'Prismic CMS',
      'Zustand',
    ],
  },
  {
    slug: 'ozelot',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782503731/ozelot_pbgrcg.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782504160/ozelot_a0l2ee.mov',
    name: 'Ozelot Studios',
    shortDescription: 'Website for Ozelot Studios',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.ozelot.ltd/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'Next.js',
      'Three.js',
      'R3F',
      'CSS Modules',
      'Prismic CMS',
      'Zustand',
    ],
  },
  {
    slug: 'piagent',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782503106/piagent_l1ujaj.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782502834/piagent_wx0wiq.mov',
    name: 'PI Agent VSX',
    shortDescription: 'My local little helper',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'React',
      'TS',
      'Bun',
      'VSCode SDK',
      'PI Agent SDK',
      'Zustand',
    ],
  },
  {
    slug: 'gahdamn',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: 'Gahdamn',
    shortDescription: 'React Modules Boilerplate Extension',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I me on! If you intend to come back t ld know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends ered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['TS', 'VSCode SDK'],
  },
  {
    slug: 'CHOP',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782598365/chop_vxq2fw.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782598162/0627_twcdhw.mov',
    name: 'CHOP',
    shortDescription: `Browser Extension to analyze Soundcloud Mixes`,
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://ilonaburfday.vercel.app/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'TS',
      'Bun',
      'Next.js',
      'FastAPI',
      'ZOD',
      'Tanstack Query',
      'FFMPEG',
    ],
  },
  {
    slug: 'helpme',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782506919/helpme_hlnhtq.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782506906/helpme_obzxxc.mov',
    name: 'Help me find a present',
    shortDescription: `Didn't know what to gift my girlfriend`,
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://ilonaburfday.vercel.app/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['Next.Js', 'TS', 'Zustand'],
  },
  {
    slug: 'pielectron',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: `I'm a senior now`,
    shortDescription: 'React Modules Boilerplate Extension',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'TS',
      'Electron',
      'React',
      'PI Agent SDK',
      'Node',
      'Zustand',
    ],
  },
];
