import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { jobSeekerJob, profile } from '@/schemas/schema';
import { generateUniqueId } from '@/utils/generate-unique-id';

export async function POST(request: Request) {
  const jobSeekerID = request.headers.get('job-seeker-id');
  const companyName = request.headers.get('company-name');
  const position = request.headers.get('position');
  const deadline = request.headers.get('deadline');
  const maximumAgeLimit = parseInt(
    request.headers.get('maximum-age-limit') || '0',
    10,
  );
  const experienceRequirement = request.headers.get('experience-requirement');

  let skills: { name: string }[] = [];
  try {
    skills = JSON.parse(request.headers.get('skills') || '[]');
  } catch {
    return Response.json({ error: 'Invalid skills format.' }, { status: 400 });
  }
  const proficiency = request.headers.get('proficiency');
  const employmentStatus = request.headers.get('employment-status');
  const otherKnowledge = request.headers.get('other-knowledge');
  const responsibilities = request.headers.get('responsibilities');
  const salaryAndBenefits = request.headers.get('salary-and-benefits');

  if (
    !jobSeekerID ||
    !companyName ||
    !position ||
    !deadline ||
    !experienceRequirement ||
    !proficiency ||
    !employmentStatus ||
    !otherKnowledge ||
    !responsibilities ||
    !salaryAndBenefits
  ) {
    return Response.json(
      { error: 'All fields are required.' },
      { status: 400 },
    );
  }

  if (Number.isNaN(new Date(deadline).getTime())) {
    return Response.json({ error: 'Invalid deadline.' }, { status: 400 });
  }

  const user = await db.query.profile.findFirst({
    where: eq(profile.id, jobSeekerID),
  });

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const id = generateUniqueId();
  const time = new Date();

  await db.insert(jobSeekerJob).values({
    id,
    jobSeekerId: jobSeekerID,
    companyName,
    position,
    deadline: new Date(deadline),
    maximumAgeLimit,
    experienceRequirement,
    skills,
    proficiency,
    employmentStatus,
    otherKnowledge,
    responsibilities,
    salaryAndBenefits,

    createdAt: time,
    updatedAt: time,
  });

  return Response.json(
    { message: 'Job created successfully' },
    { status: 201 },
  );
}
