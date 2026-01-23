import { getTaskById } from "@/lib/api";
import SingleTaskCard from "./SingleTaskCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskById(id);

  return (
    <div>
      <SingleTaskCard task={task} />
    </div>
  );
}
