'use client';

import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { User } from '@/types/user';
import { useForm } from 'react-hook-form';
import { createUser } from '@/repositories/users';
import { useRouter } from 'next/navigation';
import Button from '@/components/elements/Button';

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Omit<User, 'id'>>({
    defaultValues: {
      status: 'active',
      gender: 'default'
    }
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User created successfully');

      router.push('/login');
    }
  });

  const onSubmit = useCallback((data: Omit<User, 'id'>) => {
    if (data.gender === 'default') {
      setError('gender', {
        message: 'Gender is required'
      });
      return;
    }

    createUserMutation.mutate({
      ...data,
      status: 'active'
    })
  }, [createUserMutation, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <FormControl
          label="Name"
          htmlFor="name"
          isBlock
          isRequired
          error={errors.name?.message}
        >
          <TextInput
            isBlock
            id="name"
            placeholder="Your name"
            {...register('name', {
              required: 'Name is required',
            })}
          />
        </FormControl>

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

        <FormControl
          label="Gender"
          htmlFor="gender"
          isBlock
          isRequired
          error={errors.gender?.message}
        >
          <select
            className="select select-bordered w-full"
            {...register('gender', {
              required: 'Gender is required'
            })}
          >
            <option value="default">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </FormControl>
      </div>

      <Button
        type="submit"
        className="w-full mt-8"
        isLoading={createUserMutation.isLoading}
        loadingText="Creating user..."
      >
        Create
      </Button>
    </form>
  )
}

export default RegisterForm;
