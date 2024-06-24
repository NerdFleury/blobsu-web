import { fetchNumberofUsers } from "../../lib/data";

export default async function UserCount() {
  const data = await fetchNumberofUsers();
  return (
    <main>
      <p>Number of users online: {data} </p>
    </main>
  );
}
