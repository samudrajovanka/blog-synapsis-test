'use client';

import { useCallback, useMemo } from 'react'

import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import CardBlog from '@/components/parts/CardBlog';
import Pagination from '@/components/parts/Pagination';
import { getHeadersValue, isNumberString } from '@/lib/common';
import { usePosts } from '@/queries/posts';
import { useRouter, useSearchParams } from 'next/navigation';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import BlogList from '@/components/parts/BlogList';
import { Post } from '@/types/post';

const Blogs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: postsData } = usePosts({
    filters: {
      page: searchParams.get('page')
        ? isNumberString(searchParams.get('page')) ? +(searchParams.get('page') as string) : 1
        : 1
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
      <Text as="h1" typography="h2">Blogs</Text>

      <BlogList
        blogs={postsData?.data as Post[]}
        headers={headers as unknown as string[][]}
        onChangePage={handleChagePage}
      />
    </Container>
  )
}

export default Blogs;
