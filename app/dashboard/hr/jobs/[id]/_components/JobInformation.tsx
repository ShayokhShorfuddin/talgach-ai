/** biome-ignore-all lint/correctness/noChildrenProp: <required for Tanstack form> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <> */

'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { getJobForHRFromId } from '@/app/_actions/get-job-for-hr-from-id';
import { updateJobForHR } from '@/app/_actions/update-job-for-hr';

const jobSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  ageLimit: z.number().min(1, 'Age limit is required'),
  experienceRequirement: z
    .string()
    .min(1, 'Experience requirement is required'),
  skills: z.array(
    z.object({
      name: z.string().min(1, 'Skill name is required'),
    }),
  ),
  proficiency: z.string().min(1, 'Proficiency is required'),
  employmentStatus: z.enum(['Full time', 'Part time']),
  otherKnowledge: z.string(),
  responsibilities: z.string().min(1, 'Responsibilities are required'),
  salaryAndBenefits: z.string().min(1, 'Salary and benefits are required'),
});

type Candidate = {
  rank: number;
  name: string;
  eligibility: number;
  shortlisted: boolean;
};

const DUMMY_CANDIDATES: Candidate[] = [
  { rank: 1, name: 'Sarah Thompson', eligibility: 94, shortlisted: false },
  { rank: 2, name: 'Michael Chen', eligibility: 87, shortlisted: false },
  { rank: 3, name: 'Aisha Rahman', eligibility: 78, shortlisted: false },
  { rank: 4, name: 'James Wilson', eligibility: 65, shortlisted: false },
  { rank: 5, name: 'Emily Rodriguez', eligibility: 52, shortlisted: false },
];

export function JobInformation({ jobId }: { jobId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showCandidates, setShowCandidates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      position: '',
      deadline: '',
      ageLimit: 18,
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
      await updateJobForHR(value, jobId);
    },
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getJobForHRFromId({ id: jobId });
      if (data) {
        form.setFieldValue('position', data.position);
        form.setFieldValue(
          'deadline',
          data.deadline.toISOString().split('T')[0],
        );
        form.setFieldValue('ageLimit', data.ageLimit);
        form.setFieldValue('experienceRequirement', data.experienceRequirement);
        form.setFieldValue('skills', data.skills || []);
        form.setFieldValue('proficiency', data.proficiency);
        form.setFieldValue(
          'employmentStatus',
          data.employmentStatus as 'Full time' | 'Part time',
        );
        form.setFieldValue('otherKnowledge', data.otherKnowledge || '');
        form.setFieldValue('responsibilities', data.responsibilities);
        form.setFieldValue('salaryAndBenefits', data.salaryAndBenefits);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [jobId, form]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Initialize candidates with dummy data
      setCandidates([...DUMMY_CANDIDATES]);
      setShowCandidates(true);
    }
  };

  const handleEvaluateCVs = () => {
    fileInputRef.current?.click();
  };

  const toggleShortlist = (rank: number) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.rank === rank
          ? { ...candidate, shortlisted: !candidate.shortlisted }
          : candidate,
      ),
    );
  };

  const handleReevaluate = () => {
    // Reset candidates to original dummy data
    setCandidates([...DUMMY_CANDIDATES]);
    setShowCandidates(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-10">Loading...</div>;
  }

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

          {/* Age Limit */}
          <form.Field
            name="ageLimit"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label className="font-medium text-neutral-700">
                  Age Limit
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

        {/* Candidates List - Only show when CVs are uploaded */}
        {showCandidates && candidates.length > 0 && (
          <div className="flex flex-col gap-y-4 p-6 border border-neutral-200 rounded-xl bg-white">
            <h2 className="text-xl font-semibold text-neutral-800 pb-2">
              Candidate Evaluation Results
            </h2>

            <div className="flex flex-col gap-3">
              {candidates.map((candidate) => (
                <div
                  key={candidate.rank}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-white font-semibold">
                      {candidate.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-800">
                        {candidate.name}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Eligibility:{' '}
                        <span className="font-semibold text-talgach-green">
                          {candidate.eligibility}%
                        </span>
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={candidate.shortlisted}
                      onChange={() => toggleShortlist(candidate.rank)}
                      className="w-4 h-4 text-talgach-green rounded border-gray-300 focus:ring-talgach-green"
                    />
                    <span className="text-sm text-neutral-700">Shortlist</span>
                  </label>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleReevaluate}
              className="bg-neutral-800 py-2 px-6 rounded-lg text-sm font-medium text-white hover:cursor-pointer select-none w-fit shadow-sm hover:shadow-md transition-all"
            >
              Reevaluate
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleEvaluateCVs}
            className="bg-blue-600 py-2 px-6 rounded-lg text-sm font-medium text-white hover:cursor-pointer select-none shadow-sm hover:shadow-md transition-all"
          >
            Evaluate CVs
          </button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-talgach-green py-2 px-6 rounded-lg text-sm font-medium text-white hover:cursor-pointer select-none disabled:cursor-not-allowed disabled:bg-neutral-400 shadow-sm hover:shadow-md transition-all"
              >
                {isSubmitting ? 'Updating...' : 'Update Job'}
              </button>
            )}
          </form.Subscribe>
        </div>
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
