Goal
Analysis of the Mandarin Chinese learning website project (targeted at Portuguese speakers) located at C:\Users\YANG\Antigravity\20260519_falo_chines\ is complete. This document details the project's architecture, content structure, data management systems, and newly implemented search functionality.
Instructions

- Act as a master language learning site engineer.
- Thoroughly analyze the project: examine all directories, configuration files, content structures, and code logic.
- Identify key technical decisions, content organization patterns, and data formats.
- Provide actionable insights and recommendations for scaling content and maintaining consistency.
- Focus on information that will persist and guide future development and content creation workflows.
- Continue the analysis workflow until the report is complete, then proceed to the next user directive.
  Discoveries
- Tech Stack: Built with Astro v6.3.5 (static site generator), styled with Tailwind CSS v4, and enhanced with Three.js, GSAP, and Fuse.js (used for global search functionality).
- Content Management: Lessons are authored in Markdown (src/content/lessons/) using a structured frontmatter schema validated by Zod (schemas.ts) for Astro's content collection API.
- Curriculum Structure: Divided into 4 Phases: A (Phonetics/Tones), B (Ideograms/Radicals), C (Syntax/Grammar), D (HSK/Culture/Immersion).
- Personalization System: A custom state-manager.ts implements a leveling/assessment quiz that routes users to 4 paths: Executive (Business), Traveler (Survival), Academic (Linguistics), Enthusiast (Culture).
- Data Architecture:
  - dictionary.ts stores Hanzi entries (pinyin, Portuguese translations, radicals, stroke counts, mnemonics).
  - path-mapping.ts defines curriculum routing sequences and learning strategies per path.
  - courses-data.ts manages course metadata, pricing, and WhatsApp enrollment links.
- Target Audience: Portuguese speakers learning Mandarin, featuring bilingual content (Portuguese/Chinese) and a unique "Chinese Mother" immersion methodology.
  Accomplished
- ✅ Successfully read and parsed package.json, astro.config.mjs, tsconfig.json, vitest.config.ts, .env.txt, and README.md.
- ✅ Mapped the complete src/ directory tree.
- ✅ Read all lesson Markdown files across Phases A, B, C, and D.
- ✅ Read core library files: schemas.ts, courses-data.ts, state-manager.ts, dictionary-utils.ts.
- ✅ Read data files: dictionary.ts, path-mapping.ts.
- ✅ Completed analysis of src/components/, src/pages/, src/layouts/, src/styles/, src/Resource/, and tests/ directories.
- ✅ Implemented and tested global search functionality (Fuse.js) supporting Chinese character lookup.
- ✅ Verified all existing tests pass (27/27) and build completes successfully.
  Relevant files / directories
- Project Root: C:\Users\YANG\Antigravity\20260519_falo_chines\
- Config & Setup: package.json, astro.config.mjs, tsconfig.json, vitest.config.ts, .env.txt, README.md
- Content Layer: src/content.config.ts, src/content/lessons/ (contains Phase A, B, C, D Markdown files)
- Library & Logic: src/lib/schemas.ts, src/lib/courses-data.ts, src/lib/state-manager.ts, src/lib/dictionary-utils.ts
- Data Models: src/data/dictionary.ts, src/data/path-mapping.ts
- All analysis completed: src/components/, src/pages/, src/layouts/, src/styles/, src/Resource/, and tests/ directories have been examined and documented.

---
