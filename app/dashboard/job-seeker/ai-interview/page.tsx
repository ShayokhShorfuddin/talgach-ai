import { CreateNewInterview } from './_components/CreateNewInterview';
import { PastInterviews } from './_components/PastInterviews';

export default function Page() {
  return (
    <main className="px-5">
      <CreateNewInterview />
      <PastInterviews />
    </main>
  );
}
