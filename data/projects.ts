import type { ProjectEntry } from "@/types/project";

// ---------------------------------------------------------------------------
// Projects
//
// Ownership note: every claim here is provable in git (see the attribution
// report kept outside the repo). Client work is framed as the engineering
// problem only. No client business specifics, and no fabricated metrics;
// where a real number would help, it is left to be added once confirmed.
//
// All seven projects are fully written: overview, attribution, an
// architecture flow, 2-3 narrative challenges, and reflections.
// ---------------------------------------------------------------------------

export const projects: ProjectEntry[] = [
  {
    slug: "coupaso",
    name: "Coupaso",
    monogram: "C",
    subtitle: "Receipt photos turned into verified, payable cashback.",
    businessModel: "B2C",
    status: "live",
    category: "client",
    role: "Lead full-stack engineer",
    period: "2024 – 2026",
    team: "Core of a 4-dev team",
    company: {
      name: "Auribises Technologies",
      url: "https://auribises.com/",
    },
    domain: "Cashback / fintech",
    tech: [
      "Next.js 14",
      "Firebase Functions",
      "TypeScript",
      "BigQuery",
      "OpenAI",
      "Google Vision",
      "GCP",
    ],
    keywords: [
      "cashback app",
      "receipt scanning app",
      "receipt OCR",
      "AI receipt processing",
      "receipt verification",
      "Google Vision OCR",
      "OpenAI extraction",
      "fraud detection",
      "Firebase Functions backend",
      "Firestore to BigQuery sync",
      "BigQuery data warehouse",
      "admin dashboard",
      "payout system",
      "data pipeline",
      "fintech app",
    ],
    links: [
      { type: "website", label: "coupaso.de (DE)", url: "https://coupaso.de/" },
    ],
    overview:
      "A cashback app where people upload photos of their shopping receipts, an AI pipeline reads and checks the items, and an admin team approves the rewards and pays them out. I owned the admin dashboard and the whole cloud-functions backend.",
    attribution:
      "On a four-person team, I owned the Next.js admin and the Firebase Functions backend end to end: the receipt AI pipeline, the BigQuery warehouse, the move to TypeScript, and the payout flow. Payments and referral logic were a teammate's.",
    architecture: {
      caption:
        "A receipt photo goes through OCR, then the model pulls out the items, then a set of plain code checks, before it lands in a human review queue.",
      steps: [
        {
          label: "Receipt photo",
          detail: "Uploaded by the user, saved as WebP",
        },
        { label: "Google Vision OCR", detail: "Raw document text and labels" },
        {
          label: "Model extraction",
          detail: "Items pulled from the text only",
        },
        { label: "Code checks", detail: "Fraud and suitability rules" },
        { label: "Review queue", detail: "Admin approves with the evidence" },
      ],
    },
    challenges: [
      {
        title: "Reading receipts people actually upload",
        problem:
          "People snap receipts however they happen to grab them. Crumpled, half in shadow, shot at an angle, sometimes in another language. We were paying real cashback off those photos, so rough extraction wasn't an option. If an amount got misread, or someone quietly edited a total or sent the same receipt twice, that was money out the door.",
        approach:
          "I split the job in two instead of handing the whole image to one model and hoping for the best. Google Vision does the OCR and lifts the raw text off the photo. Only that text goes to a cheaper language model to pull out the line items, which kept it quick and cut the cost a lot. The model never gets the last word either. Its output runs through ordinary code checks first, and the review screen puts the warning signs right in front of the admin: what the user typed versus what we read off the receipt, and whether the receipt date even falls inside the claim window.",
        outcome:
          "By the time a receipt reaches a person, the data and the red flags are already sitting next to it, so the team spends its time on the odd ones instead of retyping every receipt.",
      },
      {
        title: "Getting the data somewhere we could actually query",
        problem:
          "Everything sat in Firestore. That's great for the app and frustrating the moment anyone wants analytics that cross collections or look back over time. The reports the team kept asking for just weren't questions Firestore answers well, and the easy fix of one export script per collection was going to turn into a mess fast.",
        approach:
          "So I wrote a single sync layer rather than a script per collection. One generic function takes the row type and every collection runs through it. Writes go in as parameterised MERGE queries keyed on the document id, which means running a sync twice never doubles a row or wipes what's already there. It all runs on a task queue with retries, and every run leaves its own audit record, so when something breaks I can see exactly which run and why instead of guessing.",
        outcome:
          "The team ended up with a warehouse that stays in step with the app across every core collection, and any sync that misbehaves is traceable.",
      },
      {
        title: "Keeping the AI cheap and easy to tweak",
        problem:
          "The extraction prompt needed changing constantly as new shops and odd receipt layouts turned up. Pushing a deploy for every little edit was slow, and it locked out the non-engineers who actually understood the receipts. Left alone, the AI bill would have climbed quickly too.",
        approach:
          "I pulled the prompt out of the code and into config, then put together a small admin playground so anyone could edit and test it without waiting on a release. On cost, I added a quick cheap check up front and converted images to WebP before the heavier work ran, so we weren't paying to deeply analyse receipts that were never going to qualify anyway.",
        outcome:
          "Changing the prompt became a config edit instead of a deploy, and the AI cost stayed flat even as more receipts came through.",
      },
    ],
    reflections: [
      "I'd give the extraction a confidence score so the clearly good receipts can approve themselves and only the shaky ones land in the queue. Right now a person still looks at all of them.",
      "The warehouse has no schema-drift detection yet. If someone renames a Firestore field it quietly needs a manual fix, and I'd rather it caught the mismatch and complained loudly.",
    ],
    featured: true,
  },

  {
    slug: "hero-ecotech",
    name: "Hero Ecotech",
    monogram: "H",
    subtitle: "SAP-integrated B2B field-sales ordering app and backend.",
    businessModel: "B2B",
    status: "live",
    category: "client",
    role: "Backend + app engineer",
    period: "2025 – 2026",
    team: "Core of a small team",
    company: {
      name: "Auribises Technologies",
      url: "https://auribises.com/",
    },
    domain: "Enterprise / ERP integration",
    tech: ["Flutter", "TypeScript", "Express 5", "Firebase", "Algolia", "SAP"],
    keywords: [
      "SAP integration",
      "SAP ERP integration",
      "ERP integration",
      "field sales app",
      "B2B ordering app",
      "Flutter app",
      "Express backend",
      "Algolia search",
      "price sync pipeline",
      "master data sync",
      "order management",
      "TLS certificate handling",
      "legacy system integration",
    ],
    links: [
      {
        type: "website",
        label: "heroecotech.in",
        url: "https://heroecotech.in/",
      },
      {
        type: "website",
        label: "krossbikes.in",
        url: "https://krossbikes.in/",
      },
    ],
    overview:
      "A field-sales ordering app for B2B staff that talks to the customer's SAP ERP through a custom TypeScript backend. I built the backend integration and was effectively the only engineer on the Flutter app.",
    attribution:
      "I was the only engineer on the Flutter app and built the backend's SAP integration, price-sync pipeline, and Algolia sync. A teammate set up the initial SAP data import.",
    architecture: {
      caption:
        "The app only ever talks to my backend. The backend speaks SAP's language on one side and keeps Firestore and Algolia in step on the other.",
      steps: [
        { label: "Field-sales app", detail: "Flutter, staff place orders" },
        { label: "TypeScript backend", detail: "Express, mediates every call" },
        { label: "SAP ERP", detail: "Orders in, master data out" },
        { label: "Firestore + Algolia", detail: "Synced data, fast search" },
      ],
    },
    challenges: [
      {
        title: "Talking to a legacy SAP system that wasn't built for this",
        problem:
          "Orders, customers, products and prices all live in the customer's SAP system, and SAP doesn't make itself easy to reach. It sat on a private IP but answered with a certificate for a hostname, so a normal HTTPS call just failed the check. Placing a sales order wasn't a simple POST either; SAP wanted a token handshake first.",
        approach:
          "For the TLS mismatch I told the request to use the right hostname for the certificate while still connecting to the IP, with the option of a proper CA cert and a dev-only switch that warns loudly if anyone turns the safety off. For orders I followed SAP's two-step flow: fetch the token, then send the order, and I pulled SAP's real response back out so the app could tell a genuine rejection apart from a dropped connection.",
        outcome:
          "The app could place real orders into SAP and stay in step with SAP's data over a connection an off-the-shelf HTTP client refuses to make.",
      },
      {
        title: "Keeping orders correct when several people order at once",
        problem:
          "Multiple staff place orders at the same time, so order numbers could clash. And an order's printed record could quietly change later if someone edited or removed the customer it pointed at.",
        approach:
          "Order numbers are handed out inside a Firestore transaction, so two orders can't grab the same one. Instead of pointing an order at a live customer record, I copy the customer details onto the order when it's created, so the history stays exactly as it was no matter what changes later. On the app side the order code is honest about failure, telling a network drop apart from the server saying no.",
        outcome:
          "No duplicate order numbers under load, order history that doesn't rewrite itself, and error messages that actually mean something.",
      },
      {
        title: "Moving large SAP data sets without falling over",
        problem:
          "Daily syncs pull big sets of customers, products and prices into Firestore and Algolia. Done naively, one oversized payload or one bad record would take the whole run down.",
        approach:
          "I raised the request limit for the bulk loads and processed them in batches that keep going even when a record fails, keeping the failed ones in an audit trail to look at later. The price sync runs as a series of named stages, so if it breaks the error says which stage and I'm not guessing. Product variants get a composite id so they map cleanly, and I tuned the batch size by watching it run rather than guessing.",
        outcome:
          "Syncs finish even when a few records are bad, failures are isolated and recorded, and a broken run points straight at its cause.",
      },
    ],
    reflections: [
      "There are no automated tests around the SAP integration yet, and that fiddly, edge-case code is exactly what benefits most from them. It's the first thing I'd add.",
      "The early TLS workaround on the app side was a stopgap. I documented it and removed it once the real certificate was fixed, but I'd reach for the proper fix first next time.",
    ],
    featured: true,
  },

  {
    slug: "mentcape",
    name: "Mentcape",
    monogram: "M",
    subtitle: "Therapy and coaching SaaS, my step up from junior to senior.",
    businessModel: "B2B2C",
    status: "live",
    category: "client",
    role: "Full-stack engineer",
    period: "2022 – 2026",
    team: "Core team, with a senior mentor",
    company: {
      name: "Auribises Technologies",
      url: "https://auribises.com/",
    },
    domain: "Health / coaching SaaS",
    tech: ["Angular", "Firebase Functions", "Node.js", "pdfmake"],
    keywords: [
      "therapy platform",
      "coaching SaaS",
      "online therapy software",
      "PDF invoice generation",
      "document generation",
      "multilingual email",
      "internationalization",
      "i18n",
      "calendar invites",
      "text-to-speech",
      "Firebase Functions",
      "Angular admin",
      "pdfmake",
      "healthtech SaaS",
    ],
    links: [
      {
        type: "website",
        label: "mentcape.com (DE)",
        url: "https://mentcape.com/",
      },
    ],
    overview:
      "My first product owned end-to-end, over about four years. A platform where therapists run paid coaching programs for patients. I learned cloud functions and system design here through close design review with a senior engineer, then carried those patterns into every backend I built afterward.",
    attribution:
      "I owned the admin app (50+ modules) and the document and communications backend: PDF invoices, multilingual email, calendar invites, and text-to-speech. The core payments integration was a senior teammate's, and a lot of my early growth came from his design reviews.",
    challenges: [
      {
        title: "Sending every document and message in two languages",
        problem:
          "The platform served German and English users, and every touchpoint had to come out right in both: invoices, session confirmations, reminders, password resets, as email and as PDF. Doing that with a copy-pasted template per language would have been a nightmare to keep in sync.",
        approach:
          "I built one PDF service for the invoices and an email system with shared layout pieces, then put the wording behind a small translation layer so a new language is mostly a data change rather than new code. Subjects, body text, and the bits in between all resolve from the same place. Calendar invites and a text-to-speech feature for lesson content went through the same backend.",
        outcome:
          "Every customer-facing document and email shipped correctly in both languages from one set of templates, instead of two copies that slowly drift apart.",
      },
      {
        title: "Building the backend foundation I reused everywhere after",
        problem:
          "This was my first real backend, not just CRUD. The hard part wasn't any single feature; it was setting up patterns, config, logging, structure, how triggers fire, that would survive four years of changes and that I could take to later projects, all while learning the platform as I went.",
        approach:
          "I settled on a few habits that stuck: collection names and config kept in one place instead of scattered through the code, tagged logging so I could trace a single job, a reusable PDF service, and config I could change without a deploy. None of it was designed up front. It came out of reviewing each decision with a senior engineer who kept asking why, which is how I learned to weigh trade-offs out loud.",
        outcome:
          "The same structure became the starting point for my later backends on Hero and Coupaso, so the lessons compounded instead of being thrown away.",
      },
    ],
    reflections: [
      "The oldest part of this codebase is one very large functions file I never went back to break up. The newer code is split sensibly, and I'd give the legacy the same treatment.",
      "There are no automated tests. I'd start with the document generation, since a wrong invoice is the kind of bug a user notices immediately.",
    ],
  },

  {
    slug: "finlo",
    name: "Finlo",
    monogram: "F",
    subtitle: "Multi-tenant parking and transport SaaS with a stats engine.",
    businessModel: "B2B",
    status: "live",
    category: "client",
    role: "Full-stack engineer",
    period: "2023 – 2025",
    team: "Core of a small team",
    company: {
      name: "Auribises Technologies",
      url: "https://auribises.com/",
    },
    domain: "Operations SaaS",
    tech: ["Angular 14", "Firebase", "TypeScript"],
    keywords: [
      "parking management software",
      "transport SaaS",
      "multi-tenant SaaS",
      "analytics dashboard",
      "stats engine",
      "configurable dashboard",
      "data aggregation",
      "Excel export",
      "PDF export",
      "reporting engine",
      "Angular dashboard",
      "fleet management",
      "revenue reporting",
    ],
    links: [{ type: "website", label: "finlo.in", url: "https://finlo.in/" }],
    overview:
      "A management platform for a fleet of parking and transport sites, where every site is set up differently. I built the analytics and dashboard layer that had to adapt to each site's own configuration.",
    attribution:
      "I built the admin-side stats and dashboard engine and the exports. The events and donations expansion in the cloud-functions backend was mostly teammates' work.",
    architecture: {
      caption:
        "Each site is configured differently, so the dashboard reads its config to decide what to show, then folds the day's records into the totals.",
      steps: [
        { label: "Per-site config", detail: "Which revenue streams are on" },
        { label: "Daily records", detail: "Keyed by category, operator, mode" },
        { label: "Fold and total", detail: "Walk each record, sum by config" },
        { label: "Dashboard + export", detail: "Charts, Excel, PDF" },
      ],
    },
    challenges: [
      {
        title: "A dashboard when every site is set up differently",
        problem:
          "Each site turns on a different mix of revenue streams (parking, penalties, tickets, bus, billing) and payment methods, and some ran different app versions. So both which numbers exist and how the raw records add up changed from site to site. There was no single fixed shape to total against.",
        approach:
          "I drove the dashboard off each site's own configuration. It builds its list of stat sections from the site's flags and only shows what that site actually uses, including handling the older app version's differences. For the totals, the daily records have keys that aren't known ahead of time (per vehicle category, per operator, per payment mode, per stop), so the code walks each record, works out whether it's a single number or a bucket of more numbers, and folds it up, turning ids into names along the way.",
        outcome:
          "One dashboard codebase covered every kind of site without a separate build per client, and the same engine handled a second record shape for events.",
      },
      {
        title: "Making the money numbers trustworthy",
        problem:
          "A finance dashboard that's slightly wrong is worse than none, and operators needed exports shaped differently per client. Early on the totals didn't always reconcile, including a bug that double-counted some amounts.",
        approach:
          "I chased the reconciliation issues back to their source so the totals matched the underlying records, and built the exports for Excel and PDF with a configurable option and per-client templates rather than hard-coding each one.",
        outcome:
          "Operators could pull correct, client-shaped reports themselves without an engineer in the loop every time.",
      },
    ],
    reflections: [
      "The aggregation lists out every metric by hand, with the same fields repeated several times. I'd drive it off a single list of metrics so adding one is a one-line change instead of four.",
      "It all runs in the browser. For the larger sites I'd move the heavy aggregation server-side or precompute it.",
    ],
  },

  {
    slug: "sut1-replay-server",
    name: "SUT1 Replay Server",
    monogram: "S",
    subtitle: "Real-time telemetry decoder (Swinburne capstone, HD 90/100).",
    businessModel: "B2B",
    status: "archived",
    role: "Cohort lead engineer",
    period: "2025",
    team: "Multi-cohort handover",
    category: "academic",
    company: {
      name: "Swinburne (industry-client capstone)",
      url: "https://www.swinburne.edu.au/",
    },
    domain: "Real-time systems / networking",
    tech: ["Python", "FastAPI", "asyncio", "WebSockets"],
    keywords: [
      "real-time telemetry",
      "telemetry decoder",
      "replay server",
      "WebSocket server",
      "binary protocol parsing",
      "UDP TCP networking",
      "asyncio",
      "struct parsing",
      "telemetry streaming",
      "session management",
      "sailing simulator",
      "Swinburne capstone",
      "high distinction capstone",
      "real-time systems",
    ],
    links: [],
    overview:
      "A real-time bridge between sailboat simulators and browser dashboards. It takes in binary UDP and TCP telemetry, decodes it, and streams it to web clients over WebSockets. I inherited a stalled multi-cohort codebase and shipped it to the industry client's requirements.",
    attribution:
      "I led the codebase through a multi-cohort handover and did the bulk of the shipped work: the TCP layer, session identity, graceful shutdown, the frontend, and the docs. The original UDP scaffold and base protocol decoders came from a prior cohort.",
    architecture: {
      caption:
        "Simulators send binary telemetry over UDP and TCP. The server decodes it and fans it out to browser dashboards over WebSockets, one stream per session.",
      steps: [
        { label: "Simulator", detail: "Binary UDP and TCP packets" },
        { label: "Decoder", detail: "Struct-aligned byte parsing" },
        { label: "Session manager", detail: "One stream per session hash" },
        { label: "WebSocket fan-out", detail: "Batched to dashboards" },
      ],
    },
    challenges: [
      {
        title: "Picking up a stalled codebase from earlier cohorts",
        problem:
          "I joined a project several student cohorts had already touched. There were multiple half-finished branches, abandoned attempts, and no clear working version, with an industry client still expecting something.",
        approach:
          "I took ownership properly: pulled the scattered branches together, then made decisions I could defend and undo. Where earlier work didn't fit the requirements I reverted it with a written reason instead of quietly deleting it. I got the main path working first and hardened it after, and at the end I wrote a proper docs folder and kept the old readme around so the next person wasn't stuck where I had been.",
        outcome:
          "The project reached a working, documented state and the next cohort member picked it up cleanly, which to me was the real proof it worked. It was graded HD, 90 out of 100.",
      },
      {
        title: "Decoding a binary protocol with no hardware to test on",
        problem:
          "The telemetry came as raw binary packets laid out to match a C++ struct, and I didn't have the actual simulator to test against.",
        approach:
          "I built the TCP side of the decoding and extended the packet formats, parsing with byte-for-byte struct layouts, padding included, and added a small safety net that cleans NaN and infinity values out of malformed packets. To test without the real simulator, I wrote a mock that packs the exact same byte layout, plus an offline decoder to replay captured logs.",
        outcome:
          "I could build and check the whole decode path without the physical simulator, and it held up against messy real packets.",
      },
      {
        title: "Streaming to many browsers without melting",
        problem:
          "Lots of browser clients subscribing to live, high-frequency telemetry, with sessions whose network address keeps changing, and a server that has to shut down cleanly without cutting off active sessions.",
        approach:
          "I built the TCP client and manager layer and wired it into the existing UDP and WebSocket flow, sending updates to browsers in small batches instead of one message at a time. I swapped the shaky address-based session key for a stable hash, and made shutdown wait for a second interrupt while sessions were live so it wouldn't yank the rug out.",
        outcome:
          "Steady multi-session streaming under load, with clean start-up and shutdown.",
      },
    ],
    reflections: [
      "There aren't automated tests in the tree; I leaned on the mock simulator and manual runs. A small suite around the decoders would catch format regressions.",
      "Sessions live in memory, so a restart wipes them. I'd persist session state if this needed to survive restarts.",
    ],
  },

  {
    slug: "apk-guardian",
    name: "APK Guardian",
    monogram: "A",
    subtitle: "ML-based Android malware detection, full-stack.",
    businessModel: "B2C",
    status: "archived",
    category: "academic",
    role: "Solo full-stack + ML",
    period: "2025",
    team: "Solo build after handover",
    company: {
      name: "Swinburne (COS70008 unit)",
      url: "https://www.swinburne.edu.au/",
    },
    domain: "Security / machine learning",
    tech: ["Flask", "Next.js", "Keras", "scikit-learn"],
    keywords: [
      "Android malware detection",
      "malware classifier",
      "APK analysis",
      "machine learning pipeline",
      "model serving",
      "autoencoder",
      "Keras",
      "scikit-learn",
      "Drebin dataset",
      "Flask backend",
      "Next.js frontend",
      "JWT authentication",
      "cybersecurity",
      "ML web app",
    ],
    links: [],
    overview:
      "An Android malware detector: upload an APK and get a benign or malicious prediction from an ML pipeline behind a full-stack app. It was built to the unit's project brief and trained on a real Android malware dataset, not a toy sample. I built the backend, the frontend, and the model-serving glue solo.",
    attribution:
      "I built the entire shipped app solo: the Flask backend, the Next.js frontend, and the model-serving pipeline. The initial Drebin model exploration was a teammate's seed, which I redid for serving.",
    architecture: {
      caption:
        "Upload an APK, the backend runs it through the trained model in the same order it was trained in, and stores the prediction as a logged record.",
      steps: [
        { label: "APK upload", detail: "Stored in cloud storage" },
        { label: "Scale", detail: "Same scaler as training" },
        { label: "Encode + classify", detail: "Autoencoder, then logistic" },
        { label: "Logged result", detail: "Prediction and metadata saved" },
      ],
    },
    challenges: [
      {
        title: "Making the model behave the same in production as in training",
        problem:
          "A classifier is only right in production if it applies the exact same steps, in the same order, as it did during training. One mismatch and the predictions are quietly wrong, which is the worst kind of bug.",
        approach:
          "I saved the three pieces separately, the scaler, the autoencoder encoder, and the logistic classifier, and made the serving code load and apply them in the identical order: scale, encode, classify. They load once when the service starts, not per request. Every prediction is written down as a record with its inputs, probabilities, timings and metadata, so it's auditable rather than a fire-and-forget call.",
        outcome:
          "No drift between training and serving, and every prediction leaves a trail.",
      },
      {
        title:
          "Shipping a full app, frontend, backend and model, solo on a deadline",
        problem:
          "The brief was a complete working product: auth, upload, prediction, history, role-based screens and model serving, built alone, on a tight unit deadline, after taking the work over partway through.",
        approach:
          "I scaffolded a Flask backend with a clean controller and service split, JWT auth and a login-history record, a Next.js frontend with separate admin and user areas behind real route protection, and the prediction screens. I deliberately got every layer working end to end before polishing any one of them.",
        outcome: "A complete, demoable app delivered on time.",
      },
    ],
    reflections: [
      "Under the deadline I skipped tests and proper input validation. Those are the first things I'd add with more time, and the habit I'm deliberately building.",
      "Secrets sit in config rather than a secret manager. Fine for a graded unit, but I'd fix it before anything real.",
    ],
  },

  {
    slug: "obe-platform",
    name: "OBE Platform",
    monogram: "O",
    subtitle: "Accreditation attainment tracker (bachelor's capstone).",
    businessModel: "B2B",
    status: "archived",
    category: "academic",
    role: "Lead architect",
    period: "2021 – 2022",
    team: "2-person team",
    company: {
      name: "GNDEC, Ludhiana",
      url: "https://www.gndec.ac.in/",
    },
    domain: "EdTech / accreditation",
    tech: ["Angular 12", "Node.js", "Express", "MongoDB", "LDAP"],
    keywords: [
      "outcome based education",
      "OBE",
      "accreditation tracker",
      "attainment calculation",
      "CO PO mapping",
      "course outcomes",
      "program outcomes",
      "LDAP authentication",
      "Excel import",
      "PDF report generation",
      "Node.js Express",
      "MongoDB",
      "edtech platform",
      "NBA accreditation",
    ],
    links: [
      {
        type: "github",
        label: "Client repo",
        url: "https://github.com/gurlivleenkainth2000/OBE-CLIENT",
      },
      {
        type: "github",
        label: "Server repo",
        url: "https://github.com/gurlivleenkainth2000/OBE-SERVER",
      },
    ],
    overview:
      "My final-year project: a platform that works out how well a course's assessments map to accreditation outcomes (CO/PO/PSO), built to meet a real accreditation reporting requirement for the college. My earliest end-to-end full-stack app.",
    attribution:
      "I was the lead architect and integrator, working with one co-author, Manjot Singh, who owned the batch and attainment-gap slice.",
    architecture: {
      caption:
        "Faculty define courses and assessments, import marks, and the system works out attainment against the accreditation outcomes and exports the report.",
      steps: [
        { label: "Course + outcomes", detail: "COs, POs, and mappings" },
        { label: "Mark import", detail: "Excel upload" },
        { label: "Attainment compute", detail: "Direct, indirect, and gaps" },
        { label: "PDF report", detail: "Accreditation-ready" },
      ],
    },
    challenges: [
      {
        title: "Turning accreditation rules into working math",
        problem:
          "Accreditation needs you to show how well a course's assessments map through its outcomes, course outcomes up to program outcomes, with direct and indirect attainment and the gaps between them. The hard part was the domain logic, not the screens.",
        approach:
          "I modelled the courses, outcomes, mappings and assessments, then built the attainment calculations and the gap reporting on top. One neat bit: I generated two mark collections from a single shared schema and picked between them per request, which kept the model simple.",
        outcome:
          "Faculty could define a course, import marks and get attainment computed automatically with a PDF to submit, instead of doing it by hand in spreadsheets.",
      },
      {
        title: "Fitting into the college's existing setup",
        problem:
          "Faculty shouldn't have to learn new credentials, and the output had to be something accreditation would accept.",
        approach:
          "I added login against the college's existing LDAP directory so staff used the accounts they already had, plus Excel import for marks and a generated PDF report for submission.",
        outcome:
          "The tool slotted into the college's existing accounts and produced submission-ready reports.",
      },
    ],
    reflections: [
      "This was my earliest full-stack app and it shows in the repetition: the same update logic copied across routes, forms duplicated between create and edit. I'd factor those into shared helpers now.",
      "No tests, and secrets defaulted to placeholders. Acceptable for a college project, but the first things I'd tighten for anything real.",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}
