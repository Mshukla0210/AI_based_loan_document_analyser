import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Lenscore</strong>
        <p>Smart loan document analyzer with a premium AI product interface.</p>
      </div>
      <div className="footer-links">
        <Link href="/">Home</Link>
        <Link href="/how-it-works">How It Works</Link>
        <Link href="/analyzer">Analyzer</Link>
        <Link href="/case-study">Case Study</Link>
      </div>
    </footer>
  );
}
