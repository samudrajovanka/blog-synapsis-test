import { dehydrate, Hydrate } from '@tanstack/react-query';

import Blogs from '@/components/pages/Blogs';
import { getQueryClient } from '@/lib/queryClient';
import { getPostsKey } from '@/queries/posts';
import { getPosts } from '@/repositories/posts';
import { SearchParams } from '@/types/page';
import { isNumberString } from '@/lib/common';

const BlogsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const queryClient = getQueryClient();

  const filters = {
    page: searchParams?.page
      ? isNumberString(searchParams.page) ? +searchParams.page : 1
      : 1,
  };

  await queryClient.prefetchQuery(getPostsKey({ filters }), () => getPosts(filters));

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Blogs />
    </Hydrate>
  );
};

export default BlogsPage;
