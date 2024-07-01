import Page from "@/app/components/server/userPage";

export default function taikoPage({ params }: { params: { slug: string } }) {
  return <Page params={params} mode={1} />;
}
