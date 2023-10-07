'use client';

import { useMemo } from 'react';

import {
  BiChevronsLeft,
  BiChevronLeft,
  BiChevronsRight,
  BiChevronRight
} from "react-icons/bi";
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';

import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({
  maxPage,
  currentPage = 1,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
  onChangePage,
  className
}) => {
  const buttonClassName = useMemo(
    () => 'hover:border-white hover:bg-gray-100 join-item',
    []
  );

  return (
    <div className={twMerge('join', className)}>
      <Button
        title="To first page"
        className={buttonClassName}
        onClick={onFirstPage}
        disabled={currentPage === 1}
      >
        <BiChevronsLeft />
      </Button>
      <Button
        title="To previous page"
        className={buttonClassName}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        <BiChevronLeft />
      </Button>

      <select
        className="select join-item select-bordered w-full max-w-xs border-none"
        value={currentPage}
        onChange={(e) => onChangePage(+e.target.value)}
        title="Current page"
      >
        {Array.from({ length: maxPage }, (_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>

      <Button
        title="To next page"
        className={buttonClassName}
        onClick={onNextPage}
        disabled={currentPage >= maxPage}
      >
        <BiChevronRight />
      </Button>
      <Button
        title="To last page"
        className={buttonClassName}
        onClick={onLastPage}
        disabled={currentPage >= maxPage}
      >
        <BiChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
