'use client';

import { useCallback, useMemo } from 'react'

import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import CommentList from '@/components/parts/CommentList';
import { usePost, usePostComments } from '@/queries/posts';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { isNumberString } from '@/lib/common';
import { useUser } from '@/queries/users';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { Comment } from '@/types/post';

const BlogDetail = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { data: postData } = usePost(+(params.id as string));
  const { data: userData } = useUser(postData?.data.user_id as number, {
    queryOptions: {
      enabled: !!postData?.data.user_id
    }
  });
  const { data: commentsData } = usePostComments(+(params.id as string), {
    filters: {
      page: searchParams.get('commentPage')
        ? isNumberString(searchParams.get('commentPage')) ? +(searchParams.get('commentPage') as string) : 1
        : 1
    }
  });

  const headers = useMemo(() => commentsData?.response.headers, [commentsData]);

  const handleChagePage = useCallback((page: number) => {
    const newParamsRemoved = removeSearchParams(searchParams, ['commentPage']);
    const newParams = combineSearchParams(newParamsRemoved, { commentPage: page });
    
    router.replace(`?${newParams.toString()}`)
  }, [searchParams, router]);

  return (
    <Container as="main" className="my-8">
      <div>
        <Text as="h1" typography="h2">{postData?.data.title}</Text>
        <Text typography="xs">{userData?.data.name}</Text>
      </div>

      <Text className="mt-3">{postData?.data.body}</Text>

      <CommentList
        comments={commentsData?.data as Comment[]}
        headers={headers as unknown as string[][]}
        onChangePage={handleChagePage}
      />
    </Container>
  )
}

export default BlogDetail;
