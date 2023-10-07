import React from 'react'
import CardBlog from '@/components/parts/CardBlog';
import Pagination from '@/components/parts/Pagination';
import { BlogListProps } from './types';
import { getHeadersValue } from '@/lib/common';
import Text from '@/components/elements/Text';

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  headers,
  onChangePage
}) => {
  return (
    <div className="mt-5">
      {blogs.length > 0 ? (
        <>
          <section className="grid md:grid-cols-2 gap-3">
            {blogs.map((post) => (
              <CardBlog key={post.id} {...post} />
            ))}
          </section>

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
        <Text>No blogs at here</Text>
      )}
    </div>
  )
}

export default BlogList;
