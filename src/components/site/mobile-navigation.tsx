import Link from "next/link";

import type { NavigationItem } from "@/content/editorial/home";

export function MobileNavigation({
  items,
  currentPath,
}: {
  items: readonly NavigationItem[];
  currentPath: string;
}) {
  return (
    <details className="sgs-mobile-nav">
      <summary>Menu</summary>
      <nav aria-label="Mobile primary">
        {items.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch={item.href === "/committee-questions/" ? false : undefined}
            aria-current={item.href === currentPath ? "page" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
