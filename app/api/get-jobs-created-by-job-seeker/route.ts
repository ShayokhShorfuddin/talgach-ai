import { db } from '@/lib/db';

export async function GET(request: Request) {
  const userID = request.headers.get('job-seeker-id');

  if (!userID) {
    return Response.json({ error: 'No user ID provided.' }, { status: 400 });
  }

  const lightDetailsOfJobsCreatedByJobSeeker =
    await db.query.jobSeekerJob.findMany({
      columns: {
        id: true,
        position: true,
        companyName: true,
        createdAt: true,
      },

      where: (jobs, { eq }) => eq(jobs.jobSeekerId, userID),
    });

  if (!lightDetailsOfJobsCreatedByJobSeeker) {
    return Response.json(
      { error: 'Jobs not found for this user' },
      { status: 404 },
    );
  }

  return Response.json(lightDetailsOfJobsCreatedByJobSeeker);
}
