# Law of the Land — how to run and publish the site

This is your blog. It is a small Eleventy project: you write each post as a
plain text file, and Eleventy turns the whole folder into a finished website.
You never edit HTML.

Everything you will touch lives in the `src` folder. You can ignore the rest.

---

## 1. The one-time setup (about ten minutes)

You need Node.js installed (https://nodejs.org — choose the "LTS" version).
Then, in a terminal, from inside this folder:

    npm install

That downloads what the site needs. You only do this once.

To see the site on your own machine while you work:

    npm start

Then open the address it prints (usually http://localhost:8080). Leave it
running; it refreshes automatically every time you save a file.

To produce the final files for publishing:

    npm run build

That creates a `_site` folder. That folder *is* the website.

---

## 2. Writing a new essay

1. Go to `src/essays`.
2. Copy an existing file (e.g. `hilltop-norfolk.md`) and rename it. The file
   name becomes part of the web address, so keep it short and hyphenated:
   `green-belt-grey-belt.md` becomes `/essays/green-belt-grey-belt/`.
3. Edit the block at the top between the `---` lines. This is the only
   fiddly part, and it is just a list of labels:

       ---
       title: Very Special Circumstances After the NPPF Revision
       date: 2026-07-02
       type: essay              # use "essay" or "casenote"
       category: Green belt     # the small label shown above the title
       subjects: [green-belt]   # which menu(s) it appears under
       dek: One or two sentences shown in the list of posts.
       ---

4. Below the second `---`, write the essay in Markdown. Markdown is just text:
   a line starting with `## ` is a subheading, `*word*` is italic, `>` makes a
   pulled quote, and a blank line starts a new paragraph. That is nearly all of it.
5. Save. The post appears automatically on the home page, the Essays page, and
   under every subject you listed.

To make something a **case note** instead of an essay, set `type: casenote`.
It will then appear on the Case Notes page, and its title block prints
"A Case Note" rather than "An Essay".

---

## 3. Writing an Institutes (student) note

Same idea, in the `src/institutes` folder. The front matter is shorter:

    ---
    title: Mortgages
    order: 7                              # position on the Institutes page
    summary: The equity of redemption and undue influence.
    reviewed: 2026-07-01                  # prints "Reviewed as at ..."
    ---

The `reviewed` date prints at the foot of the note, so students can see it is
current. Update it whenever you revisit the note.

For a list of key authorities, paste this block into the text where you want it:

    <div class="authorities"><p class="h">Key authorities</p>
    <ul>
    <li><em>Case name</em> [year] citation</li>
    </ul></div>

---

## 4. Adding or renaming a subject

Open `src/_data/subjects.json` and add a line:

    { "slug": "compulsory-purchase", "title": "Compulsory Purchase" }

The `slug` is the web address (lowercase, hyphens). The `title` is the label.
A new subject page and a new menu entry are created automatically. Then add the
slug to the `subjects:` line of any post that belongs there. Keep the list to a
dozen or so — a tidy index is part of the look.

---

## 5. Putting it on the internet

The simplest free route, with no server to manage:

1. Put this project on GitHub (a free account, one new repository).
2. Sign in to **Cloudflare Pages** or **Netlify** and connect that repository.
3. When asked, set the build command to `npx @11ty/eleventy` and the output
   directory to `_site`. (The included `netlify.toml` already says this.)
4. It builds and goes live on a free address. From then on, every time you save
   a new post to GitHub, the site updates itself within a minute.

A custom domain (e.g. lawoftheland.co.uk) costs roughly £8–15 a year from any
registrar and is added in the Pages/Netlify dashboard in a few clicks.

---

## 6. One thing worth doing later

The fonts currently load from Google Fonts. That is fine, but for a site meant
to last it is better to self-host them so nothing depends on an outside service.
It is a small job: download the Cormorant Garamond and EB Garamond files, drop
them in `src/css`, and replace the Google `<link>` in `src/_includes/base.njk`
with a local `@font-face` block. Not urgent.

---

## Where things are

    src/essays/        your essays and case notes (one file each)
    src/institutes/    your student notes (one file each)
    src/_data/         site title, intro text, and the subjects list
    src/css/style.css  all the styling
    src/_includes/     the page templates (header, footer, layouts)
