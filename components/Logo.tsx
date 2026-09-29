import Link from "next/link";
import { NuLetters } from "./NuMark";

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="numarket home">
      <NuLetters className="nu-svg" />
      <span className="mk">market</span>
    </Link>
  );
}
