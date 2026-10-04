import Icon from "./Icon";

/* The three places clients ask about, in the order data travels
   (Operating Decisions v2.2, §4). */
const layers = [
  {
    n: 1,
    icon: "plug",
    t: "Getting data out of your tools",
    lead: "You approve an official, read-only connection.",
    items: [
      "We use the connection your software already provides — the same kind of “Allow” screen as signing in with Google.",
      "You click “Allow” once. The connection can copy data out. It can't change anything in your system.",
      "Connection keys are stored encrypted, in a secure key store.",
      "Where a tool has no official connection, we use a read-only user or a scheduled export.",
    ],
  },
  {
    n: 2,
    icon: "lock",
    t: "Where your data lands",
    lead: "Your own private, encrypted database.",
    items: [
      "Every client gets a separate database account, with its own tables.",
      "Encrypted at rest and in transit.",
      "Health data runs on a higher-security, HIPAA-eligible edition.",
    ],
  },
  {
    n: 3,
    icon: "users",
    t: "Who can see it on our side",
    lead: "Only the analysts assigned to you.",
    items: [
      "Each analyst can reach only the client accounts they're assigned to.",
      "Multi-factor sign-in on every login, and every access is recorded.",
      "Client data stays on the platform, off laptops and personal devices.",
      "Access is removed the same day someone leaves a project.",
    ],
  },
];

export default function SecurityLayers() {
  return (
    <ol className="sl stagger">
      {layers.map((l) => (
        <li key={l.n} className="sl-card">
          <div className="sl-top">
            <span className="sl-n">Layer {l.n}</span>
            <span className="icon-badge" style={{ margin: 0 }}>
              <Icon name={l.icon} />
            </span>
          </div>
          <h3>{l.t}</h3>
          <p className="sl-lead">{l.lead}</p>
          <ul>
            {l.items.map((it) => (
              <li key={it}>
                <Icon name="check" width={16} height={16} />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
