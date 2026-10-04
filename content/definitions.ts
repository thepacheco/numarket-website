/* Business definitions (the data dictionary inside Foundation) for the four
   headline numbers in each industry's sample dashboard. Keyed by KPI key.
   Sample content: a real client's definitions are written with them. */
import type { IndustrySlug } from "./industries";

export type Definition = { means: string; from: string; owner: string; updated: string };

export const definitions: Record<IndustrySlug, Record<string, Definition>> = {
  construction: {
    actual: { means: "Every cost posted to a job in the period, including committed subcontracts. Excludes retainage.", from: "QuickBooks job costs + Procore commitments", owner: "Project controls", updated: "Overnight" },
    cpi: { means: "Budget for the work actually done, divided by what it cost. 1.00 or higher means on or under budget.", from: "Excel budgets + QuickBooks job costs", owner: "Project controls", updated: "Overnight" },
    over: { means: "What the work done so far cost, minus what it was budgeted to cost. Positive means over.", from: "Excel budgets + QuickBooks job costs", owner: "Finance lead", updated: "Overnight" },
    rfis: { means: "Requests for information sent to the design team and not yet answered. Counted per job.", from: "Procore RFIs + emailed RFIs", owner: "PM team", updated: "Overnight" },
  },
  manufacturing: {
    units: { means: "Good units off the line in the period. Rejects and rework are not counted.", from: "ERP production orders", owner: "Plant manager", updated: "Hourly, business hours" },
    plan: { means: "Good units produced, divided by the units scheduled for the same shifts.", from: "ERP schedule + production spreadsheets", owner: "Production planner", updated: "Hourly, business hours" },
    uptime: { means: "Scheduled run time minus logged downtime, as a share of scheduled time. Planned maintenance is excluded.", from: "Maintenance logs + shift reports", owner: "Maintenance lead", updated: "Hourly, business hours" },
    reject: { means: "Units that failed inspection, as a share of all units produced.", from: "Quality sheets + ERP", owner: "Quality manager", updated: "Hourly, business hours" },
  },
  "food-production": {
    served: { means: "Meals delivered to a customer or served on site. Staff meals and samples are excluded.", from: "Order sheets + delivery tickets", owner: "Operations manager", updated: "Overnight" },
    cpm: { means: "Food cost plus kitchen labor, divided by meals served.", from: "Inventory counts + labor schedules", owner: "Finance lead", updated: "Overnight" },
    over: { means: "Meals made but not served, as a share of everything made.", from: "Production counts + order sheets", owner: "Executive chef", updated: "Overnight" },
    acc: { means: "How close the production forecast came to meals actually served.", from: "Menu & recipe system + order sheets", owner: "Production planner", updated: "Overnight" },
  },
  healthcare: {
    visits: { means: "Completed patient visits. No-shows and cancellations are not counted.", from: "Scheduling system", owner: "Practice manager", updated: "Overnight" },
    wait: { means: "Minutes from check-in to being seen, averaged across completed visits.", from: "Scheduling system check-in times", owner: "Clinic operations", updated: "Overnight" },
    fill: { means: "Scheduled shifts that had a person assigned, as a share of all shifts posted.", from: "Staffing spreadsheets", owner: "Nursing lead", updated: "Overnight" },
    collect: { means: "Payments received, divided by what was billed for the same visits.", from: "Billing system", owner: "Revenue cycle lead", updated: "Overnight" },
  },
  utilities: {
    saidi: { means: "Total minutes customers were without power, divided by customers served. Major-event days are excluded.", from: "Outage system", owner: "Reliability engineer", updated: "Hourly, business hours" },
    vs: { means: "Outage minutes per customer compared with this year's reliability target.", from: "Outage system + annual targets", owner: "Operations director", updated: "Hourly, business hours" },
    outages: { means: "Separate outage events that affected at least one customer.", from: "Outage system", owner: "Dispatch supervisor", updated: "Hourly, business hours" },
    crew: { means: "Hours crews spent on work orders, as a share of scheduled crew hours.", from: "Work orders + crew schedules", owner: "Field operations", updated: "Hourly, business hours" },
  },
  "professional-services": {
    billed: { means: "Fees invoiced in the period, before write-offs. Expenses passed through are excluded.", from: "Billing + accounting", owner: "Finance lead", updated: "Overnight" },
    util: { means: "Billable hours, divided by available hours for client-facing staff.", from: "Time tracking", owner: "Operations partner", updated: "Overnight" },
    unbilled: { means: "Hours recorded on client work that haven't been invoiced or written off.", from: "Time tracking + billing", owner: "Engagement managers", updated: "Overnight" },
    collect: { means: "Cash received, divided by fees billed for the same period.", from: "Accounting", owner: "Finance lead", updated: "Overnight" },
  },
  logistics: {
    cpm: { means: "Fuel, driver pay, maintenance, and tolls, divided by all miles driven.", from: "Fuel cards + payroll + maintenance records", owner: "Finance lead", updated: "Overnight" },
    empty: { means: "Miles driven with no load, as a share of all miles.", from: "Dispatch / TMS + telematics", owner: "Dispatch manager", updated: "Overnight" },
    ontime: { means: "Deliveries completed inside the customer's window, as a share of all deliveries.", from: "Dispatch / TMS", owner: "Customer service lead", updated: "Overnight" },
    detention: { means: "Hours trucks waited at a customer past the free time in their contract.", from: "Telematics + dispatch notes", owner: "Operations manager", updated: "Overnight" },
  },
  "real-estate": {
    occ: { means: "Units with a signed, active lease, as a share of all rentable units.", from: "Property management software", owner: "Portfolio manager", updated: "Overnight" },
    collect: { means: "Rent received, divided by rent due for the same period.", from: "Property management software", owner: "Accounting lead", updated: "Overnight" },
    noi: { means: "Rent and other income minus operating costs, compared with this year's budget.", from: "Accounting + budgets", owner: "Asset manager", updated: "Overnight" },
    expiring: { means: "Active leases that end in the next 90 days and have no renewal signed.", from: "Lease spreadsheets + property software", owner: "Leasing team", updated: "Overnight" },
  },
};
