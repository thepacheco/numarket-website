/* The people who use numarket — illustrated, not real customers. */

const people = [
  { role: "Owner", sees: "Cash, jobs, and three action items — on a phone, Monday morning.", c: ["#22577a", "#9fd3e6"] },
  { role: "Operations lead", sees: "Every site live. Problems flagged before they spread.", c: ["#2a8f91", "#b8ecec"] },
  { role: "Finance lead", sees: "Numbers that match the books, without rebuilding reports.", c: ["#6c5dd3", "#d9d3fb"] },
  { role: "Field team", sees: "One simple screen to enter today's update. That's it.", c: ["#2e9e6b", "#c7f9cc"] },
];

function Avatar({ c, i }: { c: string[]; i: number }) {
  const hair = ["M16 22c0-10 8-15 16-15s16 5 16 15c-4-4-9-6-16-6s-12 2-16 6z", "M15 24c0-12 9-17 17-17 9 0 17 6 17 17-3-2-6-3-9-3-5 0-8-4-8-4s-3 4-8 4c-4 0-6 1-9 3z", "M17 20c2-8 8-12 15-12s13 4 15 12c-5-3-10-4-15-4s-10 1-15 4z", "M16 23c0-11 7-16 16-16 8 0 16 5 16 16-2-3-5-5-9-5H25c-4 0-7 2-9 5z"][i % 4];
  return (
    <svg className="avatar" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={c[1]} />
      <path d="M12 62c2-12 10-18 20-18s18 6 20 18" fill={c[0]} />
      <circle cx="32" cy="26" r="12" fill="#f3d9c6" />
      <path d={hair} fill="#243746" />
    </svg>
  );
}

export default function Roles() {
  return (
    <div className="roles stagger">
      {people.map((p, i) => (
        <div className="role" key={p.role}>
          <Avatar c={p.c} i={i} />
          <b>{p.role}</b>
          <span>{p.sees}</span>
        </div>
      ))}
    </div>
  );
}
