import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex items-center space-x-4 border-b p-4">
      <Link href="/" className="text-sm font-medium hover:text-primary">
        Home
      </Link>
      <Link
        href="/extensions"
        className="text-sm font-medium hover:text-primary"
      >
        Extensions
      </Link>
    </nav>
  );
}
