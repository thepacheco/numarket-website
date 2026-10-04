/* The "flagged for review" step of the Foundation demo. After cleaning, a few
   records can't be settled by rules alone, so a person decides. Sample data. */
import type { IndustrySlug } from "./industries";

export type Flag = {
  /* what was found */
  text: string;
  /* the question only someone on the team can answer */
  ask: string;
  /* two answers; the first keeps it, the second sends it back to the source */
  options: [string, string];
};

export const flags: Record<IndustrySlug, Flag[]> = {
  construction: [
    { text: "Job 114 has $6,200 in costs but no matching budget line.", ask: "Add a budget line, or was it coded to the wrong job?", options: ["Add a budget line", "Wrong job — recode"] },
    { text: "A −$3,480 cost on Route 9 Bridge in QuickBooks.", ask: "A real credit from a supplier, or an entry error?", options: ["Real credit", "Entry error"] },
    { text: "Two subcontracts for the same amount, one day apart.", ask: "Two separate contracts, or one entered twice?", options: ["Two contracts", "Entered twice"] },
  ],
  manufacturing: [
    { text: "Line 3 logged 26 hours of run time on one day.", ask: "Overlapping shifts, or a time entered wrong?", options: ["Overlapping shifts", "Entry error"] },
    { text: "PO-5530 was received but never invoiced.", ask: "Still waiting on the invoice, or was it returned?", options: ["Waiting on invoice", "Returned"] },
    { text: "A reject count higher than units made on Line 2.", ask: "Rework from an earlier batch, or a typo?", options: ["Rework", "Typo"] },
  ],
  "food-production": [
    { text: "Friday's chicken count is 10× a normal week.", ask: "A large event, or an extra zero?", options: ["Large event", "Extra zero"] },
    { text: "An order for 0 guests with $1,840 in food cost.", ask: "A drop-off order, or a missing headcount?", options: ["Drop-off order", "Missing headcount"] },
    { text: "A recipe uses an ingredient that isn't in inventory.", ask: "New item to add, or the wrong item picked?", options: ["Add the item", "Wrong item"] },
  ],
  healthcare: [
    { text: "A visit is checked out before it was checked in.", ask: "Clock set wrong at the front desk, or a mistyped time?", options: ["Clock issue", "Mistyped time"] },
    { text: "A −$420 payment on a closed claim.", ask: "A real refund to the payer, or a posting error?", options: ["Real refund", "Posting error"] },
    { text: "Two shifts assigned to one nurse at the same time.", ask: "A split shift across clinics, or a double booking?", options: ["Split shift", "Double booking"] },
  ],
  utilities: [
    { text: "An outage logged with a restore time before its start.", ask: "Times swapped, or two events merged?", options: ["Times swapped", "Two events"] },
    { text: "Work order WO-3321 is closed with no crew hours.", ask: "Done by a contractor, or hours not entered?", options: ["Contractor", "Hours missing"] },
    { text: "Pole 118 appears in two districts.", ask: "On the district line, or a wrong district code?", options: ["On the line", "Wrong code"] },
  ],
  "professional-services": [
    { text: "12 hours logged to a client marked inactive.", ask: "Reopen the client, or move the hours?", options: ["Reopen client", "Move the hours"] },
    { text: "An invoice for −$2,150 in Billing.", ask: "A real credit note, or an entry error?", options: ["Real credit", "Entry error"] },
    { text: "One person logged 31 hours on a single day.", ask: "Several days entered at once, or a typo?", options: ["Several days", "Typo"] },
  ],
  logistics: [
    { text: "A load with 0 miles and $2,840 in revenue.", ask: "A drop-yard move, or missing mileage?", options: ["Drop-yard move", "Missing miles"] },
    { text: "Truck 41 fueled in two states an hour apart.", ask: "Card used by someone else, or a wrong truck number?", options: ["Check the card", "Wrong truck"] },
    { text: "A delivery marked on time with no delivery scan.", ask: "Paper proof of delivery, or not delivered yet?", options: ["Paper proof", "Not delivered"] },
  ],
  "real-estate": [
    { text: "Unit 4B shows two active leases.", ask: "A renewal that overlaps, or an old lease left open?", options: ["Overlapping renewal", "Old lease open"] },
    { text: "A −$1,200 rent payment in October.", ask: "A real concession, or a reversed payment?", options: ["Real concession", "Reversed payment"] },
    { text: "A maintenance ticket closed with no cost on a roof job.", ask: "Covered by warranty, or the invoice is missing?", options: ["Warranty", "Invoice missing"] },
  ],
};
