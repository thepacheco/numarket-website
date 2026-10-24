export type QA = { q: string; a: string };

export const faq: Record<string, QA[]> = {
  pricing: [
    { q: "Can I buy just Foundation?", a: "Yes. Foundation is the one required product. Many larger companies buy Foundation only and point their own Power BI or Tableau at it. Small owners often take Foundation plus Insight Review, without the app." },
    { q: "What's the difference between Workspace and Engineering?", a: "Workspace is your dashboards and reports, built for your business from our standard building blocks, plus Ask Your Data. It's included in the monthly price. Engineering is when you need something built that doesn't exist yet, like a crew scheduler or an automation that writes back to QuickBooks. It's priced as a project." },
    { q: "How often does my data update?", a: "Data from your other systems updates on a schedule: once a day overnight on Small, up to every hour during business hours on Mid, and a custom schedule on Large. What your team types into forms shows up right away." },
    { q: "What happens if I leave?", a: "Within 30 days you get your data in open files (Parquet and CSV) in your own cloud storage, the structure of every table, the cleaning rules, the code for your apps, and your business definitions. Then we delete our copies and confirm it in writing. One thing to know: Ask Your Data runs on Snowflake. If you move your database somewhere else, that feature needs to be rebuilt there. Everything else comes with you." },
    { q: "Why does healthcare cost more?", a: "Health data (HIPAA) has to run on a higher-security edition of the database, which costs about twice as much to run. That's +$500/mo on Small and +$800/mo on Mid. Large is quoted." },
    { q: "How long is the contract?", a: "12 months. Command can be 12 to 36 months. After the term, continue month to month or leave with your data." },
    { q: "What is platform usage?", a: "Updating your private database, storing your history, and paid connectors to some systems cost money each month. Foundation includes that up to an allowance ($400/mo on Small, $800/mo on Mid), which most clients never reach. If you go over, the extra is billed at cost + 15% and shown on its own invoice line. We alert you at 85%. On Large it's passed through at cost + 15%." },
    { q: "Are there per-user fees?", a: "No. Everyone within your size's user limit is included." },
    { q: "How does billing work?", a: "Setup is billed 50% at signing and 50% at launch. Monthly fees are billed in advance." },
    { q: "What if my data is mostly on paper?", a: "For what you fill in going forward (daily logs, change order lists, timesheets), we give your team simple forms on their phones; that's part of Foundation. Reading the paper you already have (scanning old logs, or an app that reads a photo of a form) is a fixed-price Engineering project." },
    { q: "What if I have millions of records?", a: "That's fine, and it costs less than people expect: your database only processes what changed since the last update. Small includes up to about 10 million rows of history and Mid about 50 million; past that it's $200/mo per extra 25 million rows, or the next size. Some systems are connected through paid connectors that charge by the rows that change each month; those fees come out of your platform allowance, and we tell you in the Readiness Check if yours will go over." },
    { q: "How do you keep the price fair as we grow?", a: "Your plan includes normal use: your sources, updates, history, Ask Your Data questions, and platform usage up to an allowance. Anything that grows with volume has a published price (see As you grow), and we warn you at 70% and 85% before anything extra is billed." },
    { q: "What if a change in our own system breaks something?", a: "We fix it, using your monthly change hours. If the same bad entries keep coming back, we flag them so they're fixed in your system; cleaning them by hand every month isn't included." },
    { q: "Do we have to change how we use QuickBooks?", a: "No. Your team keeps using it exactly as it does today. We work from a copy that updates on a schedule, and if we spot an entry that looks wrong, we show you which one so it can be corrected there." },
  ],
  gettingStarted: [
    { q: "Do we have to stop using Excel?", a: "No. We can sync the spreadsheets you want to keep, or give you simple forms that replace the ones you don't." },
    { q: "What if our data is really bad?", a: "That's exactly what we fix. Messy data is the normal starting point, not a problem." },
    { q: "What access do you need?", a: "A read-only connection to each tool that holds your numbers. Most tools have an official connection: you click “Allow,” and it can read data but can't change anything." },
    { q: "Is our data safe?", a: "Every client gets their own separate, encrypted database. Only named people with multi-factor sign-in can reach it, and every login is recorded." },
    { q: "What happens if we leave?", a: "You leave with your data in open files, the cleaning rules, your app code, and your business definitions, within 30 days, at no charge." },
    { q: "Can we start small?", a: "Yes. Start with one team or one question. Add more when you're ready." },
  ],
  smallBusiness: [
    { q: "Is this overkill for a company my size?", a: "No. The Insight plan is built for small companies with up to 3 data sources. You get a data team for less than the cost of one hire." },
    { q: "Do I need IT?", a: "No. We host and run everything. You approve a read-only connection to each tool and spend about 3–5 hours in total." },
    { q: "What if my data is a mess?", a: "That's exactly what we fix." },
    { q: "Will my team actually use it?", a: "The Workspace replaces the spreadsheets they email around today, so it saves them time from week one. Training takes 30 minutes." },
  ],
  enterprise: [
    { q: "We already have Power BI, Snowflake, or Azure.", a: "Good — we build inside it. We make the investment IT already made pay off." },
    { q: "Will this replace our systems?", a: "No. We sit alongside them and read from them." },
    { q: "How do you handle our security review?", a: "We complete your security questionnaire, sign your DPA (or provide ours), and use named accounts with multi-factor sign-in and read-only access." },
    { q: "Can we roll out one department first?", a: "Yes. That's what we recommend. Prove it in one area, then expand." },
  ],
  security: [
    { q: "Who owns the data?", a: "You do. Always. The contract says so." },
    { q: "Is my data mixed with other clients' data?", a: "No. Every client gets their own separate, encrypted database." },
    { q: "What if something goes wrong?", a: "We notify you within 72 hours of any confirmed security incident, with what happened and what we're doing about it." },
    { q: "Can you support healthcare data?", a: "Yes, at any size. Health data runs on a HIPAA-eligible configuration, and we sign a Business Associate Agreement. It adds +$500/mo on Small and +$800/mo on Mid; Large is quoted." },
  ],
};
