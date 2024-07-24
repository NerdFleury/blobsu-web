"use client";

import { Button, keys, Table, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { MODS } from "../Profile/Constants";
import Link from "next/link";
import { getMods } from "../Profile/Tools";

export default function LeaderboardSkeleton({ data }: { data: Object[] }) {
  return (
    <div style={{ paddingLeft: 10 }}>
      <Table.ScrollContainer minWidth={510} type="native">
        <Table
          align="center"
          maw={"60%"}
          striped
          stripedColor="#053f47"
          highlightOnHover
          highlightOnHoverColor="#0e5761"
          withRowBorders={false}
        >
          <Table.Thead>
            <Table.Tr>
              {Object.keys(data[0]).map((key) => {
                return key !== "player_id" ? (
                  <Table.Th key={key}>{key}</Table.Th>
                ) : null;
              })}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{ backgroundColor: "#042b30" }}>
            {data.map((item, index) => {
              return (
                <Table.Tr key={index}>
                  {Object.entries(item).map(([key, value]) =>
                    key === "country" || key === "Country" ? (
                      <Table.Td key={key}>
                        <Image
                          src={`https://flagcdn.com/w80/${value}.png`}
                          width={24}
                          height={18}
                          quality={100}
                          style={{ marginTop: 7 }}
                          alt={value}
                          unoptimized={true}
                        />
                      </Table.Td>
                    ) : key == "mods" ? (
                      <Table.Td key={key}>{getMods(value)}</Table.Td>
                    ) : key == "player_id" ? null : "player_id" in item &&
                      key == "Player" ? (
                      <Table.Td key={key}>
                        <UnstyledButton
                          component={Link}
                          href={`/user/${item.player_id}`}
                        >
                          {value}
                        </UnstyledButton>
                      </Table.Td>
                    ) : (
                      <Table.Td key={key}>{value}</Table.Td>
                    )
                  )}
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
