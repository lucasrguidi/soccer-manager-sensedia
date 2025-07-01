import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
};

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
}: PaginatorProps) {
  const siblings = 1;
  const pageItems: (number | '...')[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - siblings && i <= currentPage + siblings)
    ) {
      pageItems.push(i);
    } else if (pageItems[pageItems.length - 1] !== '...') {
      pageItems.push('...');
    }
  }

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => canPrev && onPageChange(currentPage - 1)}
              disabled={!canPrev}
              className={cn(!canPrev && 'pointer-events-none opacity-50 cursor-not-allowed')}
            />
          </PaginationItem>
        )}

        {pageItems.map((item, idx) =>
          item === '...' ? (
            <PaginationEllipsis key={`ellipsis-${idx}`} />
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => item !== currentPage && onPageChange(item)}
                isActive={item === currentPage}
                disabled={item === currentPage}
                className={cn(
                  item === currentPage && 'pointer-events-none opacity-50 cursor-not-allowed',
                )}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {showPreviousNext && (
          <PaginationItem>
            <PaginationNext
              onClick={() => canNext && onPageChange(currentPage + 1)}
              disabled={!canNext}
              className={cn(!canNext && 'pointer-events-none opacity-50 cursor-not-allowed')}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
