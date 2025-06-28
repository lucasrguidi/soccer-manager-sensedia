'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const ALIASES: Record<string, string> = {
  users: 'Usuários',
};

function formatCrumbName(segment: string, idx: number, segments: string[]): string {
  if (ALIASES[segment]) {
    return ALIASES[segment];
  }

  if (segments[idx - 1] === 'users') {
    return 'Perfil de Usuário';
  }

  return segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = useMemo(
    () =>
      segments.map((segment, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/');
        const isLast = idx === segments.length - 1;
        const name = formatCrumbName(segment, idx, segments);
        return { name, href, isLast };
      }),
    [segments],
  );

  return (
    <div className="flex items-center text-base">
      <ChevronRight size={16} className="text-neutral-500" />
      <div className="flex items-center gap-2">
        {crumbs.map(({ name, href, isLast }) => (
          <span key={href} className="flex items-center gap-2 text-gray-900 font-medium">
            {isLast ? (
              <span>{name}</span>
            ) : (
              <>
                <Link href={href} className="hover:underline text-neutral-500">
                  {name}
                </Link>
                <span>/</span>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
