'use client';

import { useCallback, useMemo, useEffect, useState } from 'react'

import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import CardBlog from '@/components/parts/CardBlog';
import Pagination from '@/components/parts/Pagination';
import { getHeadersValue, isNumberString } from '@/lib/common';
import { usePosts } from '@/queries/posts';
import { useRouter, useSearchParams } from 'next/navigation';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import BlogList from '@/components/parts/BlogList';
import useLogged from '@/lib/hooks/useLogged';
import { parseURL } from '@/lib/fetcher';
import { Post } from '@/types/post';

const MyBlogs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading } = useLogged();

  const {
    data: postsData,
    isLoading: isPostLoading,
    isFetching: isPostsFetching,
    isSuccess: isPostsSuccess,
  } = usePosts({
    filters: {
      page: searchParams.get('page')
        ? isNumberString(searchParams.get('page')) ? +(searchParams.get('page') as string) : 1
        : 1,
      user_id: user?.id
    },
    queryOptions: {
      enabled: !isLoading && !!user?.id,
    }
  });

  const headers = useMemo(() => postsData?.response.headers, [postsData]);

  const handleChagePage = useCallback((page: number) => {
    const newParamsRemoved = removeSearchParams(searchParams, ['page']);
    const newParams = combineSearchParams(newParamsRemoved, { page });
    
    router.replace(`?${newParams.toString()}`)
  }, [searchParams, router]);

  return (
    <Container as="main" className="my-8">
      <Text as="h1" typography="h2">MyBlogs</Text>

      {isPostsFetching || isPostLoading ? (
        <Text className="mt-5">Getting your posts...</Text>
      ) : null}

      {isPostsSuccess ? (
        <BlogList
          blogs={postsData?.data as Post[]}
          headers={[
            ['x-pagination-page', !Array.isArray(headers) ? headers?.get('x-pagination-page') as string : '0'],
            ['x-pagination-pages', !Array.isArray(headers) ? headers?.get('x-pagination-pages') as string : '0'],
          ]}
          onChangePage={handleChagePage}
        />
      ) : null}
    </Container>
  )
}

export default MyBlogs;
