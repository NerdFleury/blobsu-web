import { UnstyledButton } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

export default function Loader() {
  return (
    <UnstyledButton>
      <IconUserCircle fill="white" width="50" height="50" />
    </UnstyledButton>
  );
}
