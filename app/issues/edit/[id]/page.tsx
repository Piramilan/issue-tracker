import prisma from "~/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { fetchUser } from "../../[id]/page";

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("~/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default EditIssuePage;
