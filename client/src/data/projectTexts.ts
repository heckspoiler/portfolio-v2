export const projectTexts = {
  calvaquiz: {
    short: 'Quiz Application For Sportsfans',
    long: `
Calvaquiz is something you wouldn't expect from a sports app — instead of guessing a numeric outcome, players have to decide whether creative statements by the quizmaster are true or false. Football knowledge isn't the main driver; luck, logic, and persistence are. At Ozelot Studios, we developed Calvaquiz for the Calvados Bar, a well-known sports bar in Zurich. It's a progressive web application built with Next.js on top of Payload CMS and Neon.

The application was built primarily using AI models, following processes like spec-driven development and CI/CD to ensure quality throughout. While my involvement started at the conception stage, I was brought back in later to clean up a messy codebase — courtesy of our good friends Claude and Codex. Inheriting AI-generated code comes with its own set of challenges: logic that works but doesn't scale, inconsistent patterns, and a design that had grown without direction.

My job was to bring structure and coherence to the project. That meant building a reusable component library — cards with multiple variants, page-level layout containers, header components with conditional rendering, and smaller composable features that could be shared across the app. The result is a live product with around 1500 participants and counting, running regularly at one of Zurich's most popular sports bars.`,
  },
  konomi: {
    short: 'Website for the biggest Japanese Culture Festival in Basel',
    long: `I've never been to Japan, but building the new website for Konomi Festival in Basel got me closer than expected. Konomi is one of Switzerland's largest Japanese culture and food festivals, drawing over 10,000 visitors annually to the streets of Basel.

My responsibilities spanned the full project lifecycle — UX and UI design, development, hosting, and ongoing maintenance — in close collaboration with the festival organizers. The site has a strong aesthetic direction rooted in Japanese visual culture, complemented by subtle GLSL shader effects and GSAP animations that give it texture without being distracting.

On the technical side, the more interesting challenges were in the content architecture. The gallery is particularly heavy — it required a double pagination system, navigating both across years and within each year independently. A filtering system and search bar round out the content discovery experience, keeping a large volume of content navigable. User feedback has been positive, with good conversion rates and visitors finding what they needed quickly.

The site is built with Next.js and Prismic CMS, with Zustand for global state management, and has been running and evolving since launch.`,
  },
  ozelot: {
    short: 'Website for Ozelot Studios',
    long: `Ozelot sits at the intersection of aesthetics and music — a creative studio with a distinct point of view. After three years of building client work under the Ozelot name, it was time to put our own fingerprint on the web. I was in the driver's seat for the full rebuild.

My responsibilities covered the entire process — research, design, development with Next.js and Prismic CMS, and ongoing content management. The 3D and R3F work was handled by a team member, but after handover I stepped in to fix bugs and refactor the codebase into a structure that actually scales.

The site has a lot of moving parts — a WebGL canvas, video-heavy pages, and performance constraints that don't forgive much. Finding the right hosting solution for high-quality video without killing load times was one of the more stubborn problems, but we got there. The result is a site that reflects who Ozelot is without compromising on how it runs.`,
  },
  piAgent: {
    short: 'My local little helper',
    long: `Open source and local models still kind of captivate me. There's something genuinely exciting about having your own model running on your machine, working for you, with no API calls and no data leaving your system. That interest deepened when I came across Pi Agent, llama.cpp and Qwen 3.6 — honestly impressive in combination, especially for local use.

Since I prefer having a chat interface embedded directly in my IDE rather than switching context, I decided to build my own VSCode extension. It's more than a chat window — the extension has full access to the codebase, can suggest and apply edits, run CLI commands, and works as a general-purpose assistant without leaving the editor.

The hardest part wasn't the React or Vite side of things — it was the Pi Agent SDK. The documentation assumes a solid prior understanding of how agents work under the hood, and the parts specific to building a custom VSCode extension were either thin or missing entirely. A lot of it came down to reading source code, trial and error, and piecing together how the pieces were supposed to connect. Worth it though.
    `,
  },
  gahdamn: {
    short: 'React Modules Boilerplate Extension',
    long: `Call me old-fashioned, but I prefer CSS Modules over Tailwind — and BaseUI over shadcn — because I like owning the styles completely. That said, I've worked with both Tailwind and shadcn across multiple projects, so this is a preference, not a gap.

The one thing that genuinely grates about CSS Modules is the boilerplate. Two files, same name, import the styles, wire it up — every single time. Small friction, but it compounds. So I built a VSCode extension to handle it: Gahdamn scaffolds the whole structure in one command, the way I want it, without thinking about it.

It's built with TypeScript and the VSCode SDK, and I use it on every project that touches CSS Modules. There's still room to grow it, but it solves the problem it was built for — which is the point.`,
  },
  chop: {
    short: `Browser Extension to analyze Soundcloud Mixes`,
    long: `Digging for tracks in DJ mixes is a pain. You hear something, you don't know what it is, and unless the DJ bothered to post a tracklist — which they rarely do — you're on your own. 2ez-digging is my attempt to fix that.

It's a browser extension that embeds directly into SoundCloud. Authenticated users get a single button on any mix — click it, and the extension sends the mix to a FastAPI backend that chops it into segments, runs each chunk through Shazam, and populates a relational Supabase database with the identified tracks, all linked to the user's account. The result shows up in a companion app where users can browse their scanned mixes and discovered tracks over time.

The stack is TypeScript on the extension side, FastAPI on the backend, and Supabase for the relational data layer. It's still in active development — currently in beta — but the core loop works: scan a mix, find the tracks, keep them.`,
  },
  helpme: {
    short: `Didn't know what to gift my girlfriend`,
    long: `I thought long and hard about whether this one deserves a spot in the portfolio. It does — because it represents me more than anything else here, and because it solves a real problem: being indecisive.

Her birthday was coming up, I had a few options in mind but wanted to get it exactly right. So I activated my inner BuzzFeed editor and built a form that let her decide what I should gift her.

She loved it. At her birthday gathering, a lot of people ended up going through the form themselves to see what they would've gotten — but there's only one. In the end, since she loves coffee and clean design, she got a pour-over coffee stand. And because I'd already bought it off Ricardo and she loves dolphins, a dolphin-shaped bottle opener came along for the ride.
    `,
  },
  pielectron: {
    short: `Chaining agents in a fun and understandable way`,
    long: `Working with multiple agents in a structured, reusable way has always felt more complicated than it should be. You either write orchestration logic from scratch every time, or you bend an existing framework into something it wasn't quite designed for. I wanted something more visual, more intuitive — so I'm building it.

"I'm a senior now" is an Electron app built with React and the Pi Agent SDK. The idea is simple: you build your agents, give them roles and skills, chain them together, and let them work. The interface is node-based — agents are drag-and-drop, connected to each other visually, with skills that can be dropped directly onto them. You can see what's running, what's connected, and what each agent is responsible for at a glance. Different models, different capabilities, different positions in the chain.

The part that matters most to me is reusability. Once a workflow is set up and working, it gets stored as a reference — ready to be dropped into any future project without rebuilding from scratch. Set it up once, tweak it, move on.

It's in very early stages, but the core idea is solid and it's where a lot of my personal energy is going right now.`,
  },
};
