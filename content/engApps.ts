/* Settings for the four custom-app examples Engineering builds, per industry.
   All figures are illustrative sample data. */
import type { IndustrySlug } from "./industries";

export type EngAppCfg = {
  writeBack: { item: string; system: string; items: [string, number][] };
  estimate: { title: string; unit: string; rate: number; min: number; max: number; start: number; step: number; noun: string };
  portal: { customer: string; milestones: [string, string, string, string] };
  /* paper to digital: the paper form a phone form (or a scan) replaces */
  intake: { paper: string; form: string; qty: string; unit: string; note: string; scale: number };
};

export const engApps: Record<IndustrySlug, EngAppCfg> = {
  construction: {
    writeBack: { item: "change order", system: "QuickBooks", items: [["CO-114 · Route 9 Bridge · added rebar", 18400], ["CO-117 · Terminal Expansion · owner change", 42750], ["CO-120 · Substation Upgrade · design fix", 9600]] },
    estimate: { title: "Build an estimate", unit: "sq ft", rate: 245, min: 2000, max: 60000, start: 12000, step: 500, noun: "job" },
    portal: { customer: "owner", milestones: ["Foundation poured", "Framing complete", "Dried in", "Final inspection"] },
    intake: { paper: "Paper daily logs", form: "Daily field report", qty: "Crew hours", unit: "hrs", note: "Rain delay after 2 PM", scale: 1 },
  },
  manufacturing: {
    writeBack: { item: "purchase order", system: "the ERP", items: [["PO-5521 · steel coil · 40 t", 38200], ["PO-5524 · packaging film", 6150], ["PO-5530 · bearings for Line 2", 2880]] },
    estimate: { title: "Quote an order", unit: "units", rate: 14.2, min: 500, max: 50000, start: 8000, step: 500, noun: "order" },
    portal: { customer: "customer", milestones: ["Order confirmed", "In production", "Quality check", "Shipped"] },
    intake: { paper: "Clipboard downtime sheets", form: "Downtime log", qty: "Minutes down", unit: "min", note: "Jam on the filler", scale: 2 },
  },
  "food-production": {
    writeBack: { item: "supply order", system: "your supplier portal", items: [["SO-208 · produce for Friday events", 3420], ["SO-209 · proteins", 6880], ["SO-211 · disposables", 940]] },
    estimate: { title: "Quote a catering event", unit: "guests", rate: 38, min: 20, max: 2000, start: 250, step: 10, noun: "event" },
    portal: { customer: "client", milestones: ["Menu confirmed", "Headcount locked", "In prep", "Delivered"] },
    intake: { paper: "Handwritten production counts", form: "Production count", qty: "Meals made", unit: "meals", note: "Short two trays of chicken", scale: 9 },
  },
  healthcare: {
    writeBack: { item: "claim correction", system: "the billing system", items: [["Claim 88412 · add prior authorization", 1240], ["Claim 88430 · fix modifier", 610], ["Claim 88455 · update eligibility", 2190]] },
    estimate: { title: "Cost a new service line", unit: "visits a week", rate: 86, min: 100, max: 3000, start: 600, step: 50, noun: "clinic" },
    portal: { customer: "referring practice", milestones: ["Referral received", "Scheduled", "Seen", "Report sent"] },
    intake: { paper: "Paper sign-in sheets", form: "Front-desk check-in", qty: "Walk-ins", unit: "visits", note: "Flu shots ran long", scale: 0.5 },
  },
  utilities: {
    writeBack: { item: "work order", system: "the work-management system", items: [["WO-3310 · replace pole 118", 7400], ["WO-3315 · trim feeder 12", 3900], ["WO-3321 · transformer swap", 12800]] },
    estimate: { title: "Estimate a line project", unit: "miles of line", rate: 185000, min: 1, max: 40, start: 6, step: 1, noun: "project" },
    portal: { customer: "large customer", milestones: ["Request logged", "Crew scheduled", "Work done", "Restored"] },
    intake: { paper: "Paper inspection sheets", form: "Pole inspection", qty: "Poles inspected", unit: "poles", note: "Pole 118 leaning", scale: 0.6 },
  },
  "professional-services": {
    writeBack: { item: "invoice", system: "QuickBooks", items: [["INV-2041 · Halvorsen audit · Sept", 18600], ["INV-2044 · Briar tax prep", 7350], ["INV-2049 · Kestrel advisory", 12400]] },
    estimate: { title: "Scope an engagement", unit: "hours", rate: 185, min: 20, max: 2000, start: 300, step: 10, noun: "engagement" },
    portal: { customer: "client", milestones: ["Kickoff", "Fieldwork", "Review", "Delivered"] },
    intake: { paper: "Paper timesheets", form: "Time entry", qty: "Hours worked", unit: "hrs", note: "Year-end fieldwork", scale: 1.2 },
  },
  logistics: {
    writeBack: { item: "freight invoice", system: "the accounting system", items: [["INV-77310 · Savannah → Atlanta", 2840], ["INV-77314 · Macon backhaul", 1960], ["INV-77322 · Charlotte LTL", 1210]] },
    estimate: { title: "Quote a lane", unit: "miles", rate: 2.65, min: 50, max: 2500, start: 420, step: 10, noun: "lane" },
    portal: { customer: "shipper", milestones: ["Booked", "Picked up", "In transit", "Delivered"] },
    intake: { paper: "Paper delivery tickets", form: "Proof of delivery", qty: "Stops completed", unit: "stops", note: "Dock 4 wait, 40 min", scale: 0.8 },
  },
  "real-estate": {
    writeBack: { item: "lease renewal", system: "the property-management system", items: [["Unit 4B · 12-month renewal", 21600], ["Unit 7F · 6-month renewal", 10950], ["Unit 2A · new lease", 19200]] },
    estimate: { title: "Price unit turnovers", unit: "units", rate: 3400, min: 1, max: 120, start: 14, step: 1, noun: "turnover" },
    portal: { customer: "owner", milestones: ["Listed", "Showing", "Application", "Leased"] },
    intake: { paper: "Paper inspection checklists", form: "Unit inspection", qty: "Units inspected", unit: "units", note: "Leak under sink, 4B", scale: 0.3 },
  },
};
