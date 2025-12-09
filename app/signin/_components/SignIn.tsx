/** biome-ignore-all lint/correctness/noChildrenProp: <needed for Tanstack form> */
'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { authClient } from '@/lib/auth-client';

// import { signInUser } from "@/app/actions/signin";
import eye from '@/public/svgs/eye.svg';
import eye_closed from '@/public/svgs/eye-closed.svg';
import logo from '@/public/svgs/logo-green.svg';
import getAuthErrorMessage from '@/utils/auth-error-messages';

const signInSchema = z.object({
  email: z
    .email({ message: 'Please enter a valid email address.' })
    .max(40, { message: 'Email cannot be longer than 40 characters.' })
    .nonempty({ message: 'Please enter your email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(30, { message: 'Password should not be longer than 30 characters.' })
    .nonempty({ message: 'Please enter a password.' }),
});

export default function SignIn() {
  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    validators: {
      onChange: signInSchema,
    },

    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (error) {
        if (error?.code) {
          setAuthErrorMessage(getAuthErrorMessage(error?.code));
          return;
        }

        // An error occurred but there is no code? This could be due to change in better-auth library. For this situation, we will be returning a generic error message and call sentry

        // TODO: call sentry
        setAuthErrorMessage(
          'We have encountered a strange error. Please try again later.',
        );
        return;
      }

      redirect('/dashboard');
    },
  });

  return (
    <section className="flex flex-col items-center justify-center h-svh font-sans">
      <div className="flex flex-col items-center max-w-60">
        <Image src={logo} alt="icon" className="h-20 xs:h-25 md:h-30" />

        <p className="text-sm sm:text-base text-neutral-800 mt-3">
          Log into your account.
        </p>

        {/* <form className="w-full">
          <button
            type="button"
            className="flex gap-x-3 justify-center items-center text-nowrap w-full border border-preply-green text-neutral-800 font-medium mt-6 py-2 rounded-sm hover:cursor-pointer select-none"
          >
            <Image src={Google} alt="icon" className="size-5" />
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
            name="email"
            children={(field) => (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
                />

                <ErrorInfo field={field} />
              </>
            )}
          />

          <form.Field
            name="password"
            children={(field) => {
              return (
                <PasswordField
                  field={field}
                  authErrorMessage={authErrorMessage}
                  setAuthErrorMessage={setAuthErrorMessage}
                />
              );
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="px-3 py-2 hover:cursor-pointer bg-neutral-800 rounded-lg text-sm text-neutral-200 font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:bg-neutral-900"
              >
                {isSubmitting ? 'Hashing...' : 'Sign in'}
              </button>
            )}
          />
        </form>

        <p className="text-sm text-nowrap mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

function PasswordField({
  field,
  authErrorMessage,
  setAuthErrorMessage,
}: {
  field: AnyFieldApi;
  authErrorMessage: string;
  setAuthErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="w-full flex">
        <input
          autoComplete="off"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          value={field.state.value}
          onChange={(e) => {
            // Reset auth error message on change
            setAuthErrorMessage('');

            // Let Tanstack form handle the change
            field.handleChange(e.target.value);
          }}
          className="px-4 py-2 rounded-l-lg border border-neutral-300 focus:outline-none focus:border-preply-green w-full"
        />

        <button
          type="button"
          className="p-2 border border-l-0 border-neutral-300 rounded-r-lg hover:cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Image src={eye_closed} alt="Hide password" className="size-4.5" />
          ) : (
            <Image src={eye} alt="Show password" className="size-4.5" />
          )}

          {showPassword ? (
            <span className="sr-only">Hide password</span>
          ) : (
            <span className="sr-only">Show password</span>
          )}
        </button>
      </div>

      <ErrorInfo field={field} />

      {/* Auth error */}
      {authErrorMessage !== '' ? (
        <p className="text-red-500 text-sm">{authErrorMessage}</p>
      ) : null}
    </>
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
