import Page from "@/app/components/server/userPage";

export default function relaxPage({ params }: { params: { slug: string } }) {
  return <Page params={params} mode={4} />;
}
