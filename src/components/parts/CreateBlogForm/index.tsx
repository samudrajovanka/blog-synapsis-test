'use client';

import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { User } from '@/types/user';
import { useForm } from 'react-hook-form';
import { createUser, getUsers } from '@/repositories/users';
import { useRouter } from 'next/navigation';
import Button from '@/components/elements/Button';
import { useUsers } from '@/queries/users';
import { setCookie } from 'cookies-next';
import { Post } from '@/types/post';
import { createBlog } from '@/repositories/posts';
import useLogged from '@/lib/hooks/useLogged';
import { getPostsKey } from '@/queries/posts';
import Textarea from '@/components/elements/Textarea';

const CreateBlogForm = () => {
  const router = useRouter();
  const { user } = useLogged();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<Pick<Post, 'title' | 'body'>>();

  const createBlogMutation = useMutation({
    mutationFn: (data: Pick<Post, 'title' | 'body'>) => (
      createBlog(user?.id as number, data)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(getPostsKey({
        filters: {
          user_id: user?.id as number
        }
      }));

      toast.success('Blog created successfully');

      router.push('/blogs/my');
    }
  });

  const onSubmit = useCallback(async (data: Pick<Post, 'title' | 'body'>) => {
    createBlogMutation.mutate(data);
  }, [createBlogMutation]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <FormControl
          label="Title"
          htmlFor="title"
          isBlock
          isRequired
          error={errors.title?.message}
        >
          <TextInput
            isBlock
            id="title"
            placeholder="Blog title"
            {...register('title', {
              required: 'Title is required',
            })}
          />
        </FormControl>
        <FormControl
          label="Body"
          htmlFor="body"
          isBlock
          isRequired
          error={errors.body?.message}
        >
          <Textarea
            isBlock
            id="body"
            placeholder="Blog body"
            {...register('body', {
              required: 'Body is required',
            })}
          />
        </FormControl>
      </div>

      <Button
        type="submit"
        className="w-full mt-8"
        isLoading={createBlogMutation.isLoading}
        loadingText="Submitting..."
      >
        Create
      </Button>
    </form>
  )
}

export default CreateBlogForm;
