/** biome-ignore-all lint/correctness/noChildrenProp: <required for Tanstack form> */
'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import { z } from 'zod';
import type { getProfile } from '@/app/_actions/get-profile';
import { updateProfile } from '@/app/_actions/update-profile';

const signUpSchema = z.object({
  gender: z.string().nonempty({ message: 'Please select your gender.' }),
  education: z
    .string()
    .nonempty({ message: 'Please enter your education qualification.' }),
  experience: z
    .string()
    .nonempty({ message: 'Please enter your past experience.' }),
  jobType: z.string().nonempty({ message: 'Please enter the type of job.' }),
  jobLevel: z.string().nonempty({ message: 'Please enter your job level.' }),
  interests: z.string().nonempty({ message: 'Please enter your interests.' }),
  skills: z.string().nonempty({ message: 'Please enter your skills.' }),
  passion: z.string().nonempty({ message: 'Please enter your passion.' }),
});

export function InformationForm({
  userId,
  profileData,
}: {
  userId: string;
  profileData: Awaited<ReturnType<typeof getProfile>>;
}) {
  const form = useForm({
    defaultValues: {
      gender: profileData.gender || '',
      education: profileData.education || '',
      experience: profileData.experience || '',
      jobType: profileData.jobType || '',
      jobLevel: profileData.jobLevel || '',
      interests: profileData.interests || '',
      skills: profileData.skills || '',
      passion: profileData.passion || '',
    },

    validators: {
      onChange: signUpSchema,
    },

    onSubmit: async ({ value }) => {
      // TODO: We might fail to save the data. Handle it later
      await updateProfile({
        id: userId,
        updatedData: value,
      });
    },
  });
  return (
    <form
      className="flex flex-col w-full gap-y-2 mt-3 text-sm"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="gender"
        children={(field) => (
          <>
            <input
              type="text"
              name="gender"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter your gender"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />

            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="education"
        children={(field) => (
          <>
            <input
              type="text"
              name="education"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Education qualification"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="experience"
        children={(field) => (
          <>
            <input
              type="text"
              name="experience"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Past experience"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="jobType"
        children={(field) => (
          <>
            <input
              type="text"
              name="jobType"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Type of Job"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="jobLevel"
        children={(field) => (
          <>
            <input
              type="text"
              name="jobLevel"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Level of job (Entry, Senior, Executive etc)"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="interests"
        children={(field) => (
          <>
            <input
              type="text"
              name="interests"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Interests"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="skills"
        children={(field) => (
          <>
            <input
              type="text"
              name="skills"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Skills"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Field
        name="passion"
        children={(field) => (
          <>
            <input
              type="text"
              name="passion"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Passion"
              className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-preply-green placeholder-neutral-400"
            />
            <ErrorInfo field={field} />
          </>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="bg-talgach-green py-1.5 px-3 rounded text-xs font-medium text-white hover:cursor-pointer select-none disabled:cursor-not-allowed disabled:bg-neutral-900"
          >
            {isSubmitting ? 'Saving...' : 'Save Information'}
          </button>
        )}
      </form.Subscribe>
    </form>
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
