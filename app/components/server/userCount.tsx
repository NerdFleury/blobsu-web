import { Text, Group } from "@mantine/core";

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
    return data.counts;
  } catch (error) {
    error;
    throw new Error("Failed to fetch user count");
  }
}

export default async function UserCount() {
  const data = await fetchNumberofUsers();
  const weight = 400;
  const size = "30";
  return (
    <Group gap="xs" mt="6em" bg="black" style={{ borderRadius: 10 }} px={12}>
      <Text size="lg" c="blue" fw={weight}>
        {data.total}
      </Text>
      <Text size="lg" fw={weight}>
        Total Users
      </Text>
      &nbsp;&nbsp;
      <Text size="lg" c="#ff001e" fw={weight}>
        {data.online}
      </Text>
      <Text size="lg" fw={weight}>
        Online
      </Text>
    </Group>
  );
}
