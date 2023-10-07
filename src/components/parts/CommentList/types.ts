import { Comment } from '@/types/post';

export type CommentListProps = {
  comments: Comment[];
  onChangePage: (page: number) => void;
  headers: string[][];
};
