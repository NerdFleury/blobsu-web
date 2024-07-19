"use client";

import { Text, Group } from "@mantine/core";
import classes from "@/app/components/styles/UserCount.module.css";
import { useEffect, useState } from "react";

interface data {
  total: number;
  online: number;
}

async function fetchNumberofUsers() {
  try {
    const response = await fetch(`https://api.blobsu.xyz/v1/get_player_count`, {
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

export default function UserCount() {
  const [data, setData] = useState<data>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNumberofUsers();
      console.log(data);
      setData(data);
    };

    fetchData().catch(() => {});
  }, []);

  if (data) {
    return (
      <Group className={classes.countbox}>
        <Text size="lg" c="blue">
          {data!.total}
        </Text>
        <Text size="lg">Total Users</Text>
        &nbsp;&nbsp;
        <Text size="lg" c="#ff001e">
          {data!.online}
        </Text>
        <Text size="lg">Online</Text>
      </Group>
    );
  } else {
    return null;
  }
}
