import Page from "@/app/components/server/userPage";

export default function catchPage({ params }: { params: { slug: string } }) {
  return <Page params={params} mode={2} />;
}
