import Page from "@/app/components/server/userPage";

export default function stdPage({ params }: { params: { slug: string } }) {
  return <Page params={params} mode={0} />;
}
