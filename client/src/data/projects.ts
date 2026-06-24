// Typed project data, migrated from the legacy projectsArray.js.
// The old data embedded raw HTML (tech list + GitHub SVG) inside a
// `technologies` string; here those are split into structured fields.

export interface Project {
  /** Slug used for image/video filenames and as the selection key (was `alt`). */
  slug: string
  /** Display name (was `projectName`). */
  name: string
  /** One-liner shown in the preview footnotes (was `description`). */
  shortDescription: string
  /** Full blurb shown in the sliding description field (was `descriptionLong`). */
  longDescription: string
  /** External link opened from the preview. */
  link: string
  /** GitHub repository URL. */
  github: string
  /** Technology tags (was rendered as <p> + decor dots in the HTML string). */
  technologies: string[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'sinecloud',
    name: 'sinecloud',
    shortDescription: 'Soundcloud clone with my favorite radio stations',
    longDescription:
      "Music's got tons of faces, but most of them get buried in the crowd. Thanks to those big-shot music platforms with their fancy algorithms that seem to cozy up to the big labels, so many rad artists and tunes get drowned out. This makes musical diversity sound like some old-school myth for most mainstream listeners. Finding a track that truly vibes differently? Tough gig. Enter sinecloud. This is our little corner of the web for all the sound junkies and synth enthusiasts to geek out and share their beats. We tap into the soundcloud API to fetch the most recent tracks from 5 radio stations (for now) and combine them in a wild mix of genres. We're running on that popular javascript baddie, react, for our front-end scene to make everything smooth and fast like a song by the Cure and got express.js rocking the backstage. With this, we can at least try to escape the numbness of the cultural industry and make Adorno proud.",
    link: 'https://sinecloud.digital/',
    github: 'https://github.com/heckspoiler/sinecloud/tree/main/sinecloud',
    technologies: ['React', 'RESTful API', 'express.js', 'vanilla css'],
  },
  {
    slug: 'station',
    name: 'station daw',
    shortDescription: 'Landing page for a DAW',
    longDescription:
      "Now that we have already established an application that feeds you with new earfood in the shape of decent tunes, we also need to help musicians that aim for making us happy and delivering us those crispy golden nuggets we're craving for. In comes: Station DAW, a newly founded digital audio workstation delivered straight onto your personal computer, whatever you're using. While we've outsourced the actual development of our new baby to the most competent developers available, we've buckled down and already created the landing page so musicians-in-the-making and established pros can get a first glance at what's to expect. This landing page was built using all Vanilla Ice Ice Baby: HTML, CSS and pure Javascript sometimes are cooler than the latest hype!",
    link: 'https://64b8fa5eae17a45b2c15a874--papaya-macaron-4ea9a6.netlify.app/',
    github: 'https://github.com/heckspoiler/station_daw',
    technologies: ['Vanilla Javascript', 'HTML', 'CSS'],
  },
  {
    slug: 'spaceclub',
    name: 'space club',
    shortDescription: 'A homepage for an imaginary space travel company',
    longDescription:
      "Music here, music there, music everywhere! Not quite, apparently sound waves don't travel in space - so if you're tired of hearing about music, why not treat yourself with something not many people have done before? Space Club offers space travels to places even further away then Australia, and if you're from Australia, even further away than Switzerland! The space club homepage contains some of the destinations possible, but make sure to quit your job in advance because you're not coming back anytime soon! By the way, it's not advised to get out of your way confirm our statement about sound waves not travelling in space, keep your helmet on at all times please. This website is a frontendmentor.io challenge (intermediate-level) and was crafted with Next.js, using its server-sided rendering for SEO-optimization and TailwindCSS, utilizing a modular design strategy for the Tailwind components.",
    link: 'https://unique-wisp-345515.netlify.app',
    github: 'https://github.com/heckspoiler/space-travel',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    slug: 'chewstreet',
    name: 'chewstreet',
    shortDescription: 'A SaaS for Webdev Everything',
    longDescription:
      "Now that you're in outer space, you have plenty of time to kill. I mean, it might take you up to seven years to reach your final destination! If you intend to come back to Earth someday (and we hope you will), you should know that, based on what we've seen in the last decade, technological advancements are unlikely to slow down, especially now with AI in the mix. So you might be better off staying in touch with the latest trends and developments. Need resources for that? We've got you covered here, too. Chewstreet offers basic courses in all things web development and design at a very low price, with payment options available either monthly or annually. Considering recent inflation rates, this could be a real steal in 14 years when you finally touch down on Earth again. This project uses Next.js for server-side content rendering and CSS Tailwind to make it visually appealing. For the backend, we use Supabase, and Stripe handles payments and subscriptions. Since I'm using Stripe's test version, I can't go into production mode, but if you want to invite me for an interview, I can bring my laptop and show you the finished project.",
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['Next.js', 'Tailwind CSS', 'supabase', 'Stripe'],
  },
]
