import { auth } from "@/auth";
import { Container, Center, FileInput, Button } from "@mantine/core";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UploadAvatar } from "../lib/uploadAvatar";

async function getUserId(user: string) {
  const response = await fetch(
    `https://api.blobsu.xyz/v1/get_player_info?scope=info&name=${user.name}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.player.info.id;
}

export default async function Page() {
  const session: any = await auth();
  if (!session) {
    redirect("/login");
  }

  const id = await getUserId(session.user);

  return (
    <Center>
      <Container>
        <Image
          width={60}
          height={60}
          src={`https://a.blobsu.xyz/${id}`}
          alt="user's profile picture"
        />
        <form action={UploadAvatar}>
          <FileInput
            name="image"
            clearable
            variant="filled"
            label="Change Avatar"
            description="Only .png and .jpeg files are accepted"
            accept="image/png,image/jpeg"
            placeholder="Input placeholder"
          />
          <input hidden defaultValue={id} name="userid" />
          <Button type="submit">Apply</Button>
        </form>
      </Container>
    </Center>
  );
}

// session would need to be in an external file
// submission would need to follow the same form format
