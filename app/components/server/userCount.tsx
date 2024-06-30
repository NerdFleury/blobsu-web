import { Text } from "@mantine/core";

async function fetchNumberofUsers() {
  try {
    const response = await fetch(`${process.env.V1_API}/get_player_count`, {
      method: "GET",
      next: {
        revalidate: 300,
      },
    }).then((res) => {
      return res;
    });
    const data = await response.json();
    return data.counts.online;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user count");
  }
}

export default async function UserCount() {
  const data = await fetchNumberofUsers();
  return (
    <>
      <Text>Number of users online: {data} </Text>
    </>
  );
}
