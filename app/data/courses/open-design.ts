/**
 * Open Design 01 — decks, images, content (EN).
 * Quality bar: same density as Own Your AI — briefs you can paste, proofs you can fail,
 * failure modes, folder contracts. Motion → Open Video.
 */

export type CourseLang = 'en' | 'fr';
export type LocaleString = Record<CourseLang, string>;
export type CoursePartId = 1 | 2;

const L = (en: string, fr?: string): LocaleString => ({ en, fr: fr ?? en });

export type CourseSection = {
  heading: LocaleString;
  paragraphs?: LocaleString[];
  bullets?: LocaleString[];
  steps?: LocaleString[];
  callout?: LocaleString;
  calloutVariant?: 'note' | 'warning' | 'quote';
  table?: { headers: LocaleString[]; rows: LocaleString[][] };
  checklist?: LocaleString[];
  links?: { label: LocaleString; href: string }[];
};

export type CourseModule = {
  id: string;
  slug: string;
  number: string;
  part: CoursePartId;
  title: LocaleString;
  subtitle: LocaleString;
  minutes: number;
  proof: LocaleString;
  sections: CourseSection[];
};

export const OPEN_DESIGN_PARTS = [
  {
    id: 1 as CoursePartId,
    code: 'I',
    title: L('See it differently'),
    subtitle: L('Four wins in order: stack, deck, images, content pack — no brand theory yet.'),
    promise: L(
      'A folder on disk with a real deck file, an image set, and a one-campaign content pack. You opened every file offline.',
    ),
    startSlug: '00',
    slugs: ['00', '01', '02', '03', '04'],
  },
  {
    id: 2 as CoursePartId,
    code: 'II',
    title: L('Own the system'),
    subtitle: L('Make the win repeatable: brand file, models, skills, export, habits.'),
    promise: L(
      'Regenerate a slide from DESIGN.md alone; know Kimi vs Imagine roles; hand a zip that opens without Hermes.',
    ),
    startSlug: '05',
    slugs: ['05', '06', '07', '08', '09', '10'],
  },
];

export const OPEN_DESIGN_META = {
  id: 'open-design',
  href: '/forge/course/open-design/',
  title: L('Open Design'),
  tagline: L('Stop renting slides. Ship decks and images as files you can open tomorrow.'),
  description: L(
    'Course 02. After Own Your AI Part I: Open Design + Hermes for PPTX/HTML decks, stills (Grok Imagine), and content packs. Brand file + Kimi for structure. Video engines are Course 03 — not here.',
  ),
  prereq: L(
    'Own Your AI Part I done on Hermes Desktop: chat works, SOUL.md in Hermes home, you can list/install a skill. Optional: AGENTS.md for design-lab. Gateway optional for Design labs.',
  ),
  verifiedAsOf: '2026-08',
} as const;

export const OD_UI = {
  courseLabel: L('Forge / Course 02'),
  modules: L('Modules'),
  start: L('Start Part I'),
  startPart2: L('Start Part II'),
  next: L('Next'),
  prev: L('Previous'),
  proof: L('Proof of completion'),
  minRead: L('min'),
  backCourse: L('Open Design'),
  backForge: L('Forge'),
  syllabus: L('Syllabus'),
  outcomes: L('What you will ship'),
  part: L('Part'),
  prereq: L('Prerequisite'),
} as const;

export function t(s: LocaleString, lang: CourseLang = 'en'): string {
  return s[lang] ?? s.en;
}

/** Shared folder contract — every module writes under this tree. */
const FOLDER = `design-lab/
  brief.md
  brand/DESIGN.md
  decks/
  images/
    prompts-used.md
  content/
  handoff/README.md`;

export const OPEN_DESIGN_MODULES: CourseModule[] = [
  // ─── 00 ─────────────────────────────────────────────
  {
    id: 'welcome',
    slug: '00',
    number: '00',
    part: 1,
    title: L('Welcome — stop renting design'),
    subtitle: L('What changes, what does not, and how you will know this course worked.'),
    minutes: 10,
    proof: L(
      'You wrote design-lab/brief.md with audience, goal, and one campaign name — before opening any generator.',
    ),
    sections: [
      {
        heading: L('The problem this course attacks'),
        paragraphs: [
          L(
            'Most “AI design” dies in a browser tab: a pretty PNG you cannot rebuild, a Canva project locked to a subscription, a slide deck nobody versioned. When the chat scroll is gone, the work is gone. That is renting.',
          ),
          L(
            'Here the unit of success is a folder on disk. Hermes (your agent from Course 01) and Open Design (local design workspace) produce files you can open in PowerPoint, a browser, or a zip to a client — without the chat that made them.',
          ),
        ],
        table: {
          headers: [L('Rented'), L('Owned (pass)')],
          rows: [
            [L('Screenshot of a chat image'), L('images/*.png + prompts-used.md')],
            [L('Slides only inside one SaaS'), L('decks/*.pptx or HTML you open offline')],
            [L('“Make it pop” every time'), L('brand/DESIGN.md the agent must follow')],
            [L('Hope you remember the prompt'), L('brief.md + dated filenames')],
          ],
        },
      },
      {
        heading: L('Two parts — do not skip ahead'),
        paragraphs: [
          L(
            'Part I is the aha: stack + deck + images + one content pack. Part II is the system: brand, models, skills, export, habits. If you jump to brand theory before a real deck, you will produce prettier emptiness.',
          ),
        ],
        table: {
          headers: [L('Part'), L('You must produce'), L('You may not skip')],
          rows: [
            [L('I'), L('deck file + image set + content/ folder'), L('Opening files offline')],
            [L('II'), L('DESIGN.md used once + handoff zip'), L('Regenerate without re-explaining brand')],
          ],
        },
        callout: L(
          'Out of scope for this entire course: HyperFrames, Remotion, Manim, multi-agent video pipelines, “make me a reel.” That is Open Video (Course 03). If you start rendering MP4s here, you failed the scope test.',
        ),
        calloutVariant: 'warning',
      },
      {
        heading: L('Prerequisite (hard gate)'),
        paragraphs: [
          L(
            'If Hermes does not chat yet, stop. Finish Own Your AI Part I first. Design without an agent that can write files is just another prompt box.',
          ),
        ],
        checklist: [
          L('Hermes Desktop or CLI answers a normal question'),
          L('You have a profile folder and a SOUL.md'),
          L('You can list skills (hermes skills list or Desktop Skills)'),
          L('You know where agent-written files land on disk'),
        ],
        links: [
          { label: L('Own Your AI — start'), href: '/forge/course/open-harness/00/' },
          { label: L('Own Your AI — install'), href: '/forge/course/open-harness/03/' },
        ],
      },
      {
        heading: L('Folder contract (create it now)'),
        paragraphs: [
          L(
            'Every module writes under one tree. Create it empty before module 01. Do not scatter files across Downloads.',
          ),
        ],
        callout: L(FOLDER),
        calloutVariant: 'note',
      },
      {
        heading: L('First proof action'),
        steps: [
          L('Create design-lab/ and the subfolders above.'),
          L(
            'Write brief.md with exactly: Campaign name · Audience (who) · Goal (what they do after) · Deadline (optional) · “Success = offline files.”',
          ),
          L('Do not generate design yet. Close the module when brief.md exists.'),
        ],
      },
    ],
  },

  // ─── 01 ─────────────────────────────────────────────
  {
    id: 'stack',
    slug: '01',
    number: '01',
    part: 1,
    title: L('Stack map: who does what'),
    subtitle: L('Hermes is already installed. Wire Open Design and prove a smoke file on disk.'),
    minutes: 15,
    proof: L(
      'design-lab/stack-note.md lists: Hermes already OK (link mastery if not), Open Design installed, project path, smoke file path opened offline.',
    ),
    sections: [
      {
        heading: L('Prerequisite — do not re-install Hermes here'),
        paragraphs: [
          L(
            'Own Your AI Part I already taught Desktop/CLI install, SOUL, gateway, and first tools. If chat fails or you have no profile, stop and open mastery — this module will not re-teach install.',
          ),
        ],
        checklist: [
          L('Hermes replies in Desktop or CLI'),
          L('Course profile + SOUL exist'),
          L('You know an absolute path where the agent can write files'),
        ],
        links: [
          { label: L('If broken → Harness 03 Install'), href: '/forge/course/open-harness/03/' },
          { label: L('Harness 04 Soul'), href: '/forge/course/open-harness/04/' },
        ],
        callout: L(
          'Mastery owns Hermes. This course owns the design loop (Open Design + briefs + files).',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('Roles (short)'),
        table: {
          headers: [L('Role'), L('Job')],
          rows: [
            [L('You'), L('Brief, taste, approve anything public')],
            [L('Hermes'), L('Agent already running — tools, skills, write files')],
            [L('Open Design'), L('Design workspace: systems, preview, export')],
          ],
        },
      },
      {
        heading: L('Wire Open Design only'),
        paragraphs: [
          L(
            'Sequence: Hermes works → install Open Design → select Hermes as agent → project root = design-lab/ → smoke file.',
          ),
        ],
        steps: [
          L('Download Open Design from open-design.ai; install for your OS.'),
          L(
            'Select Hermes as the coding agent/adapter per current OD docs (UI may say agents, MCP, or CLI — follow live docs, not memorized flags).',
          ),
          L('Point project root at design-lab/ (absolute path).'),
          L(
            'Smoke: write design-lab/decks/_smoke.md with one title line via Hermes/OD. Open the file offline.',
          ),
          L(
            'stack-note.md: OS · OD present · design-lab path · smoke path · “Hermes mastery OK: yes”.',
          ),
        ],
        callout: L(
          'Pretty preview without a file on disk = fail. Fix paths before module 02.',
        ),
        calloutVariant: 'warning',
        links: [
          { label: L('Open Design'), href: 'https://open-design.ai/' },
          { label: L('Hermes docs'), href: 'https://hermes-agent.nousresearch.com/docs/' },
        ],
      },
    ],
  },

  // ─── 02 ─────────────────────────────────────────────
  {
    id: 'first-deck',
    slug: '02',
    number: '02',
    part: 1,
    title: L('First real deck'),
    subtitle: L('Pasteable brief → v1 → three surgical edits → offline PPTX or HTML.'),
    minutes: 30,
    proof: L(
      'design-lab/decks/ holds a multi-slide file (PPTX and/or HTML) you opened outside Hermes, plus decks/changelog.md listing three edits you requested and confirmed.',
    ),
    sections: [
      {
        heading: L('Why a tight brief beats “make slides”'),
        paragraphs: [
          L(
            'Vague prompts produce generic SaaS sludge: too many slides, no argument, stock metaphors. The agent needs a spine: audience, claim, outline, constraints. You provide the spine; it executes layout and copy drafts.',
          ),
        ],
      },
      {
        heading: L('Copy-paste brief (edit the brackets)'),
        paragraphs: [
          L(
            'Save as design-lab/brief.md (or append under “Deck”). Then paste the same text into Hermes.',
          ),
        ],
        callout: L(
          `DECK BRIEF — Open Design course
Project path: [absolute path]/design-lab/
Export: PPTX preferred (or self-contained HTML if PPTX fails)
Audience: [who will see this]
Goal: after the deck they will [one verb + object]
Core claim (one sentence): [...]
Hard facts that must appear exactly:
- [...]
- [...]
Slide outline (max 8):
1 Title
2 Problem
3 Why now
4 Approach
5 Proof / example
6 Plan / next steps
7 Risks
8 Ask / CTA
Tone: direct, no hype adjectives, no “leverage/synergy”
Visual: dark background OK; high contrast; one idea per slide; no walls of text
Write files only under design-lab/decks/. After export, list the full path to the file.`,
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Run loop'),
        steps: [
          L('Paste the brief. Do not add extra vibe. Wait for a written path to the deck file.'),
          L('Open the file in PowerPoint, Keynote, LibreOffice, or a browser (HTML). If it will not open, fail the step — regenerate or fix export.'),
          L(
            'Request exactly three edits, concrete: e.g. (1) title under 8 words (2) slide 3: one diagram not bullets (3) delete weakest slide. No “make it nicer.”',
          ),
          L('Re-open the file. Confirm all three. Log them in design-lab/decks/changelog.md.'),
          L('Rename to decks/YYYY-MM-DD-campaign-v1.pptx (or .html).'),
        ],
        callout: L(
          'Proof is offline open + changelog. A chat preview is not a deck.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('Common failures'),
        bullets: [
          L('15 slides of fluff — enforce max 8 in the brief and cut again.'),
          L('Agent invents statistics — forbid any number not in “Hard facts.”'),
          L('Export only as conversation markdown — insist on PPTX/HTML path on disk.'),
        ],
      },
    ],
  },

  // ─── 03 ─────────────────────────────────────────────
  {
    id: 'images',
    slug: '03',
    number: '03',
    part: 1,
    title: L('Images for content'),
    subtitle: L('One purpose per set. Imagine (or your still backend). Prompts saved next to files.'),
    minutes: 25,
    proof: L(
      'design-lab/images/ has 3–6 final stills, rejects/ optional, and prompts-used.md with purpose, aspect ratio, prompt text, and which files won.',
    ),
    sections: [
      {
        heading: L('One purpose per set'),
        paragraphs: [
          L(
            'A folder of random “cool AI images” is not a content system. Pick one job for this module: hero for a landing, square social, or slide background. Mixed purposes = inconsistent crop and style.',
          ),
        ],
        table: {
          headers: [L('Purpose'), L('Aspect'), L('Count to keep')],
          rows: [
            [L('Hero / wide banner'), L('16:9 or 21:9'), L('2–3 winners')],
            [L('Social square'), L('1:1'), L('3–4 winners')],
            [L('Slide background'), L('16:9, low detail behind text'), L('2 winners')],
          ],
        },
      },
      {
        heading: L('Style card (paste into the agent)'),
        callout: L(
          `IMAGE STYLE CARD
Purpose: [hero | social | slide bg]
Aspect: [...]
Subject: [...]
Mood: [...]
Must include: [...]
Must avoid: text-in-image, watermarks, logos, busy faces unless requested
Consistency: same palette as deck if deck exists; lighting: [...]
Output: save under design-lab/images/ with clear names; log every prompt in prompts-used.md`,
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Production loop'),
        steps: [
          L('Set image backend: Grok Imagine preferred for this course when available; otherwise your configured still generator. Note which in prompts-used.md.'),
          L('Generate a batch of variants (aim 6–10 raw). Do not keep everything.'),
          L('Cull hard: delete or move rejects. Keep only winners in images/.'),
          L('Light edit only: crop, exposure, remove accidental text. No “make it cinematic” rabbit hole.'),
          L(
            'Write prompts-used.md with: purpose, model/backend, each prompt, filenames of winners. Future you will thank you.',
          ),
        ],
        callout: L(
          'No MP4, no motion, no “animate this.” Stills only. Course 03 owns timelines.',
        ),
        calloutVariant: 'warning',
      },
      {
        heading: L('Common failures'),
        bullets: [
          L('Unreadable text baked into the image — ban text-in-image in the style card.'),
          L('Different style every prompt — lock palette and lighting in the card.'),
          L('Winners only in chat history — if the file is not under design-lab/images/, it does not count.'),
        ],
      },
    ],
  },

  // ─── 04 ─────────────────────────────────────────────
  {
    id: 'content-pack',
    slug: '04',
    number: '04',
    part: 1,
    title: L('One content pack'),
    subtitle: L('One campaign folder: brief, deck piece, three posts, images — human ships.'),
    minutes: 25,
    proof: L(
      'design-lab/content/[campaign]/ contains brief.md, posts.md (3 drafts), link to deck + images, and a line “NOT PUBLIC until human OK.”',
    ),
    sections: [
      {
        heading: L('What “content pack” means here'),
        paragraphs: [
          L(
            'Not a full marketing department. One slice you could ship in a week: the story (brief), the visual spine (deck or title slide), three short posts, and the stills that match. Enough to feel the system; small enough to finish in one sitting.',
          ),
        ],
      },
      {
        heading: L('Pack layout'),
        callout: L(
          `design-lab/content/[campaign-slug]/
  brief.md      # audience, offer, CTA, forbidden claims
  posts.md      # Post A/B/C — platform length noted
  links.md      # paths to deck + images used
  STATUS.md     # "draft | ready for human | published"`,
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Run'),
        steps: [
          L('Name the campaign (slug). Create the folder.'),
          L(
            'Expand brief.md: problem, promise, CTA, three claims you will not make (legal/hype guardrails).',
          ),
          L(
            'Ask Hermes for three post drafts in posts.md: same claim, three angles (problem, proof, ask). Cap length for X and LinkedIn separately.',
          ),
          L('Point links.md at your module 02 deck and module 03 images. Fix broken paths.'),
          L('Set STATUS.md to draft. Do not publish. Part I ends here.'),
        ],
        callout: L(
          'Agents draft. You ship. Auto-post is out of scope and out of trust for this course.',
        ),
        calloutVariant: 'warning',
      },
      {
        heading: L('End of Part I'),
        paragraphs: [
          L(
            'You now have offline proof that agentic design can produce real work products. Part II stops the “lucky prompt” problem: brand file, models, skills, handoff.',
          ),
        ],
        checklist: [
          L('decks/ opens offline'),
          L('images/ + prompts-used.md'),
          L('content/[campaign]/ complete'),
          L('No video tools installed “for later” in this folder'),
        ],
      },
    ],
  },

  // ─── 05 ─────────────────────────────────────────────
  {
    id: 'brand',
    slug: '05',
    number: '05',
    part: 2,
    title: L('Brand file / DESIGN.md'),
    subtitle: L('The agent stops guessing your colors, type, and voice.'),
    minutes: 25,
    proof: L(
      'brand/DESIGN.md exists; you regenerated one slide with only “follow DESIGN.md”; changelog notes what matched and what still failed.',
    ),
    sections: [
      {
        heading: L('Why this is Part II'),
        paragraphs: [
          L(
            'Without a brand file, every deck is a new personality. DESIGN.md (or equivalent brand markdown) is the small contract the agent must load before layout. Open Design is built around design systems; even a one-page markdown file is enough to start.',
          ),
        ],
      },
      {
        heading: L('Minimum DESIGN.md (copy and fill)'),
        callout: L(
          `# DESIGN.md — [Brand / project name]

## Color
- bg: #...
- surface: #...
- text: #...
- accent: #...
- Rules: accent only for CTAs and key numbers; never for body text.

## Type
- Display: [family] — titles
- Body: [family] — paragraphs
- Mono: [family] — code / labels
- Sizes: H1 / H2 / body / caption (name them; avoid random sizes)

## Logo
- Path: brand/logo.svg (or note “wordmark only”)
- Clear space: [...]
- Do not stretch; do not recolor off-palette.

## Voice
Do:
- [...]
- [...]
- [...]
Don't:
- hype adjectives (revolutionary, seamless, leverage)
- [...]
- [...]

## Slide components
- Title slide: [layout rules]
- Body slide: max [N] bullets; prefer one diagram
- Quote slide: [rules]

## Forbidden
- Stock-photo clichés you hate: [...]
- Fonts not listed above
`,
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Extract or write'),
        steps: [
          L('Option A: Drop a screenshot or existing deck and ask Hermes to draft DESIGN.md from it, then you correct every wrong guess.'),
          L('Option B: Fill the template yourself in 15 minutes — faster if you already know the brand.'),
          L('Save as design-lab/brand/DESIGN.md.'),
          L(
            'Regenerate one body slide: “Use ONLY design-lab/brand/DESIGN.md for style. No new colors. Output under decks/.”',
          ),
          L('Score the result in decks/changelog.md: palette OK? type OK? voice OK? Fix DESIGN.md, not only the slide.'),
        ],
        callout: L(
          'If the agent ignores DESIGN.md, your prompt did not force the path. Quote the absolute path and “refuse styles not in the file.”',
        ),
        calloutVariant: 'warning',
        links: [{ label: L('Open Design'), href: 'https://open-design.ai/' }],
      },
    ],
  },

  // ─── 06 ─────────────────────────────────────────────
  {
    id: 'models',
    slug: '06',
    number: '06',
    part: 2,
    title: L('Models for design'),
    subtitle: L('Kimi builds structure. Imagine paints stills. Everything else is fallback.'),
    minutes: 20,
    proof: L(
      'design-lab/models.md lists primary text model, image backend, one timed run (deck edit + one still) with rough cost or “free tier” note.',
    ),
    sections: [
      {
        heading: L('Division of labor'),
        paragraphs: [
          L(
            'Using one “best” model for everything is how bills spike and quality blurs. Split jobs: long-context structure and multi-file layout vs pixel generation.',
          ),
        ],
        table: {
          headers: [L('Job'), L('Front'), L('Why'), L('Fallback')],
          rows: [
            [
              L('Decks, HTML, DESIGN.md edits, multi-file'),
              L('Kimi (BYOK)'),
              L('Structure, long context, code-like layout'),
              L('OD free / other strong text model'),
            ],
            [
              L('Stills, variants, moodboards'),
              L('Grok Imagine'),
              L('Fast visual exploration'),
              L('Any still API you already pay for'),
            ],
            [
              L('Tiny copy tweaks'),
              L('Cheapest acceptable text model'),
              L('Save the good model for hard layout'),
              L('Primary text model'),
            ],
          ],
        },
        callout: L(
          'Course rule: Kimi builds the artifact; Imagine paints the stills. General token/tool cost theory lives in Own Your AI 06 — do not re-learn it here; only assign jobs to models.',
        ),
        calloutVariant: 'quote',
        links: [
          { label: L('Harness 06 — spend/tools intro'), href: '/forge/course/open-harness/06/' },
        ],
      },
      {
        heading: L('Wire and measure (design jobs only)'),
        steps: [
          L('If Kimi is not configured yet: add via Hermes providers (docs beat guesswork). Hermes install is already done.'),
          L('Select Kimi for a deck edit: “Tighten slide 2 titles only; write file under decks/.” Time it.'),
          L('Generate one still with Imagine (or documented Grok image path). Time it. Save under images/.'),
          L(
            'Write models.md: provider names, model IDs as shown in UI, timestamps, “good enough? yes/no”, any rate-limit hit.',
          ),
        ],
        links: [
          {
            label: L('Hermes configuration'),
            href: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration',
          },
          { label: L('Optional: Harness lab — add Grok text'), href: '/forge/course/open-harness/labs/grok-wire/' },
        ],
      },
      {
        heading: L('Common failures'),
        bullets: [
          L('Image model used for slide structure — layout collapses; switch to Kimi.'),
          L('Text model inventing brand colors — force DESIGN.md path again.'),
          L('No measurement — you cannot optimize cost you never logged.'),
        ],
      },
    ],
  },

  // ─── 07 ─────────────────────────────────────────────
  {
    id: 'skills',
    slug: '07',
    number: '07',
    part: 2,
    title: L('Design skills only'),
    subtitle: L('Turn on what ships decks and images. Keep motion skills off this profile.'),
    minutes: 22,
    proof: L(
      'A short skills-audit.md lists enabled design-related skills and explicitly disabled video/motion skills; you ran one task that named a design skill on purpose.',
    ),
    sections: [
      {
        heading: L('Theory lives in Harness 09'),
        paragraphs: [
          L(
            'What a skill is, progressive disclosure, and hub scans are Own Your AI 09. This module only filters the skill list for a design profile — studio, not VFX house.',
          ),
          L(
            'A design profile that loads HyperFrames or Remotion skills will spend tokens deciding whether to animate a slide. That is the wrong failure mode for Course 02.',
          ),
        ],
        links: [
          { label: L('Harness 09 — skills theory'), href: '/forge/course/open-harness/09/' },
        ],
        table: {
          headers: [L('Keep / install for Design'), L('Disable / Open Video later')],
          rows: [
            [L('Open Design, deck, frontend, brand, image helpers you use'), L('HyperFrames, Remotion, Manim, video orchestrators')],
            [L('Export / PDF helpers if present'), L('Full film / avatar pipelines')],
          ],
        },
      },
      {
        heading: L('Why filter before you feel pain'),
        paragraphs: [
          L(
            'Every enabled skill is a candidate the model may load. Noise skills raise cost and produce “I made a motion brief” when you asked for a PPTX. Filtering is studio hygiene, not purism.',
          ),
        ],
        bullets: [
          L('One profile for static design; another later for motion if you need both.'),
          L('Name the skill in the prompt when you want it: “Use the Open Design skill; write under design-lab/.”'),
          L('If a skill rewrites brand outside DESIGN.md, disable it or pin your brand file first.'),
        ],
      },
      {
        heading: L('Audit steps (filter only)'),
        steps: [
          L('hermes skills list (or Desktop). Paste names into design-lab/skills-audit.md.'),
          L('Disable motion/video skills on this profile if enabled. Log each disable with one-line reason.'),
          L('Ensure OD/deck-related skills are available per current OD/Hermes docs.'),
          L('One explicit skill run that writes a small file under design-lab/. Log skill name and path.'),
        ],
        callout: L(
          'Least privilege on skills: if everything is on, tokens go to deciding, not designing.',
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('skills-audit.md template'),
        callout: L(
          `# skills-audit.md
Profile: [...]
Date: [...]
Enabled (design):
- name — why
Disabled (motion / noise):
- name — why
Proof run:
- skill: [...]
- file written: design-lab/[...]
`,
        ),
        calloutVariant: 'note',
      },
    ],
  },

  // ─── 08 ─────────────────────────────────────────────
  {
    id: 'export',
    slug: '08',
    number: '08',
    part: 2,
    title: L('Export and handoff'),
    subtitle: L('A zip that “future you” or a client can open with zero Hermes installed.'),
    minutes: 20,
    proof: L(
      'design-lab/handoff/ contains a zip or mirrored folder; you opened it on a second machine or after quitting Hermes; README lists regenerate steps.',
    ),
    sections: [
      {
        heading: L('Handoff is the real product'),
        paragraphs: [
          L(
            'If the only way to see the work is “open the agent chat,” you still rent. Handoff is the discipline of packaging sources + exports + regenerate instructions.',
          ),
          L(
            'Clients and future-you do not have your chat history. They have files. If a file is missing from handoff/, it does not exist for them.',
          ),
        ],
        checklist: [
          L('Source: design-lab/ tree (or clean subset)'),
          L('Export: final PPTX and/or PDF (+ HTML if used)'),
          L('images/ winners only + prompts-used.md'),
          L('brand/DESIGN.md'),
          L('content/[campaign]/ if you built the pack'),
          L('handoff/README.md — how to regenerate in 5 bullets'),
        ],
      },
      {
        heading: L('What to leave out'),
        bullets: [
          L('Chat transcripts and half-broken v0 drafts unless you need them for forensics'),
          L('API keys, .env, tokens — never in a handoff zip'),
          L('Full rejects/ dumps — keep only if the client asked for process proof'),
          L('Node_modules or render caches if you experimented with motion by mistake'),
        ],
      },
      {
        heading: L('README template'),
        callout: L(
          `# Handoff
Campaign: [...]
Date: [...]
Open these files without Hermes: [...]
To regenerate:
1. Open Hermes profile [...]
2. Project path [...]
3. Load brand/DESIGN.md
4. Prompt: [...]
5. Export to [...]
Do not publish without human review.`,
        ),
        calloutVariant: 'note',
      },
      {
        heading: L('Verify'),
        steps: [
          L('Quit or lock Hermes. Open the deck and images from the handoff folder only.'),
          L('If anything is missing, fix the package — not the chat history.'),
          L('Optional: copy to a USB or second machine. Same test.'),
          L('Name the zip design-lab/handoff/YYYY-MM-DD-campaign.zip (or folder mirror).'),
        ],
        callout: L(
          'Pass criterion: a colleague with no Hermes can open the deck and know how to ask for a regenerate.',
        ),
        calloutVariant: 'quote',
      },
    ],
  },

  // ─── 09 ─────────────────────────────────────────────
  {
    id: 'habits',
    slug: '09',
    number: '09',
    part: 2,
    title: L('Habits that keep quality'),
    subtitle: L('Write your always/never list. Automation is not maturity.'),
    minutes: 18,
    proof: L(
      'design-lab/habits.md contains at least 5 Always and 5 Never rules in your own words (not a paste of this page).',
    ),
    sections: [
      {
        heading: L('Why habits beat more tools'),
        paragraphs: [
          L(
            'You can install every design skill and still ship sludge. Habits are the human loop that agents cannot fake: open the file, cut the lie, date the export, refuse auto-post.',
          ),
        ],
      },
      {
        heading: L('Always (starter set — rewrite in your voice)'),
        bullets: [
          L('Open the exported file yourself before anyone else sees it'),
          L('Date-stamp filenames (YYYY-MM-DD)'),
          L('Put absolute project path in every long brief'),
          L('Load DESIGN.md for anything client-facing'),
          L('Log image prompts next to files'),
          L('Human-approve anything public'),
        ],
      },
      {
        heading: L('Never (starter set)'),
        bullets: [
          L('Auto-post from the agent'),
          L('Accept numbers the model invented'),
          L('Skip offline open “because the preview looked fine”'),
          L('Install video engines into this profile “for later”'),
          L('Store API keys in DESIGN.md or briefs'),
          L('Ship without a handoff folder when the work matters'),
        ],
      },
      {
        heading: L('Write habits.md'),
        steps: [
          L('Copy the starters, delete what you disagree with, add two rules from your own mistakes this course.'),
          L('Add one “when tired” rule (e.g. no public ship after 23:00 without a second open).'),
          L('Pin habits.md path in MEMORY.md (Harness) if you want the agent reminded — optional.'),
        ],
        callout: L(
          'Quality is a loop: brief → generate → open file → edit → export → handoff. Skipping “open file” is how garbage ships.',
        ),
        calloutVariant: 'quote',
      },
      {
        heading: L('habits.md skeleton'),
        callout: L(
          `# habits.md
## Always
1. ...
## Never
1. ...
## Mistakes I made this course
1. ...
## When tired
1. ...
`,
        ),
        calloutVariant: 'note',
      },
    ],
  },

  // ─── 10 ─────────────────────────────────────────────
  {
    id: 'next',
    slug: '10',
    number: '10',
    part: 2,
    title: L('Done — and what is not done'),
    subtitle: L('Binary completion checklist. Open Video only when static feels boring.'),
    minutes: 15,
    proof: L(
      'Every box below is true. If any is false, return to that module — do not start Open Video.',
    ),
    sections: [
      {
        heading: L('Design 01 complete when all are true'),
        checklist: [
          L('design-lab/ tree exists and is the only course workspace'),
          L('Multi-slide deck opens offline'),
          L('3–6 stills + prompts-used.md'),
          L('content/[campaign]/ pack with STATUS not “published” by the agent alone'),
          L('brand/DESIGN.md used to regenerate one slide'),
          L('models.md records Kimi + Imagine (or your named fallbacks)'),
          L('skills-audit.md shows motion skills deferred'),
          L('handoff/ opens without Hermes'),
          L('habits.md written in your words'),
        ],
      },
      {
        heading: L('If a box is false'),
        table: {
          headers: [L('Missing'), L('Return to')],
          rows: [
            [L('No design-lab tree'), L('Module 01 stack map')],
            [L('Deck will not open offline'), L('Module 02 first real deck')],
            [L('No stills / prompts'), L('Module 03 images')],
            [L('No campaign pack'), L('Module 04 content pack')],
            [L('No DESIGN.md reuse'), L('Module 05 brand')],
            [L('Models unclear'), L('Module 06 models')],
            [L('Motion skills still on'), L('Module 07 skills filter')],
            [L('No handoff'), L('Module 08 export')],
            [L('No habits.md'), L('Module 09 habits')],
          ],
        },
      },
      {
        heading: L('Open Video (roadmap) — only if'),
        paragraphs: [
          L(
            'You need motion (MP4), not another slide. You accept render time and iteration cost. You already have stills and a brief from this course. HyperFrames first; Remotion when you want React-level control. Video is still a teaser track on this site — not a third live mastery course.',
          ),
        ],
        links: [
          { label: L('Open Video teaser (roadmap)'), href: '/forge/course/open-video/' },
          { label: L('Own Your AI'), href: '/forge/course/open-harness/' },
          { label: L('Harness Labs'), href: '/forge/course/open-harness/labs/' },
          { label: L('Sample design-lab tree'), href: '/courses/open-design/samples/design-lab-tree.example.md' },
          { label: L('Contact'), href: '/contact/?topic=open-design' },
        ],
      },
    ],
  },
];

export function getOdModule(slug: string) {
  return OPEN_DESIGN_MODULES.find((m) => m.slug === slug);
}
