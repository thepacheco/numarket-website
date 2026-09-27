/* Legal page drafts. These must be reviewed by an attorney before launch. */

export type LegalDoc = { title: string; lead: string; sections: [string, string[]][] };

const contact = "numarket LLC, Atlanta, Georgia · hello@numarket.us · (863) 777-9264";

export const legal: Record<string, LegalDoc> = {
  terms: {
    title: "Terms of Service",
    lead: "The terms for using numarket.us. Client work is covered by a separate signed agreement.",
    sections: [
      ["1. Who we are", ["These terms are between you and numarket LLC (“numarket,” “we”), a Georgia limited liability company. By using numarket.us (the “Site”), you agree to them. If you don't agree, please don't use the Site."]],
      ["2. What the Site is for", ["The Site explains our services and lets you contact us, book a Readiness Check, and try interactive demos. You may use it to evaluate numarket for your business."]],
      ["3. Demos, estimates, and sample data", ["All dashboards, questions, savings calculations, and company names in demos use fictional sample data. They are illustrations, not advice, forecasts, or promises of results.", "Estimates from the Getting Started tools are approximate. A fixed quote is provided only after a Readiness Check."]],
      ["4. Acceptable use", ["Don't try to break, overload, or gain unauthorized access to the Site; scrape it at scale; or use it to send spam or harmful code."]],
      ["5. Information you send us", ["When you submit a form, you confirm the information is accurate and that you're allowed to share it. How we handle it is described in our Privacy Policy."]],
      ["6. Intellectual property", ["The Site's content, design, code, and the numarket name and logo belong to numarket LLC unless noted otherwise. You may not copy or reuse them without written permission. Third-party product names are the property of their owners and are used only to describe compatibility."]],
      ["7. Client engagements", ["Paid services are governed by a signed Master Services Agreement, Statement of Work, and Data Processing Addendum. If those documents conflict with these terms, the signed documents control."]],
      ["8. No warranty", ["The Site is provided “as is” and “as available,” without warranties of any kind, to the extent the law allows."]],
      ["9. Limitation of liability", ["To the extent the law allows, numarket is not liable for indirect, incidental, special, or consequential damages arising from use of the Site."]],
      ["10. Changes", ["We may update these terms. The effective date at the top of this page shows when they last changed."]],
      ["11. Governing law", ["These terms are governed by the laws of the State of Georgia, without regard to conflict-of-law rules. Disputes will be handled in the state or federal courts located in Fulton County, Georgia."]],
      ["12. Contact", [contact]],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lead: "What we collect on this website, why, and the choices you have.",
    sections: [
      ["1. Scope", ["This policy covers numarket.us and the forms on it. Client data we process under a contract is covered by that contract and its Data Processing Addendum, not by this policy."]],
      ["2. What we collect", ["Information you give us: your name, work email, phone, company, role, and anything you type into a form (for example company size, systems you use, or your estimate).", "Information collected automatically: aggregated, cookieless page analytics (such as pages viewed and approximate region). We do not build advertising profiles."]],
      ["3. How we use it", ["To reply to you, run your Readiness Check, prepare proposals, and improve the Site. We use your contact details to follow up about your request, and you can ask us to stop at any time."]],
      ["4. We don't sell your information", ["We do not sell or rent personal information, and we do not share it for cross-context behavioral advertising."]],
      ["5. Cookies", ["The Site's analytics are cookieless. If we ever add cookies that aren't strictly necessary, we'll update this policy and ask where required."]],
      ["6. Service providers", ["We use trusted providers to run the Site and our business — website hosting, analytics, form storage, email, and scheduling. They may process information only on our instructions."]],
      ["7. How long we keep it", ["We keep inquiry information for as long as needed to respond and follow up, then delete or anonymize it, unless the law requires us to keep it longer."]],
      ["8. Security", ["We use reasonable administrative, technical, and physical safeguards. No method of transmission or storage is completely secure."]],
      ["9. Your rights", ["Depending on where you live, you may have the right to access, correct, delete, or get a copy of your personal information, and to opt out of certain uses. To make a request, email us. We'll verify your request and respond within the time the law requires. We won't treat you differently for using these rights."]],
      ["10. Children", ["The Site is for businesses and is not directed to children under 13. We don't knowingly collect their information."]],
      ["11. International visitors", ["We're based in the United States and store information here."]],
      ["12. Changes", ["We'll post updates on this page with a new effective date."]],
      ["13. Contact", [contact]],
    ],
  },
  dpa: {
    title: "Data Processing Addendum",
    lead: "A summary of how we handle client data. The full DPA is signed with every contract.",
    sections: [
      ["1. Roles", ["The client owns its data and decides how it's used (controller). numarket processes it only to deliver the contracted services (processor)."]],
      ["2. Instructions and purpose", ["We process client data only on the client's documented instructions and only to provide the services — never to sell it, and never to train models for anyone else."]],
      ["3. Confidentiality", ["Everyone who can access client data is bound by written confidentiality obligations and receives access only as needed."]],
      ["4. Security measures", ["A dedicated, encrypted database per client; encryption in transit and at rest; role-based access with multi-factor sign-in; read-only source connections wherever possible; audit logging of logins and changes; no client data on personal devices."]],
      ["5. Subprocessors", ["Current subprocessors include Snowflake (data platform), cloud hosting, and data-connector providers. A current list is provided with the contract, and clients are notified before changes."]],
      ["6. Incident notification", ["We notify the client without undue delay, and within 72 hours of confirming a security incident affecting its data, with what we know and what we're doing about it."]],
      ["7. Assistance", ["We help clients respond to data-subject requests and regulatory inquiries related to the data we process for them."]],
      ["8. Return and deletion", ["At the end of the engagement, the client receives a full export or an account handover within 30 days. We then delete our copies on request, except where the law requires us to keep them."]],
      ["9. Audits", ["Clients may request reasonable information to confirm compliance with the DPA."]],
      ["10. Healthcare data", ["Where protected health information is involved, a Business Associate Agreement is signed and a HIPAA-eligible configuration is used."]],
    ],
  },
};
