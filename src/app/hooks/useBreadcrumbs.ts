'use client';

import { usePathname } from 'next/navigation';

type AliasMap = Record<string, string>;

export function useBreadcrumbs(dynamicAliases?: AliasMap) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    const name =
      dynamicAliases?.[segment] ??
      DEFAULT_ALIAS_MAP[segment] ??
      segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    return { name, href, isLast };
  });

  return breadcrumbs;
}

const DEFAULT_ALIAS_MAP: Record<string, string> = {
  users: 'Usuários',
  admin: 'Administração',
  dashboard: 'Painel',
};
