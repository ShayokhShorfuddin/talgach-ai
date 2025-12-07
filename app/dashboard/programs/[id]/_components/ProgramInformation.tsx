/** biome-ignore-all lint/correctness/noChildrenProp: <required for Tanstack form> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <> */

'use client';

import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { getProgramFromId } from '@/app/_actions/get-program-from-id';
import { updateProgram } from '@/app/_actions/update-program';

const programSchema = z.object({
  // General Information
  universityName: z.string().min(1, 'University name is required'),
  programLink: z
    .string()
    .refine((val) => val === '' || z.url().safeParse(val).success, {
      message: 'Invalid URL',
    }),
  country: z.string().min(1, 'Country is required'),
  department: z.string().min(1, 'Department is required'),
  programName: z.string().min(1, 'Program name is required'),
  semester: z.string().min(1, 'Semester is required'),
  professor: z.object({
    name: z.string(),
    email: z
      .string()
      .refine((val) => val === '' || z.email().safeParse(val).success, {
        message: 'Invalid email',
      }),
    emailed: z.boolean(),
  }),

  // Requirements
  requirements: z.object({
    languageTests: z.array(
      z.object({
        name: z.string().min(1, 'Test name is required'),
        score: z.string().min(1, 'Score is required'),
        fulfilled: z.boolean(),
      }),
    ),
    degrees: z.array(
      z.object({
        name: z.string().min(1, 'Degree name is required'),
        cgpa: z.string().min(1, 'CGPA is required'),
        fulfilled: z.boolean(),
      }),
    ),
    recommendation: z.object({
      count: z.number().min(0),
      fulfilled: z.boolean(),
    }),
    payment: z.object({
      required: z.boolean(),
      amount: z.string(),
      fulfilled: z.boolean(),
    }),
    sop: z.object({
      required: z.boolean(),
      ready: z.boolean(),
      fulfilled: z.boolean(),
    }),
    miscellaneous: z.object({
      text: z.string(),
      fulfilled: z.boolean(),
    }),
  }),

  // Status
  startedApplication: z.boolean(),
  submittedApplication: z.boolean(),
  madePayment: z.boolean(),
  approved: z.boolean(),
});

export function ProgramInformation({ programId }: { programId: string }) {
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      universityName: '',
      programLink: '',
      country: '',
      department: '',
      programName: '',
      semester: '',
      professor: {
        name: '',
        email: '',
        emailed: false,
      },
      requirements: {
        languageTests: [] as {
          name: string;
          score: string;
          fulfilled: boolean;
        }[],
        degrees: [] as { name: string; cgpa: string; fulfilled: boolean }[],
        recommendation: {
          count: 0,
          fulfilled: false,
        },
        payment: {
          required: false,
          amount: '',
          fulfilled: false,
        },
        sop: {
          required: false,
          ready: false,
          fulfilled: false,
        },
        miscellaneous: {
          text: '',
          fulfilled: false,
        },
      },
      startedApplication: false,
      submittedApplication: false,
      madePayment: false,
      approved: false,
    },
    validators: {
      onChange: programSchema,
    },
    onSubmit: async ({ value }) => {
      await updateProgram(value, programId);
      alert('Program updated successfully!');
    },
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getProgramFromId({ id: programId });
      if (data) {
        form.setFieldValue('universityName', data.universityName);
        form.setFieldValue('programLink', data.programLink || '');
        form.setFieldValue('country', data.country);
        form.setFieldValue('department', data.department);
        form.setFieldValue('programName', data.programName);
        form.setFieldValue('semester', data.semester);
        form.setFieldValue(
          'professor',
          data.professor || { name: '', email: '', emailed: false },
        );
        form.setFieldValue(
          'requirements',
          data.requirements || {
            languageTests: [],
            degrees: [],
            recommendation: { count: 0, fulfilled: false },
            payment: { required: false, amount: '', fulfilled: false },
            sop: { required: false, ready: false, fulfilled: false },
            miscellaneous: { text: '', fulfilled: false },
          },
        );
        form.setFieldValue('startedApplication', data.startedApplication);
        form.setFieldValue('submittedApplication', data.submittedApplication);
        form.setFieldValue('madePayment', data.madePayment);
        form.setFieldValue('approved', data.approved);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [programId, form]);

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
        {/* General Information Section */}
        <div className="flex flex-col gap-y-4 p-6 border border-neutral-200 rounded-xl bg-white">
          <h2 className="text-xl font-semibold text-neutral-800 pb-2">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="universityName"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-neutral-700">
                    University Name
                  </label>

                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Harvard University"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="programLink"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-neutral-700">
                    University/Program Link
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://..."
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="country"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-neutral-700">
                    Country
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. USA"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="department"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-neutral-700">
                    Department
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="programName"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-neutral-700">
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. MSc in AI"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            />

            <form.Field
              name="semester"
              children={(field) => (
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-neutral-700">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Fall 2025"
                    className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                  />
                  <ErrorInfo field={field} />
                </div>
              )}
            />
          </div>

          <div className="mt-2 pt-4">
            <h3 className="font-medium text-neutral-800 mb-3">
              Professor Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="professor.name"
                children={(field) => (
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-neutral-700 text-xs">
                      Professor Name
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Name"
                      className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                    />
                    <ErrorInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="professor.email"
                children={(field) => (
                  <div className="flex flex-col gap-1">
                    <label className="font-medium text-neutral-700 text-xs">
                      Professor Email
                    </label>
                    <input
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Email"
                      className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-talgach-green placeholder-neutral-400"
                    />
                    <ErrorInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="professor.emailed"
                children={(field) => (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="prof-emailed"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="w-4 h-4 text-talgach-green rounded border-gray-300 focus:ring-talgach-green"
                    />
                    <label
                      htmlFor="prof-emailed"
                      className="text-sm text-neutral-700 select-none cursor-pointer"
                    >
                      Professor has been emailed.
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="flex flex-col gap-y-6 p-6 border border-neutral-200 rounded-xl bg-white">
          <h2 className="text-xl font-semibold text-neutral-800 pb-2">
            Requirements
          </h2>

          {/* Language Tests */}
          <form.Field
            name="requirements.languageTests"
            mode="array"
            children={(field) => (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-neutral-800">
                    Language Tests
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      field.pushValue({ name: '', score: '', fulfilled: false })
                    }
                    className="text-xs flex items-center gap-1 text-talgach-green font-medium hover:cursor-pointer"
                  >
                    + Add Test
                  </button>
                </div>

                {field.state.value.length === 0 && (
                  <p className="text-neutral-400 text-xs italic">
                    No language tests added.
                  </p>
                )}

                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row gap-3 p-3 relative group"
                  >
                    <div className="flex-1">
                      <form.Field
                        name={`requirements.languageTests[${i}].name`}
                        children={(subField) => (
                          <input
                            type="text"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            placeholder="Test Name (e.g. IELTS)"
                            className="w-full px-3 py-1.5 rounded border border-neutral-300 text-sm"
                          />
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <form.Field
                        name={`requirements.languageTests[${i}].score`}
                        children={(subField) => (
                          <input
                            type="text"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            placeholder="Score (e.g. 7.5)"
                            className="w-full px-3 py-1.5 rounded border border-neutral-300 text-sm"
                          />
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <form.Field
                        name={`requirements.languageTests[${i}].fulfilled`}
                        children={(subField) => (
                          <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs text-neutral-600">
                            <input
                              type="checkbox"
                              checked={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(e.target.checked)
                              }
                              className="rounded border-gray-300"
                            />
                            Fulfilled
                          </label>
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => field.removeValue(i)}
                        className="text-red-500 hover:text-red-700 p-1 text-xs"
                        title="Remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          />

          <hr className="border-neutral-100" />

          {/* Degree Name and CGPA */}
          <form.Field
            name="requirements.degrees"
            mode="array"
            children={(field) => (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-neutral-800">
                    Degrees & CGPA
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      field.pushValue({ name: '', cgpa: '', fulfilled: false })
                    }
                    className="text-xs flex items-center gap-1 text-talgach-green font-medium hover:cursor-pointer"
                  >
                    + Add Degree
                  </button>
                </div>

                {field.state.value.length === 0 && (
                  <p className="text-neutral-400 text-xs italic">
                    No degrees added.
                  </p>
                )}

                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row gap-3 p-3 relative"
                  >
                    <div className="flex-1">
                      <form.Field
                        name={`requirements.degrees[${i}].name`}
                        children={(subField) => (
                          <input
                            type="text"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            placeholder="Degree Name (e.g. BSc in CS)"
                            className="w-full px-3 py-1.5 rounded border border-neutral-300 text-sm"
                          />
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <form.Field
                        name={`requirements.degrees[${i}].cgpa`}
                        children={(subField) => (
                          <input
                            type="text"
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.value)
                            }
                            placeholder="CGPA (e.g. 3.8)"
                            className="w-full px-3 py-1.5 rounded border border-neutral-300 text-sm"
                          />
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <form.Field
                        name={`requirements.degrees[${i}].fulfilled`}
                        children={(subField) => (
                          <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs text-neutral-600">
                            <input
                              type="checkbox"
                              checked={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(e.target.checked)
                              }
                              className="rounded border-gray-300"
                            />
                            Fulfilled
                          </label>
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => field.removeValue(i)}
                        className="text-red-500 hover:text-red-700 p-1 text-xs"
                        title="Remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          />

          <hr className="border-neutral-100" />

          {/* Recommendation */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-neutral-800">
              Recommendation Letters
            </label>
            <div className="flex items-center gap-4 p-3">
              <form.Field
                name="requirements.recommendation.count"
                children={(field) => (
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-neutral-600">
                      Number of recommendations needed
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="px-3 py-1.5 rounded border border-neutral-300 text-sm w-full md:w-32"
                    />
                  </div>
                )}
              />
              <form.Field
                name="requirements.recommendation.fulfilled"
                children={(field) => (
                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700 mt-4">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    Fulfilled
                  </label>
                )}
              />
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-neutral-800">Payment</label>
            <div className="flex flex-col gap-3 p-3">
              <div className="flex items-center gap-6">
                <form.Field
                  name="requirements.payment.required"
                  children={(field) => (
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-neutral-600">Required</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => field.handleChange(true)}
                          className={`px-3 py-1 rounded text-xs border ${field.state.value ? 'bg-neutral-800 text-white border-neutral-800' : 'bg-white text-neutral-600 border-neutral-300'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => field.handleChange(false)}
                          className={`px-3 py-1 rounded text-xs border ${!field.state.value ? 'bg-neutral-800 text-white border-neutral-800' : 'bg-white text-neutral-600 border-neutral-300'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                />

                <form.Field
                  name="requirements.payment.fulfilled"
                  children={(field) => (
                    <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      Fulfilled
                    </label>
                  )}
                />
              </div>

              <form.Field
                name="requirements.payment.required"
                children={(parentField) =>
                  parentField.state.value ? (
                    <form.Field
                      name="requirements.payment.amount"
                      children={(field) => (
                        <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                          <label className="text-xs text-neutral-600">
                            Amount
                          </label>
                          <input
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. $100"
                            className="px-3 py-1.5 rounded border border-neutral-300 text-sm w-full md:w-1/2"
                          />
                        </div>
                      )}
                    />
                  ) : null
                }
              />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* SOP */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-neutral-800">
              Statement of Purpose (SOP)
            </label>
            <div className="flex flex-col gap-3 p-3">
              <div className="flex items-center gap-6">
                <form.Field
                  name="requirements.sop.required"
                  children={(field) => (
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-neutral-600">Required</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => field.handleChange(true)}
                          className={`px-3 py-1 rounded text-xs border ${field.state.value ? 'bg-neutral-800 text-white border-neutral-800' : 'bg-white text-neutral-600 border-neutral-300'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => field.handleChange(false)}
                          className={`px-3 py-1 rounded text-xs border ${!field.state.value ? 'bg-neutral-800 text-white border-neutral-800' : 'bg-white text-neutral-600 border-neutral-300'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                />

                <form.Field
                  name="requirements.sop.fulfilled"
                  children={(field) => (
                    <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      Fulfilled
                    </label>
                  )}
                />
              </div>

              <form.Field
                name="requirements.sop.required"
                children={(parentField) =>
                  parentField.state.value ? (
                    <form.Field
                      name="requirements.sop.ready"
                      children={(field) => (
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-200 mt-2">
                          <span className="text-sm text-neutral-600">
                            Is it ready?
                          </span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => field.handleChange(true)}
                              className={`px-3 py-1 rounded text-xs border ${field.state.value ? 'bg-green-600 text-white border-green-600' : 'bg-white text-neutral-600 border-neutral-300'}`}
                            >
                              Ready
                            </button>
                            <button
                              type="button"
                              onClick={() => field.handleChange(false)}
                              className={`px-3 py-1 rounded text-xs border ${!field.state.value ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-neutral-600 border-neutral-300'}`}
                            >
                              Not Ready
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  ) : null
                }
              />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Miscellaneous */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-neutral-800">
              Miscellaneous
            </label>
            <div className="flex flex-col gap-3 p-3">
              <form.Field
                name="requirements.miscellaneous.text"
                children={(field) => (
                  <textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Any other requirements..."
                    className="w-full px-3 py-2 rounded border border-neutral-300 text-sm min-h-20"
                  />
                )}
              />
              <form.Field
                name="requirements.miscellaneous.fulfilled"
                children={(field) => (
                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    Fulfilled
                  </label>
                )}
              />
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="flex flex-col gap-y-4 p-6 border border-neutral-200 rounded-xl bg-white">
          <h2 className="text-xl font-semibold text-neutral-800 pb-2">
            Status
          </h2>
          <div className="flex flex-wrap gap-6">
            <form.Field
              name="startedApplication"
              children={(field) => (
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Started Application
                </label>
              )}
            />
            <form.Field
              name="submittedApplication"
              children={(field) => (
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Submitted Application
                </label>
              )}
            />
            <form.Field
              name="madePayment"
              children={(field) => (
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Made Payment
                </label>
              )}
            />
            <form.Field
              name="approved"
              children={(field) => (
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Approved
                </label>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="bg-blue-600 py-2 px-4 rounded text-sm font-medium text-white hover:cursor-pointer select-none shadow-sm hover:shadow-md transition-all"
            onClick={() => {
              // Dummy button
              alert('AI Eligibility Check feature coming soon!');
            }}
          >
            AI Eligibility Check
          </button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-talgach-green py-2 px-4 rounded text-sm font-medium text-white hover:cursor-pointer select-none disabled:cursor-not-allowed disabled:bg-neutral-400 shadow-sm hover:shadow-md transition-all"
              >
                {isSubmitting ? 'Updating...' : 'Update Program'}
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
