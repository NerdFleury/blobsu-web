import Page from "@/app/components/server/userPage";

export default function maniaPage({ params }: { params: { slug: string } }) {
  return <Page params={params} mode={3} />;
}
