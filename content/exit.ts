/* What a client gets if they leave (Site Revisions v2.1, 1.5).
   The account-transfer option is subject to confirmation with Snowflake's
   partner team before it is promised in a contract. */
export const exitPackage: { t: string; b: string }[] = [
  { t: "Your data", b: "A full copy in standard open files (Parquet and CSV), delivered to your own cloud storage." },
  { t: "The structure", b: "Every table, field, and relationship." },
  { t: "The cleaning rules", b: "The code that cleans and matches your data. It runs on other databases with modest changes." },
  { t: "Your apps", b: "The code for your dashboards, input screens, and anything Engineering built for you." },
  { t: "The dictionary", b: "What every number means, in plain English." },
  { t: "Or keep it running", b: "We transfer the whole database account to you, so you pay the database provider directly." },
];
export const exitTiming = "Delivered within 30 days of the end of your contract, at no charge. After handover, we delete our copies and confirm it in writing.";
export const exitCaveat = "Ask Your Data runs on Snowflake. If you move your database somewhere else, that feature needs to be rebuilt there. Everything else comes with you.";
