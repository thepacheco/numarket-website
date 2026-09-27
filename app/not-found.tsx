import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow">404</span>
        <h1 style={{ margin: "16px 0" }}>This page isn&apos;t here.</h1>
        <p className="lead" style={{ margin: "0 auto 28px" }}>
          The numbers usually are, though.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
