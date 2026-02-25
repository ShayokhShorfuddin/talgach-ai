/** biome-ignore-all lint/correctness/noChildrenProp: <required for Tanstack form> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <> */

'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createJobForJobSeeker } from '@/app/_actions/create-job-for-job-seeker';
import { authClient } from '@/lib/auth-client';

const jobSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  maximumAgeLimit: z.number().min(1, 'Maximum age limit is required'),
  experienceRequirement: z
    .string()
    .min(1, 'Experience requirement is required'),
  skills: z.array(
    z.object({
      name: z.string().min(1, 'Skill name is required'),
    }),
  ),
  proficiency: z.string().min(1, 'Proficiency is required'),
  employmentStatus: z.enum(
    ['Full time', 'Part time'],
    'Employment status is required',
  ),
  otherKnowledge: z.string(),
  responsibilities: z.string().min(1, 'Responsibilities are required'),
  salaryAndBenefits: z.string().min(1, 'Salary and benefits are required'),
});

export default function Add() {
  const jobSeekerId = authClient.useSession().data?.user.id as string;

  const form = useForm({
    defaultValues: {
      companyName: '',
      position: '',
      deadline: '',
      maximumAgeLimit: 18,
      experienceRequirement: '',
      skills: [] as { name: string }[],
      proficiency: '',
      employmentStatus: 'Full time' as 'Full time' | 'Part time',
      otherKnowledge: '',
      responsibilities: '',
      salaryAndBenefits: '',
    },
    validators: {
      onChange: jobSchema,
    },
    onSubmit: async ({ value }) => {
      await createJobForJobSeeker({ jobSeekerId, jobData: value });
      redirect('/dashboard/job-seeker/jobs');
    },
  });

  return (
    <div className="flex justify-center w-full">
      <form
        className="flex flex-col w-full gap-y-8 mt-3 text-sm pb-20 max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-y-6 p-6 border border-neutral-200 rounded-xl bg-white">
          <h2 className="text-xl font-semibold text-neutral-800 pb-2">
            Job Details
          </h2>

          {/* Company Name */}
          <form.Field
            name="companyName"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Pran RFL Group"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Position */}
          <form.Field
            name="position"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">Position</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Deadline */}
          <form.Field
            name="deadline"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">Deadline</label>
                <input
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Maximum Age Limit */}
          <form.Field
            name="maximumAgeLimit"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Maximum Age Limit
                </label>
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="e.g. 30"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Experience Requirement */}
          <form.Field
            name="experienceRequirement"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Experience Requirement
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. 3+ years of experience with React"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Skills Required */}
          <form.Field
            name="skills"
            mode="array"
            children={(field) => (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-neutral-700">
                    Skills Required
                  </label>
                  <button
                    type="button"
                    onClick={() => field.pushValue({ name: '' })}
                    className="text-xs flex items-center gap-1 text-talgach-green font-medium hover:cursor-pointer"
                  >
                    + Add Skill
                  </button>
                </div>

                {field.state.value.length === 0 && (
                  <p className="text-neutral-400 text-xs italic">
                    No skills added.
                  </p>
                )}

                {field.state.value.map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <form.Field
                      name={`skills[${i}].name`}
                      children={(subField) => (
                        <input
                          type="text"
                          value={subField.state.value}
                          onChange={(e) =>
                            subField.handleChange(e.target.value)
                          }
                          placeholder="e.g. React"
                          className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => field.removeValue(i)}
                      className="text-red-500 hover:text-red-700 p-2 text-xs"
                      title="Remove"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          />

          {/* Proficiency */}
          <form.Field
            name="proficiency"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Proficiency
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Intermediate / Advanced"
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Employment Status */}
          <form.Field
            name="employmentStatus"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Employment Status
                </label>
                <div className="flex gap-2">
                  {(['Full time', 'Part time'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => field.handleChange(status)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        field.state.value === status
                          ? 'bg-neutral-800 text-white border-neutral-800'
                          : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Any other knowledge */}
          <form.Field
            name="otherKnowledge"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Any other knowledge
                </label>
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Additional knowledge or requirements..."
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400 min-h-[100px]"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Responsibilities */}
          <form.Field
            name="responsibilities"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Responsibilities
                </label>
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Job responsibilities..."
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400 min-h-[100px]"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />

          {/* Salary and benefits */}
          <form.Field
            name="salaryAndBenefits"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Salary and Benefits
                </label>
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Salary range and benefits..."
                  className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400 min-h-[100px]"
                />
                <ErrorInfo field={field} />
              </div>
            )}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="bg-talgach-green py-2 px-6 rounded-lg text-sm font-medium text-white hover:cursor-pointer select-none disabled:cursor-not-allowed disabled:bg-neutral-400 w-fit self-end shadow-sm hover:shadow-md transition-all"
            >
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

function ErrorInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched &&
      !field.state.meta.isValid &&
      field.state.meta.errors.length > 0 ? (
        <p className="text-red-500 text-xs mt-1">
          {field.state.meta.errors[0].message}
        </p>
      ) : null}
    </>
  );
}
