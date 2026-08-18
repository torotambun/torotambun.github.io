# GITHUB SITE CONTEXT — Dr. Toronata Tambun

*Paste this at the start of every new Claude conversation about the GitHub site.*
*Last brought current: 11 August 2026, after the mobile-navigation restructure.
See also the `toro-github-update`, `toro-articles-quarterly`, `toro-posts-quarterly`,
and `toro-speaking-archive` skills — this file and those skills should agree; if they
ever drift, the skills are more likely to be current since they get patched more often.*

---

## What changed on 18 August 2026

1. **`scholarly.html` is now titled "Scholarly Publications."** A new collapsible section,
   **Theses & Dissertation**, sits first on the page above Scopus-Indexed and holds three
   items: the 2026 ITB doctoral dissertation, the 2001 IPMI master's thesis and the 1994
   UGM undergraduate thesis. Page total 22 → 25 across seven categories.
2. **`books.html` is now titled "Books & Book Chapters."** A second always-open section,
   **Book Chapters** (`id="book-chapters"`, list `id="chapters-list"`), holds two
   contributed chapters. Books Published is unchanged at three.
3. **index.html's Industry nav group gained its third link.**
   `industry-experience.html#awards-recognition`, labelled "Awards & Recognition
   (pre-2017)" so it does not duplicate the awards.html link in the Academic column. Both
   nav surfaces updated.
4. **Writing to the working folder now requires asking first.** See "Working folder"
   below.

---

## Working folder

```
/Users/arytoronatatambun/Library/Mobile Documents/com~apple~CloudDocs/Clouds Only Writing/Github.io
```

iCloud Drive on the Mac. Claude reaches it through the device bridge and must request
access each session. **Never write into it without asking first, every session** — Toro
set this rule on 18 August 2026. Read freely; diff local copies against a fresh clone of
the GitHub repo before editing, and stop if they disagree. Writing here does not update
the live site: torotambun.github.io serves the old pages until Toro commits and pushes.

---

## What changed on 11 August 2026 — read this first

index.html was rebuilt because the site was failing on iPhone: a reader scrolled past
four tall, empty collapsed section bars, hit the bottom, and never discovered the
archives hidden in the header nav.

Three structural consequences, all deliberate:

1. **The header nav is gone.** No Writing ▾, no Lifelong Learning ▾, no direct links.
   The header now holds a menu icon, the portrait, the name, and a scripture verse.
2. **index.html no longer holds content sections.** Scholarly Article, Books, Teaching,
   Awards and Contact were removed from the page and became five standalone pages.
   index.html now contains only: header, bio, navigation block, footer, ToC overlay.
   **It has no `<h2>` and no in-page anchors at all.**
3. **Navigation happens in two places** — a full-screen Table of Contents overlay opened
   from the header icon, and a visible navigation block that closes the narrative.

Anything in an older note describing header dropdowns, `.nav-dropdown`, `.section-toggle`
on index.html, or in-page anchors like `#publications` is obsolete. Do not restore it.

---

## Identity

- **Name on index.html:** Dr. Toronata Tambun — short form only. The `<h1>`, the
  `<title>`, and the portrait's `alt` all use it, and index.html's footer reads
  "Toronata Tambun".
- **Name on every other page:** Dr. A.R.Y. Toronata Tambun, in the `© ` footer line.
  This split is deliberate — the display name is short, the copyright line stays formal.
  Do not "harmonise" them.
- **Goes by:** Toro
- **GitHub username:** torotambun
- **Live site:** https://torotambun.github.io
- **Repository:** github.com/torotambun/torotambun.github.io
- **LinkedIn:** linkedin.com/in/toronatatambun
- **Email:** removed from the site entirely — do not add it back anywhere.

---

## Repository Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page — header, bio, navigation, footer. No content sections. |
| `scholarly.html` | Scholarly Publications — 25 items in seven collapsible categories |
| `books.html` | Books & Book Chapters — 3 titles + 2 contributed chapters |
| `teaching.html` | Teaching — four institutions, collapsible |
| `awards.html` | Awards & Recognition — post-2017 only |
| `contact.html` | Contact — LinkedIn, CV link, privacy note |
| `jakarta_post.html` | Jakarta Post columns — searchable by keyword & year |
| `articles.html` | LinkedIn long-form articles archive — searchable |
| `posts.html` | LinkedIn Field Notes (short posts) — searchable |
| `presentations.html` | HTML slide deck archive — searchable |
| `presentations/` | Subfolder containing all HTML slide deck files |
| `speaking.html` | Public speaking / guest lecture archive — searchable |
| `courses.html` | Industry, technical and sales training log (1993–2022) |
| `exec-education.html` | Executive education certificates and alumni standing (2016–2024) |
| `industry-experience.html` | Energy Executive + Entrepreneurship/Board Advisory + pre-2017 Awards |
| `profile.jpg` | Portrait photo (black background, grey blazer) |

The five pages created on 11 August 2026 — scholarly, books, teaching, awards, contact —
were all built from the `courses.html` template, so they share its header, footer,
`.section-toggle` behaviour and back-to-top script.

---

## index.html header

Layout, left to right: menu icon pinned to the top-left corner, then the name and verse,
then the portrait on the right.

```html
<div class="header">
  <div class="header-deco" aria-hidden="true"></div>
  <button type="button" class="toc-btn" id="toc-open" aria-label="Table of contents" ...>
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <rect x="2" y="5"  width="20" height="2.2" rx="1.1"></rect>
      <rect x="2" y="11" width="20" height="2.2" rx="1.1"></rect>
      <rect x="2" y="17" width="20" height="2.2" rx="1.1"></rect>
    </svg>
  </button>
  <img src="profile.jpg" alt="Dr. Toronata Tambun">
  <div class="header-text">
    <h1>Dr. Toronata Tambun</h1>
    <p class="header-verse">
      “But the Lord was with me like a mighty warrior; so my persecutors will stumble and not prevail.”
      <cite>— Jeremiah 20:11</cite>
    </p>
  </div>
</div>
```

- `.header` uses `flex-direction: row-reverse` — that is what puts the portrait on the
  right while the name still comes second in the DOM (so screen readers and crawlers
  meet the name first).
- `.header` has `padding-top: 84px` (72px on mobile) purely to clear the absolutely
  positioned icon. Change one and check the other.
- `.toc-btn` is `position: absolute; top: 28px; left: 28px` — and a second, smaller pair
  of coordinates lives in the `@media (max-width: 560px)` block.

### Hard-won rules for the header — do not undo these

- **The menu icon must be an SVG, never the `☰` character.** `☰` (U+2630) has no glyph in
  some iOS fonts and renders as an empty box on iPhone. This was a real, reported bug.
  The same applies to any other decorative glyph considered for a control.
- **`.header` must not carry `overflow: hidden`.** The decorative circles live in a
  separate `.header-deco` clipping layer for exactly this reason. `overflow: hidden` on
  the header clips anything absolutely positioned that extends past its edge.
- **Do not put navigation links back in the header.** The icon and the overlay are the
  navigation. Adding links back recreates the iPhone failure this restructure fixed.

---

## index.html navigation — two surfaces, one link set

Both carry the same destinations in the same order. If a page is added or renamed,
**update both** or they drift.

**1. Table of Contents overlay** (`#toc-overlay`) — full-screen, navy, opened by the
header icon, closed by the `×` or the Esc key. Adds `body.toc-open { overflow: hidden }`
to lock background scrolling. `z-index: 10000`, above the back-to-top button's 9999.

**2. Navigation block** (`.nav-block`, id `site-navigation`) — visible, titled "Where to
go from here", sitting between the last bio paragraph and the footer. Three columns on
desktop, stacked on phones, with Contact on its own line beneath.

Group order in both, and it is deliberate:

| Group | Links (label → href) |
|-------|----------------------|
| **Academic Life after Industry** | Scholarly Publications → scholarly.html · Books & Book Chapters → books.html · Teaching → teaching.html · Awards & Recognition → awards.html |
| **Industry** | Energy Executive → industry-experience.html#energy-executive · Entrepreneurship & Board Advisory → industry-experience.html#entrepreneurship-and-board-advisory · Awards & Recognition (pre-2017) → industry-experience.html#awards-recognition |
| **Writing & Speaking** | jakarta_post.html, presentations.html ("Columns in Slides"), articles.html, posts.html ("Field Notes"), speaking.html |
| **Lifelong Learning** | exec-education.html, courses.html |
| *(standalone, no heading)* | contact.html |

The Industry group deep-links to the three collapsible sections inside
`industry-experience.html`. That page's generic `openSectionForHash` handler opens the
matching section and scrolls to it on load and on `hashchange`, so any section with an
`<h2 id="...">` is linkable. All three must appear in both nav surfaces.

**"Academic Life after Industry" is Toro's own phrase and must be first.** It names the
biographical arc — the scholarly record that followed 24 years in industry. Earlier
attempts at this label ("On This Page", "Academic Record", "Academic Lineage") were
rejected: the first is meaningless now that the links leave the page, the second cannot
hold a seriosa championship, the third means doctoral descent in scholarly usage.

---

## Bio structure in index.html

Seven paragraphs, in this order. Preserve order and intent; do not merge or reorder.

1. Welcome line — thanks the reader for visiting despite a busy schedule.
2. Mission line — "My work sits at the intersection of..."
3. Executive/industry paragraph (Yayasan Mens et Manus, Aren Energy, 24 years / 52
   countries / Schlumberger) — ends with a link to the Industry Experience page.
4. PhD paragraph — ITB doctorate, Summa Cum Laude, the Dynamic Feedback Theory.
   **"Doctor of Philosophy in Science in Management" carries no hyperlink, and must not.**
   An older note claimed it linked to a SendGrid credential-verification URL; Toro
   confirmed on 11 August 2026 that the current unlinked version is correct. Do not add
   a verification link.
5. Earlier formation paragraph — UGM, MM/MBA, Harvard GMP26, Oxford Saïd, MIT Sloan —
   ends with links to the Courses and Executive Education pages. Deliberately split out
   from the PhD paragraph above.
6. Writing-promotion paragraph — Jakarta Post columns (**live count**, see below),
   LinkedIn Articles, Field Notes, and a pointer to **the Scholarly Publications page**
   (`scholarly.html` — no longer "the section below"). Each channel gets an explicit
   "to see the complete list, please visit [link]," not a bare hyperlink.
7. Membership/availability paragraph — HBR Advisory Council, MIT En-Roads Ambassador,
   availability for board/research/speaking, based in Jakarta and Singapore. **Does NOT
   mention Manadonese/North Sulawesi** — removed at Toro's request; do not re-add it.

### Live Jakarta Post column count — do not hand-edit

The bio contains `<span id="jp-count">87</span>`, computed at page load by fetching
`jakarta_post.html` and counting `<tr>` rows inside `<table id="articles-table"><tbody>`.
The number in the span is only a fallback for when the fetch cannot run (opening the file
locally instead of via the live URL). **Never search-and-replace this number by hand** —
it self-updates once new columns are added to jakarta_post.html's table.
`jakarta_post.html`'s own two badges (`article-count`, `result-count`) are a separate,
still-manual count.

LinkedIn Articles and Field Notes are mentioned without a count. Do not add one unless
Toro asks.

---

## Contact — now its own page

`contact.html` holds three lines and nothing else:

```html
<div class="contact-block">
  <p>You are welcome to send me a message via <a href="https://linkedin.com/in/toronatatambun" target="_blank">linkedin.com/in/toronatatambun</a>.</p>
  <p>A one-page CV is available <a href="[Google Drive link]" target="_blank">here</a> for your kind reference.</p>
  <p class="privacy-note">By downloading or saving any page of this website — including this CV — as a file or PDF, you agree to use the personal information it contains solely for the purpose for which it was provided, and in accordance with applicable data privacy laws.</p>
</div>
```

No email field. No archive links. index.html has no Contact section and no `#contact`
anchor — both navigation surfaces point to `contact.html`.

---

## Collapsible section pattern

```html
<h2 id="section-id"><button type="button" class="section-toggle" aria-expanded="false" data-target="content-id"><span class="section-chevron">&#9656;</span> Section Title</button></h2>
<ul class="pub-list" id="content-id">...</ul>
```

`.pub-list` is `display: none` by default; the JS toggles `.open` on the target and
`.expanded` on the enclosing `<h2>`, using one generic delegated handler — never
per-section hardcoded handlers.

**Where it applies now:** scholarly.html (six categories), teaching.html (four
institutions), courses.html (two), exec-education.html (two), industry-experience.html
(three, including the new Awards section).

**Where it does not:** index.html no longer uses it at all — nothing to collapse.
books.html and awards.html use `class="pub-list always-open"` with no toggle, because
three and four items respectively do not justify hiding.

industry-experience.html additionally has an older per-role `.role-toggle` accordion
inside each `<li>`, which predates and is unrelated to `.section-toggle`. Do not confuse
the two.

---

## Awards are split by 2017

| Where | What |
|-------|------|
| `awards.html` | Scholarly Achievement Award (2026), Ganesa Widya Jasa Utama (July 2025), Best Student Award (2024), HBR Advisory Council (2024–present) |
| `industry-experience.html`, "Awards & Recognition" section | BGP President's Award (2007–2017), Presidential Safety Award (2005), National Seriosa Champion (1989–1991), National Science Writing Finalist (1987) |

awards.html closes with a line pointing readers to Industry Experience for the earlier
ones. Eight awards total — keep both pages in sync with that count.

*Open question Toro has not settled: the 1989–1991 seriosa championship and the 1987
science writing contest sit under Industry Experience because he said "all awards prior
to 2017," but both predate his career entirely. He may move them.*

---

## Footer pattern

`index.html` keeps its own single `.footer` div, reading
"Toronata Tambun · Jakarta · Singapore · Last updated August 2026".

Every other page uses the merged `<footer class="site">` with
"© Dr. A.R.Y. Toronata Tambun · Jakarta · Singapore · torotambun.github.io".

**No footer or bio location line anywhere on the site should say "Bandung."**
The location line is "Jakarta · Singapore" / "Jakarta and Singapore" only, everywhere.

---

## Design system

- **Fonts:** Playfair Display (headings) + Source Serif 4 (body), site-wide including
  index.html.
- **Colours:** `--ink:#1a1a2e`, `--muted:#5a5a7a`, `--accent:#5f4b8b`,
  `--accent2:#1a1a2e`, `--bg:#faf9f6`, `--surface:#ffffff`, `--border:#e8e4dc`.
  index.html's background is `#faf9f6`, not white.
- **Width:** 740px on index.html, 1100px on the archive and content pages.
- **Header band:** `--accent2` navy with translucent purple decorative circles.
- **Menu icon fill:** `#c3b3dd`, white on hover.

---

## Current Counts (verify before quoting — these drift)

- Jakarta Post columns: **live-computed on index.html**; jakarta_post.html's own badges
  read 87 as of August 2026, manually maintained
- Scopus-indexed papers: 4 (3 published + 1 forthcoming, *Journal of Autoethnography*,
  Vol 8 Issue 3, July 2027)
- Scholarly items on scholarly.html: 25 total — 3 theses/dissertation, 4 Scopus,
  1 proceedings, 5 EBSCO/Crossref/DOAJ, 7 Elsevier eJournals (SSRN), 4 preprints, 1 Sinta
- Books published: 3
- Book chapters contributed: 2
- Awards: 8 total — 4 on awards.html, 4 on industry-experience.html
- Teaching entries: 8 across four institutions
- LinkedIn long-form articles: 326+ (as of July 2026) — not displayed as a count
- Field Notes posts: 1510+ (as of August 2026) — not displayed as a count
- Speaking engagements: 124 (as of August 2026); 88 of 124 rows carry a verified
  hyperlink, 36 are plain text with no source link found yet
- Presentations: 87 (as of August 2026)

---

## Publications — Scopus Indexed

1. Neural Development in Early Childhood and the Emergence of Moral Cognition. *International Journal of Early Childhood*, 58, 169–197, 2026. Springer Nature. https://doi.org/10.1007/s13158-025-00449-x
2. Assessing Entrepreneurial Proneness in University-Based Accelerator Programs. *Entrepreneurship Education*, 8, 533–584, 2025. Springer Nature. https://doi.org/10.1007/s41959-025-00153-w
3. Mapping Workplace Inclusion in Hierarchical Collectivist Societies. *Systems*, 13(5), 351, 2025. MDPI. https://doi.org/10.3390/systems13050351
4. We Built It Anyway: Autoethnographic Reflections on Innovation, Risk, and Institutional Apathy. *Journal of Autoethnography*, Vol 8, Issue 3 (July 2027). University of California Press. **Forthcoming.**

---

## Publications — Elsevier eJournals (SSRN)

- Loop-Length Prioritization in Organizational Transformation. *Decision Making, Organizational Behavior & Performance eJournal*, 17(35), 2026. https://doi.org/10.2139/ssrn.6175338
- Strategy and Innovation in AI Oversight. *Cultural Dimensions & Organizational Behavior eJournal*, 16(14), 2026. https://doi.org/10.2139/ssrn.5403675
- Graduate Unemployment and the Wrong Remedy. *Pedagogy eJournal*, 9(89), 2026. https://dx.doi.org/10.2139/ssrn.6695143
- Constructing Entrepreneurial Identity in Indonesia. *Entrepreneurship, Innovation, and Growth eJournal*, 20(112), 2025. https://doi.org/10.2139/ssrn.5486526
- Motivating Entrepreneur Educators. *Entrepreneurship, Innovation, and Growth eJournal*, 20(111), 2025. https://doi.org/10.2139/ssrn.5480767
- Quantifying Retention Across Pedagogical Combinations. *Entrepreneurship, Innovation, and Growth eJournal*, 20(117), 2025. https://doi.org/10.2139/ssrn.5539458
- The Insult Cascade. *Political Behavior: Cognition, Psychology, and Behavior eJournal*, 18(74), 2025. https://doi.org/10.2139/ssrn.5480786

---

## Publications — SSRN Preprints

1. A Formal Model of Evaluative Success Under Sequential Screening. SSRN 6559170, 2026.
2. Beyond Formal Religion: Extended Fasting. SSRN 6493358, 2026.
3. Cognitive Capture in Israel-Palestine Discourse. SSRN 6634458, 2026.
4. Frequency, Interference, and the Resonance of the Soul. SSRN 6583299, 2026.

*Graduate Unemployment and the Wrong Remedy (SSRN 6695143) is no longer a preprint — it
was published in* Pedagogy eJournal, *9(89), 2026, Elsevier/SSRN, and correctly sits under
Elsevier eJournals on scholarly.html. Confirmed by Toro, 11 August 2026. Four preprints
remain.*

---

## Publications — Other

- EBSCO/Crossref/DOAJ: 5 papers (2024)
- Sinta-indexed: 1 paper (2023, with D.W. Irawanto)
- Conference proceedings: 1 (MAG Scholar 2023, Keynote)

---

## Books Published (Kindle Direct Publishing)

1. *Disciplined Storytelling?: Manual for Teaching Communications to Introvert and Extrovert, Co-Learning with My Students*. 2024. ISBN 979-8-3208-4195-3
2. *Pre-Summit Clarity: Understanding the Research Journey through Saunders' Onion*. 2023. ISBN 979-8867984533
3. *Exploring Shared Values in Innovation — A Case Study Approach in Japan, Norway, and Vietnam*. 2023. ASIN B0CNK693T4

---

## Book Chapters (on books.html)

1. Tambun, T. (2025). My Second Self-Marathon Journey. In D. Habir, M. Loeis, F. F. P. Perdana, A. Budianto, D. M. Kresnoputro, & J. Rogers (Eds.), *Bunga Rampai IPMI Alumni Reflections* (pp. 160–163). IPMI Press.
2. Tambun, T. (2021). Saya masih ingat baris-baris pidato saya. In T. Ismail (Ed.), *Membelah tempurung menatap langit: The AFS story* (p. 309). Bina Antarbudaya.

---

## Theses & Dissertation (on scholarly.html, first section)

1. Tambun, A. R. Y. T. (2026). *Corporate-backed university-based innovation–entrepreneur ecosystem model in Indonesia* [Doctoral dissertation, Institut Teknologi Bandung]. https://digilib.itb.ac.id/gdl/view_data/model-ekosistem-inovasi-wirausaha-di-indonesia-berbasis-universitas-yang-didukung-korporasi — source of the Dynamic Feedback Theory. Catalogued in Indonesian; the site displays the English title.
2. Tambun, T., Tjong, B., Tambunan, P. M., Sitepu, M., Hernawan, I., & Mudjadi, W. (2001). *Discovering Corporate Culture PT Kawan Lama Sejahtera* [Master's thesis, Institut Pengembangan Manajemen Indonesia]. https://repository.ipmi.ac.id/270/
3. Tambun, A. R. Y. T. (1994). *Usaha peningkatan resolusi Detektor Sawarmuka Dengan Cara pendinginan* [Undergraduate thesis, Universitas Gadjah Mada]. Departemen Teknik Nuklir dan Teknik Fisika, Fakultas Teknik. No online record.

---

## Teaching

- **STEI-ITB:** Technology-Based Entrepreneurship (EL-4062, formerly EL-4244) — Lecturer from Industry, 2022–present. Link: stei.itb.ac.id/dosen-industri/#
- **UGM Faculty of Agriculture:** Communication Course and Entrepreneurship Course — NIDK Lecturer, Odd Semester 2023/2024–Even Semester 2025/2026. Link: mikro.faperta.ugm.ac.id/a-r-y-toronata-tambun-s-t-m-b-a/
- **Entrepreneurship Bootcamp — 16 cohorts:** delivered both inside semester courses (UGM Nuclear/Engineering Physics, UGM DTETI, UGM Faculty of Agriculture, ITB STEI) and as a standalone bootcamp (Universitas Trunojoyo Madura, Faculty of Agriculture)
- **En-Roads Climate Simulation (Climate Interactive & MIT Sustainability):** Ambassador, 2020–present — workshops in Rabat, Ho Chi Minh City, Guangzhou, Singapore, Jakarta, Bandung, Yogyakarta

---

## Current Roles

- Executive Director, Yayasan Mens et Manus, Jakarta
- Founder & Director, Aren Energy Investment Pte Ltd, Singapore
- Harvard Business Review Advisory Council (2024–present)
- MIT En-Roads Climate Simulation Ambassador (2020–present)

---

## Education

- Doctor of Philosophy in Science in Management — ITB, 2023–2026, Summa Cum Laude, GPA 4.0 of 4.0, Minimum Required Time for Graduation. Doctoral theory: the *Dynamic Feedback Theory of Entrepreneurial Formation in Loss-Averse, Short-Horizon Cultures*.
- Harvard Business School GMP26, December 2018 – April 2019 (Full Alumni Status of Harvard Business School; Associate Alumni Status of Harvard University; Non-Degree)
- MIT Sloan ACE, June 2016 – March 2018 (Affiliate Alumni of MIT Sloan School of Management, 14 courses; Non-Degree) — https://executive.mit.edu/certificate-holder-community/toronata-tambun-0036g000017A1AcAAK.html
- Oxford Saïd Business School, Private Equity School, May 2017 (Associate Alumni Status, Non-Degree)
- UC Berkeley Haas, Venture Capital, April 2018
- Babson College SEE-42, Entrepreneurship Educator, May 2018
- MM / Dual MBA — IPMI Jakarta & Monash University Melbourne, 2001
- Bachelor of Engineering in Nuclear Engineering — Universitas Gadjah Mada, Aug 1989 – Aug 1994.
  Official Indonesian title: **Sarjana Teknik**. Never write "Nuclear Physics."

**Alumni standing — only three programmes confer it.** Harvard GMP26 (Full Alumni), Oxford Saïd
Private Equity School (Associate Alumni), MIT Sloan ACE (Affiliate Alumni). Every other executive
programme and course is non-conferring. `exec-education.html` reflects this with a dedicated
"Alumni Standing" section above "Programs & Certificates" — do not flatten the two back into one
list. Write "Affiliate Alumni" for MIT, never "Affiliated Alumni."

---

## Technical Notes for Claude

- **Update workflow:** Claude edits the file in the working folder → Toro downloads and
  uploads to GitHub. Always work from the file on disk, never from memory of a prior
  session.
- **File naming:** Always `jakarta_post.html` (with underscore) — NOT `jakartapost.html`.
- **Back to top button:** present in all HTML files. Uses `DOMContentLoaded` +
  `document.documentElement.scrollTop` for Safari compatibility. `display: none/block`,
  never opacity or visibility toggling, never flex.
- **CV link:** Google Drive view-only —
  https://drive.google.com/file/d/1bHdTHKkRjeyX2-udRpb3f5MVYSxCRUrw/view?usp=sharing —
  lives only on contact.html.
- **No email field anywhere on the site.** Do not re-add one, and never reference
  `/cdn-cgi/l/email-protection`.
- **Jakarta Post count on index.html is automatic** — do not hand-edit `#jp-count`.
- **Never rename `#articles-table` or restructure its `<tbody>`** in jakarta_post.html
  without rewriting index.html's fetch/count script to match.
- **Link visibility:** speaking.html's `.title-col a` was changed (August 2026) from
  invisible-until-hover to visibly underlined by default, because ~36 of its 124 rows
  have no source link and Toro could not otherwise tell linked rows from plain text.
  posts.html and presentations.html likely still have the old low-contrast style — ask
  before changing them.
- **Mobile responsiveness is locked in** on every table-based archive page (`posts.html`,
  `articles.html`, `jakarta_post.html`, `presentations.html`, `speaking.html`) —
  `.table-wrap{overflow-x:auto}` plus a `min-width` on `table`, and for 3+ column tables
  a stacked mobile card layout. Never strip this when editing `<style>`.
- **After any structural edit, verify before presenting:** closing `</body></html>`
  present, CSS and JS brace balance zero, every `data-target` resolves to a real id,
  every relative link resolves to a file that exists, no duplicate ids.
