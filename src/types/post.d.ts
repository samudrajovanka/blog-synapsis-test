import { User } from './user';

export type Post = {
  id: number;
  user_id: number; 
  title: string;
  body: string;
};

export type Comment = Pick<User, 'name' | 'email'> & {
  id: number;
  post_id: number;
  body: string;
};
