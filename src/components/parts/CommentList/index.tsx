'use client';

import { useMemo } from 'react';

import { getHeadersValue } from '@/lib/common';
import CardComment from '../CardComment';
import Pagination from '../Pagination';
import { CommentListProps } from './types';
import Text from '@/components/elements/Text';
import Link from 'next/link';
import CommentForm from '../CommentForm';
import { getCookie } from 'cookies-next';
import useLogged from '@/lib/hooks/useLogged';

const CommentList: React.FC<CommentListProps> = ({
  comments,
  headers,
  onChangePage
}) => {
  const { isLoading, user } = useLogged();

  return (
    <div>
      <Text as="h2" typography="h3" className="mt-5 mb-3">Comments</Text>

      {!isLoading && user ? (
        <CommentForm className="mb-2" />
      ) : null}

      <section className="flex flex-col gap-1">
        {comments.length > 0 ? (
          <>
            {comments.map((comment, index) => (
              <div key={comment.id}>
                {index !== 0 ? <div className="divider" /> : null}
                <CardComment {...comment} />
              </div>
            ))}

            <div className="flex justify-center">
              <Pagination
                currentPage={+(getHeadersValue(headers, 'x-pagination-page') as string)}
                onChangePage={onChangePage}
                onNextPage={() => onChangePage(+(getHeadersValue(headers, 'x-pagination-page') as string) + 1)}
                onPrevPage={() => onChangePage(+(getHeadersValue(headers, 'x-pagination-page') as string) - 1)}
                onFirstPage={() => onChangePage(1)}
                onLastPage={() => onChangePage(+(getHeadersValue(headers, 'x-pagination-pages') as string))}
                maxPage={+(getHeadersValue(headers, 'x-pagination-pages') as string)}
                className="mt-5"
              />
            </div>
          </>
        ) : (
          <Text>No comments.{!user && !isLoading ? (
            <Text as="span">Login for comment at <Link href="/login" className="link">here</Link></Text>
          ) : null}</Text>
        )}
      </section>
    </div>
  )
}

export default CommentList;
