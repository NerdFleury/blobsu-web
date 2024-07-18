import { auth } from "@/auth";
import { Container, Center, FileInput, Button, Paper } from "@mantine/core";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UploadAvatar } from "../lib/uploadAvatar";

async function getUserId(user: any) {
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
      <Paper mx="sm" radius="lg" bg="#022429" mt="xl" p="lg">
        <Container maw={400} w="80%">
          <Center>
            <Image
              style={{ borderRadius: 20 }}
              width={90}
              height={90}
              src={`https://a.blobsu.xyz/${id}`}
              alt="user's profile picture"
            />
          </Center>
          <form action={UploadAvatar}>
            <FileInput
              name="image"
              clearable
              color="#012024"
              variant="filled"
              label="Change Avatar"
              description="Only .png and .jpeg files are accepted. Your image may not exceed 4mb"
              accept="image/png,image/jpeg"
              placeholder="Select file here"
            />
            <input hidden defaultValue={id} name="userid" />
            <Button mt="xl" type="submit">
              Apply
            </Button>
          </form>
        </Container>
      </Paper>
    </Center>
  );
}

// session would need to be in an external file
// submission would need to follow the same form format
