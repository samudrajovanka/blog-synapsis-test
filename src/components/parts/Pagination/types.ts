export type PaginationProps = {
  maxPage: number;
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onChangePage: (page: number) => void;
  className?: string;
};
