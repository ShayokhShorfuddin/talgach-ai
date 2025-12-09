import { getSimulation } from '@/app/_actions/get-simulation-from-id';
import { SimulationView } from './_components/simulation-view';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: simulationId } = await params;
  const simulation = await getSimulation({ simulationId });

  return (
    <SimulationView
      simulationId={simulationId}
      initialData={
        simulation && simulation?.thought !== ''
          ? { thought: simulation.thought, isApproved: simulation.isApproved }
          : null
      }
    />
  );
}
