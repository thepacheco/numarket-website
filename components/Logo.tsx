import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="numarket home">
      <span className="nu">nu</span>
      <span className="mk">market</span>
    </Link>
  );
}
