import { Post } from '@/types/post';

export type BlogListProps = {
  blogs: Post[];
  onChangePage: (page: number) => void;
  headers: string[][];
};
