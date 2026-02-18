import {
  Bot,
  Brain,
  Briefcase,
  File,
  FileSearchCorner,
  GraduationCap,
} from 'lucide-react';

const features: {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    icon: <Bot color="#0a8a55" strokeWidth={1.5} />,
    title: 'AI Evaluation',
    description:
      'Get instant feedback on your resumes and cover letters using advanced AI technology.',
  },
  {
    id: 2,
    icon: <File color="#0a8a55" strokeWidth={1.5} />,
    title: 'CV Builder',
    description:
      'Create professional CVs tailored to your experience and target roles.',
  },
  {
    id: 3,
    icon: <FileSearchCorner color="#0a8a55" strokeWidth={1.5} />,
    title: 'Robust ATS',
    description:
      'Track and manage your applications with our comprehensive applicant tracking system.',
  },
  {
    id: 4,
    icon: <Briefcase color="#0a8a55" strokeWidth={1.5} />,
    title: 'Job Matching',
    description:
      'Find the perfect opportunities that align with your skills and career aspirations.',
  },
  {
    id: 5,
    icon: <GraduationCap color="#0a8a55" strokeWidth={1.5} />,
    title: 'Admission Eligibility',
    description:
      'Check your eligibility and get guidance for your desired academic programs.',
  },
  {
    id: 6,
    icon: <Brain color="#0a8a55" strokeWidth={1.5} />,
    title: 'Employer Insights',
    description:
      'Gain valuable insights into capable candidates and streamline your hiring process.',
  },
];

export function Features() {
  return (
    <section className="flex flex-col sm:items-center sm:text-center mt-20 px-6">
      <small className="text-sm font-medium text-talgach-green">Features</small>

      <h2 className="text-3xl sm:text-4xl mt-2 font-medium">
        Designed to help you ace any challenge
        <span className="text-talgach-green">.</span>
      </h2>

      <p className="mt-4 text-neutral-600 max-w-xl">
        Powerful, self-serve product and growth analytics to help you excel and
        gain confidence. Trusted by over 4,000 job seekers.
      </p>

      <div className="grid grid-cols-1 gap-12 mt-14 xs:grid-cols-2 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center max-w-xs text-center"
          >
            <div className="bg-green-50 rounded-full p-2">
              <div className="rounded-full bg-green-100">{feature.icon}</div>
            </div>

            <p className="mt-4 font-medium">{feature.title}</p>
            <p className="mt-1 text-neutral-600 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
