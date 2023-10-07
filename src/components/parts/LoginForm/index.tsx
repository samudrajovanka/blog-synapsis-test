'use client';

import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'
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

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<Pick<User, 'email'>>();

  const { data: usersData, isFetching: isUsersFetching } = useUsers({
    queryOptions: {
      enabled: isSubmitted && !errors.email,
      onSuccess: ({ data }) => {
        if (data.length === 0) {
          toast.error('User not found');
          return;
        }

        setCookie('user', JSON.stringify(data[0]), {
          maxAge: 60 * 60 * 24 * 7,
        });

        router.replace('/');
        router.refresh();
      }
    },
    filters: {
      email: watch('email')
    }
  });

  const onSubmit = useCallback(async (data) => {}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="Email"
        htmlFor="email"
        isBlock
        isRequired
        error={errors.email?.message}
      >
        <TextInput
          type="email"
          isBlock
          id="email"
          placeholder="Your email"
          {...register('email', {
            required: 'Email is required',
          })}
        />
      </FormControl>

      <Button
        type="submit"
        className="w-full mt-8"
        isLoading={isUsersFetching}
        loadingText="Getting user..."
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm;
