'use client';

import { useState } from 'react';
import type { Type_PricingInformation } from '@/types/pricing';

const individualPlans: Type_PricingInformation = [
  {
    id: 1,
    name: 'Standard',
    description: 'For individuals getting started.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 2,
    name: 'Excel',
    description: 'Best for growth seekers.',
    monthlyPrice: 10,
    yearlyPrice: 60,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 3,
    name: 'Accelerate',
    description: 'For those aiming to speed up their progress.',
    monthlyPrice: 20,
    yearlyPrice: 120,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
];

export function Pricing() {
  const [selectedIndividualPlan, setSelectedIndividualPlan] = useState<
    'monthly' | 'yearly'
  >('yearly');

  const [selectedCorporatePlan, setSelectedCorporatePlan] = useState<
    'monthly' | 'yearly'
  >('yearly');

  return (
    <section className="mt-30 px-10">
      <IndividualPricing
        selectedIndividualPlan={selectedIndividualPlan}
        setSelectedIndividualPlan={setSelectedIndividualPlan}
      />
      <CorporatePricing
        selectedCorporatePlan={selectedCorporatePlan}
        setSelectedCorporatePlan={setSelectedCorporatePlan}
      />
    </section>
  );
}

function IndividualPricing({
  selectedIndividualPlan,
  setSelectedIndividualPlan,
}: {
  selectedIndividualPlan: 'monthly' | 'yearly';
  setSelectedIndividualPlan: React.Dispatch<
    React.SetStateAction<'monthly' | 'yearly'>
  >;
}) {
  return (
    <>
      <small className="text-talgach-green text-sm font-medium">
        Student and candidate suite
      </small>

      <p className="text-4xl font-medium max-w-xl mt-2">
        Kickstart your journey with our launchpad options
        <span className="text-talgach-green">.</span>
      </p>

      <div className="flex items-center gap-x-3 mt-5">
        <button
          type="button"
          className="py-1 px-1.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          style={{
            backgroundColor:
              selectedIndividualPlan === 'yearly' ? '#0a8a55' : 'transparent',
            color: selectedIndividualPlan === 'yearly' ? 'white' : 'black',
            borderWidth: selectedIndividualPlan === 'yearly' ? '0px' : '1px',
            borderColor:
              selectedIndividualPlan === 'yearly' ? 'transparent' : '#0a8a55',
          }}
          onClick={() => setSelectedIndividualPlan('yearly')}
        >
          Billed yearly
        </button>

        <button
          type="button"
          className="py-1 px-1.5 rounded text-xs font-medium hover:cursor-pointer select-none"
          style={{
            backgroundColor:
              selectedIndividualPlan === 'monthly' ? '#0a8a55' : 'transparent',
            color: selectedIndividualPlan === 'monthly' ? 'white' : 'black',
            borderWidth: selectedIndividualPlan === 'monthly' ? '0px' : '1px',
            borderColor:
              selectedIndividualPlan === 'monthly' ? 'transparent' : '#0a8a55',
          }}
          onClick={() => setSelectedIndividualPlan('monthly')}
        >
          Billed monthly
        </button>
      </div>

      <div className="flex gap-x-4 mt-8">
        {individualPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            selectedPlan={selectedIndividualPlan}
          />
        ))}

        <CustomPlanCard customFor="individuals" />
      </div>
    </>
  );
}

function CorporatePricing({
  selectedCorporatePlan,
  setSelectedCorporatePlan,
}: {
  selectedCorporatePlan: 'monthly' | 'yearly';
  setSelectedCorporatePlan: React.Dispatch<
    React.SetStateAction<'monthly' | 'yearly'>
  >;
}) {
  return (
    <>
      <small className="text-talgach-green text-sm font-medium mt-20 block">
        Corporate suite
      </small>

      <p className="text-4xl font-medium max-w-xl mt-2">
        Empower your team with our corporate solutions
        <span className="text-talgach-green">.</span>
      </p>

      <div className="flex items-center gap-x-3 mt-5">
        <button
          type="button"
          className="py-1 px-1.5 rounded text-xs font-medium text-white hover:cursor-pointer select-none"
          style={{
            backgroundColor:
              selectedCorporatePlan === 'yearly' ? '#0a8a55' : 'transparent',
            color: selectedCorporatePlan === 'yearly' ? 'white' : 'black',
            borderWidth: selectedCorporatePlan === 'yearly' ? '0px' : '1px',
            borderColor:
              selectedCorporatePlan === 'yearly' ? 'transparent' : '#0a8a55',
          }}
          onClick={() => setSelectedCorporatePlan('yearly')}
        >
          Billed yearly
        </button>

        <button
          type="button"
          className="py-1 px-1.5 rounded text-xs font-medium hover:cursor-pointer select-none"
          style={{
            backgroundColor:
              selectedCorporatePlan === 'monthly' ? '#0a8a55' : 'transparent',
            color: selectedCorporatePlan === 'monthly' ? 'white' : 'black',
            borderWidth: selectedCorporatePlan === 'monthly' ? '0px' : '1px',
            borderColor:
              selectedCorporatePlan === 'monthly' ? 'transparent' : '#0a8a55',
          }}
          onClick={() => setSelectedCorporatePlan('monthly')}
        >
          Billed monthly
        </button>
      </div>

      <div className="flex gap-x-4 mt-8">
        {individualPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            selectedPlan={selectedCorporatePlan}
          />
        ))}

        <CustomPlanCard customFor="corporate" />
      </div>
    </>
  );
}

function PlanCard({
  name,
  description,
  monthlyPrice,
  yearlyPrice,
  features,
  selectedPlan,
}: {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  selectedPlan: 'monthly' | 'yearly';
}) {
  return (
    <div className="p-5 rounded border border-neutral-200 hover:border-talgach-green transition duration-300">
      <p className="font-medium">{name}</p>
      <p className="mt-1 text-sm text-neutral-600">{description}</p>

      <p className="text-3xl text-talgach-green mt-5 font-mono">
        ${selectedPlan === 'monthly' ? monthlyPrice : yearlyPrice}
        <span className="text-sm text-black ml-1">
          /{selectedPlan === 'monthly' ? 'month' : 'year'}
        </span>
      </p>

      <button
        type="button"
        className="bg-talgach-green py-0.5 px-2 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3"
      >
        Get Started
      </button>

      <hr className="mt-6" />

      <FeaturesList features={features} />
    </div>
  );
}

function FeaturesList({ features }: { features: string[] }) {
  return (
    <ul className="flex flex-col gap-y-1 mt-6">
      {features.map((feature, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <We won't rearrange the features>
        <li key={index} className="flex items-center gap-x-2">
          <span className="text-talgach-green">✔</span>
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function CustomPlanCard({
  customFor,
}: {
  customFor: 'individuals' | 'corporate';
}) {
  return (
    <div className="flex flex-col items-center justify-center p-5 rounded border border-talgach-green ">
      <p className="text-2xl font-medium">Custom</p>
      <p className="mt-1 text-sm text-neutral-600 text-center max-w-50">
        {customFor === 'individuals'
          ? 'Tailored plans for unique individual needs.'
          : 'Bespoke solutions for corporate requirements.'}
      </p>

      <button
        type="button"
        className="bg-talgach-green py-0.5 px-2 rounded text-xs font-medium text-white hover:cursor-pointer select-none mt-3 w-fit"
      >
        Contact Us
      </button>
    </div>
  );
}
