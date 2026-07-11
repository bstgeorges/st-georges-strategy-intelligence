import Link from "next/link";

export interface ContextNavigationItem {
  href: string;
  label: string;
  current?: boolean;
}

export function ContextNavigation({
  label,
  items,
}: {
  label: string;
  items: readonly ContextNavigationItem[];
}) {
  return (
    <nav className="sgs-context-nav" aria-label={label}>
      <span>{label}</span>
      <ol>
        {items.map((item) => (
          <li key={`${item.href}:${item.label}`}>
            <Link href={item.href} aria-current={item.current ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
