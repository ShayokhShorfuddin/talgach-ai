import { JobInformation } from './_components/JobInformation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobInformation jobId={id} />;
}
