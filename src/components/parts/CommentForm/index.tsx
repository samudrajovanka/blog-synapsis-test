'use client';

import { useMemo, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Comment } from '@/types/post';
import { useForm } from 'react-hook-form';
import Button from '@/components/elements/Button';
import { getCookie } from '@/lib/cookies';
import { CommentFormProps } from './types';
import { twMerge } from 'tailwind-merge';
import useLogged from '@/lib/hooks/useLogged';
import { addComment } from '@/repositories/posts';
import { useParams, useRouter } from 'next/navigation';
import { getPostCommentsKey } from '@/queries/posts';
import FormControl from '@/components/elements/FormControl';
import Textarea from '@/components/elements/Textarea';

const CommentForm: React.FC<CommentFormProps> = ({ className }) => {
  const { user } = useLogged();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<Comment, 'body'>>();

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      reset();

      toast.success('Comment added successfully');

      queryClient.invalidateQueries(getPostCommentsKey(params.id));
      router.refresh();
    }
  });

  const onSubmit = useCallback((data) => {
    addCommentMutation.mutate({
      body: data.body,
      postId: params.id,
      user: {
        email: user?.email,
        name: user?.name,
      }
    });
  }, [addCommentMutation, params.id, user?.email, user?.name]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge('flex flex-col gap-3', className)}
    >
      <FormControl
        isBlock
        error={errors.body?.message}
      >
        <Textarea
          isBlock
          placeholder="Write your comment..."
          className="flex-1"
          {...register('body', {
            required: 'Comment is required'
          })}
        />
      </FormControl>

      <Button
        type="submit"
        isLoading={addCommentMutation.isLoading}
        loadingText="Submitting..."
        className="self-end"
      >
        Submit
      </Button>
    </form>
  )
}

export default CommentForm;
