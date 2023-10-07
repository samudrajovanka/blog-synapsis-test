import { dehydrate, Hydrate } from '@tanstack/react-query';

import BlogDetail from '@/components/pages/BlogDetail';
import { getQueryClient } from '@/lib/queryClient';
import { getPostCommentsKey, getPostKey } from '@/queries/posts';
import { getPost, getPostComments } from '@/repositories/posts';
import { SearchParams } from '@/types/page';
import { isNumberString } from '@/lib/common';
import { getUserKey } from '@/queries/users';
import { getUser } from '@/repositories/users';

const BlogDetailPage = async ({ params, searchParams }: {
  params: { id: number },
  searchParams: SearchParams
}) => {
  const post = await getPost(params.id);

  const queryClient = getQueryClient();

  await queryClient.setQueryData(getPostKey(+params.id), post);
  await queryClient.prefetchQuery(getUserKey(post.data.user_id), () => getUser(post.data.user_id));

  const commentFilters = {
    page: searchParams?.commentPage
      ? isNumberString(searchParams.commentPage) ? +searchParams.commentPage : 1
      : 1,
  };

  await queryClient.prefetchQuery(
    getPostCommentsKey(+params.id, { filters: commentFilters }),
    () => getPostComments(+params.id, commentFilters)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <BlogDetail />
    </Hydrate>
  )
}

export default BlogDetailPage;
