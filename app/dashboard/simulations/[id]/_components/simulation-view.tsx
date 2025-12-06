'use client';

import { useState } from 'react';
import { HRPov } from './hr-pov';
import { Loading } from './loading';
import { UploadCVButton } from './upload-file';

interface SimulationViewProps {
  simulationId: string;
  initialData?: {
    thought: string;
    isApproved: boolean;
  } | null;
}

export function SimulationView({
  simulationId,
  initialData,
}: SimulationViewProps) {
  const [response, setResponse] = useState<{
    response: string;
    isApproved: boolean;
  } | null>(
    initialData
      ? { response: initialData.thought, isApproved: initialData.isApproved }
      : null,
  );
  const [reviewing, setReviewing] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center">
      {!response && (
        <UploadCVButton
          simulationId={simulationId}
          isReviewing={reviewing}
          setIsReviewing={setReviewing}
          setReviewResult={setResponse}
        />
      )}

      {reviewing && !response && <Loading />}

      {response && (
        <HRPov
          text={response.response ?? ''}
          decision={response.isApproved ? 'Approved' : 'Rejected'}
        />
      )}
    </main>
  );
}
