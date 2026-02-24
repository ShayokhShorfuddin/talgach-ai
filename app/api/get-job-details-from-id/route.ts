import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { jobSeekerJob } from '@/schemas/job-seeker-job-schema';

export async function GET(request: Request) {
  const jobID = request.headers.get('job-id');

  if (!jobID) {
    return Response.json({ error: 'No job ID provided.' }, { status: 400 });
  }

  const job = await db.query.jobSeekerJob.findFirst({
    where: eq(jobSeekerJob.id, jobID),
  });

  if (!job) {
    return Response.json({ error: 'Job not found' }, { status: 404 });
  }

  return Response.json(job);
}
