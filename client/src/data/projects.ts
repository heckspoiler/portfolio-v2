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
    image: '/assets/images/projects/testimages/sinecloud.png',
    video: '/assets/images/projects/testvideos/sinecloud.mp4',
    name: 'calvaquiz',
    shortDescription: 'Soundcloud clone with my favorite radio stations',
    longDescription:
      "Music's got tons of faces, but most of them get buried in the crowd. Thanks to those big-shot music platforms with their fancy algorithms that seem to cozy up to the big labels, so many rad artists and tunes get drowned out. This makes musical diversity sound like some old-school myth for most mainstream listeners. Finding a track that truly vibes differently? Tough gig. Enter sinecloud. This is our little corner of the web for all the sound junkies and synth enthusiasts to geek out and share their beats. We tap into the soundcloud API to fetch the most recent tracks from 5 radio stations (for now) and combine them in a wild mix of genres. We're running on that popular javascript baddie, react, for our front-end scene to make everything smooth and fast like a song by the Cure and got express.js rocking the backstage. With this, we can at least try to escape the numbness of the cultural industry and make Adorno proud.",
    link: 'https://sinecloud.digital/',
    github: 'https://github.com/heckspoiler/sinecloud/tree/main/sinecloud',
    technologies: ['React', 'RESTful API', 'express.js', 'vanilla css'],
  },

  {
    slug: 'konomi',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: 'konomi',
    shortDescription: 'A SaaS for Webdev Everything',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['Next.js', 'Three.js', 'R3F', 'CSS Modules', 'Prismic CMS'],
  },
  {
    slug: 'ozelot',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: 'Ozelot Studios',
    shortDescription: 'Website for Ozelot Studios',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['Next.js', 'Three.js', 'R3F', 'CSS Modules', 'Prismic CMS'],
  },
  {
    slug: 'piagent',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: 'PI Agent VSX',
    shortDescription: 'My local little helper',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['React', 'TS', 'Bun', 'Webview UI', 'PI Agent SDK'],
  },
  {
    slug: 'gahdamn',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: 'Gahdamn',
    shortDescription: 'React Modules Boilerplate Extension',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['TS', 'VSCode SDK'],
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
    technologies: ['TS', 'VSCode SDK'],
  },
  {
    slug: 'helpme',
    image: '/assets/images/projects/testimages/chewstreet.png',
    video: '/assets/images/projects/testvideos/chewstreet.mp4',
    name: 'Help me find a present',
    shortDescription: 'React Modules Boilerplate Extension',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['TS', 'VSCode SDK'],
  },
];
