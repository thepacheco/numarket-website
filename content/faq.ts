export type QA = { q: string; a: string };

export const faq: Record<string, QA[]> = {
  pricing: [
    { q: "How long is the contract?", a: "12 months for Insight and Operate. Command can be 12 to 36 months. After the term, you can continue month-to-month or leave with your data." },
    { q: "What happens if we leave?", a: "You get a full export of your clean database, or we hand the whole account over to you, within 30 days. No charge. Ownership is written into the contract." },
    { q: "What is platform usage?", a: "Your private database costs money to store and run. That cost is included up to an allowance ($400/mo on Insight, $800/mo on Operate). If you go over, the extra is billed at cost + 15% and shown clearly on your invoice. We alert you before you get close." },
    { q: "Are there per-user fees?", a: "No. Everyone within your tier's user limit is included." },
    { q: "How does billing work?", a: "Setup is billed 50% at signing and 50% at launch. The monthly subscription is billed in advance." },
    { q: "What's included in the monthly price?", a: "Hosting your private database, keeping your data updated automatically, your Workspace app, Ask Your Data, alerts, your Insight Reviews, and a set number of change-request hours each month." },
    { q: "Can we start small?", a: "Yes. Most clients start with one department or one set of numbers, then add more once the team trusts it." },
  ],
  gettingStarted: [
    { q: "Do we have to stop using Excel?", a: "No. We can sync the spreadsheets you want to keep, or give you simpler input screens that replace the ones you don't." },
    { q: "What if our data is really bad?", a: "That's exactly what we fix. Messy data is the normal starting point, not a problem." },
    { q: "What access do you need?", a: "Read-only access to the tools that hold your numbers, wherever possible. We never need to change anything in your systems." },
    { q: "Is our data safe?", a: "Every client gets their own separate, encrypted database. Only named people with multi-factor sign-in can reach it, and every login is recorded." },
    { q: "What happens if we leave?", a: "You leave with everything: a clean, organized database, within 30 days, at no charge." },
    { q: "Can we start small?", a: "Yes. Start with one team or one question. Add more when you're ready." },
  ],
  smallBusiness: [
    { q: "Is this overkill for a company my size?", a: "No. Insight is built for 10–100 person companies. You get a data team for less than the cost of one hire." },
    { q: "Do I need IT?", a: "No. We host and run everything. You need logins to your tools and about 3–5 hours of your time in total." },
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
    { q: "Is my data mixed with other clients' data?", a: "Never. Every client gets their own separate, encrypted database." },
    { q: "What if something goes wrong?", a: "We notify you within 72 hours of any confirmed security incident, with what happened and what we're doing about it." },
    { q: "Can you support healthcare data?", a: "Yes. HIPAA-eligible configuration and a Business Associate Agreement are available on Command or on request." },
  ],
};
