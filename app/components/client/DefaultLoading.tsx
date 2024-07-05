import { Loader } from "@mantine/core";
import { Center } from "@mantine/core";

export function LoadingDef() {
  return (
    <Center>
      <Loader mt="xl" size="xl" type="bars" />
    </Center>
  );
}
