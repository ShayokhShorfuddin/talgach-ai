/** biome-ignore-all lint/correctness/noChildrenProp: <required for Tanstack form> */
'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { createProfile } from '@/app/_actions/create-profile';
import { authClient } from '@/lib/auth-client';
import logo from '@/public/svgs/logo-green.svg';
import getAuthErrorMessage from '@/utils/auth-error-messages';

const signUpSchema = z
  .object({
    first_name: z
      .string()
      .max(40, { message: 'Name cannot be longer than 40 characters.' })
      .nonempty({ message: 'Please enter your name.' }),
    last_name: z
      .string()
      .max(40, { message: 'Name cannot be longer than 40 characters.' })
      .nonempty({ message: 'Please enter your name.' }),
    email: z
      .email({ message: 'Please enter a valid email address.' })
      .max(40, { message: 'Email cannot be longer than 40 characters.' })
      .nonempty({ message: 'Please enter your email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .max(30, { message: 'Password should not be longer than 30 characters.' })
      .nonempty({ message: 'Please enter a password.' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        'Ensure at least one uppercase letter, one lowercase letter, and a number in your password.',
      ),
    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your password.' })
      .max(30, {
        message: 'Confirmation password cannot be longer than 30 characters.',
      })
      .nonempty({ message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export function SignUp() {
  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');
  const form = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validators: {
      onChange: signUpSchema,
    },

    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signUp.email({
        name: `${value.first_name} ${value.last_name}`,
        email: value.email,
        password: value.password,
      });

      // If there was an error
      if (error) {
        if (error?.code) {
          setAuthErrorMessage(getAuthErrorMessage(error?.code));
          return;
        }

        // An error occurred but there is no code? This could be due to change in better-auth library. For this situation, we will be returning a generic error message and call sentry

        setAuthErrorMessage(
          'We have encountered a strange error. Please try again later.',
        );
        return;
      }

      // User has been signed up and now we create their default profile, which they later edit from their profile form.
      await createProfile({
        id: data.user.id,
        firstName: value.first_name,
        lastName: value.last_name,
      });

      // If no error, redirect to dashboard
      redirect('/dashboard');
    },
  });
  return (
    <section className="flex flex-col items-center justify-center h-svh font-sans">
      <div className="flex flex-col items-center max-w-60">
        <Image src={logo} alt="icon" className="h-20 xs:h-25 md:h-30" />

        <p className="text-sm sm:text-base text-neutral-800 mt-3">
          Let's create your account.
        </p>
        {/* 
        <form className="w-full">
          <button
            type="button"
            className="flex gap-x-3 justify-center items-center text-nowrap w-full border border-preply-green text-neutral-800 font-medium mt-6 py-2 rounded-sm hover:cursor-pointer select-none"
          >
            <Image src={google} alt="icon" className="size-5" />
            <span className="text-sm">Continue with Google</span>
          </button>
        </form>

        <div className="flex items-center gap-x-3 w-full mt-3">
          <div className="h-[0.5px] w-full bg-neutral-200" />
          <p className="text-neutral-800 text-sm text-nowrap">or use email</p>
          <div className="h-[0.5px] w-full bg-neutral-200" />
        </div> */}

        <form
          className="flex flex-col w-full gap-y-2 mt-3 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="first_name"
            children={(field) => (
              <>
                <input
                  type="text"
                  name="first_name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="First Name (e.g., John)"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="last_name"
            children={(field) => (
              <>
                <input
                  type="text"
                  name="last_name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Last Name (e.g., Doe)"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="email"
            children={(field) => (
              <>
                <input
                  type="text"
                  name="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="john@example.com"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <>
                <input
                  type="password"
                  name="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Create a password"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="confirmPassword"
            children={(field) => (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Confirm your password"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
                />

                <ErrorInfo field={field} />

                {/* Auth error */}
                {authErrorMessage !== '' ? (
                  <p className="text-red-500 text-sm">{authErrorMessage}</p>
                ) : null}
              </>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isValidating]}
          >
            {([canSubmit, isValidating]) => (
              <button
                type="submit"
                disabled={!canSubmit || isValidating}
                className="px-3 py-2 hover:cursor-pointer bg-neutral-800 rounded-lg text-sm text-neutral-200 font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:bg-neutral-900"
              >
                {isValidating ? 'Hashing...' : 'Sign up'}
              </button>
            )}
          </form.Subscribe>
        </form>

        <p className="text-sm text-nowrap mt-4">
          Already have an account?{' '}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

function ErrorInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched &&
      !field.state.meta.isValid &&
      field.state.meta.errors.length > 0 ? (
        <p className="text-red-500 text-sm">
          {field.state.meta.errors[0].message}
        </p>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}
