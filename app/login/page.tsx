"use client";

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Center,
  Button,
  createTheme,
  MantineProvider,
  Input,
} from "@mantine/core";

import classes from "../components/styles/AuthenticationTitle.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { login } from "../lib/loginAction";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

const initialState = {
  message: "",
};

export default function AuthenticationTitle() {
  const [state, formAction] = useFormState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.message === "Success") {
      router.push("/");
      router.refresh();
    }
  }, [state, router]);

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Center>
        <Text c="red">{state?.message}</Text>
      </Center>
      <form action={formAction}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Paper shadow="md" bg="#00292e" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              name="user"
              type="text"
              variant="filled"
              placeholder="Your username"
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              name="password"
              type="password"
              variant="filled"
              required
              mt="md"
            />

            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
            <Text mt="sm" size="xs">
              No account? <Link href="/create">Create one.</Link>
            </Text>
          </Paper>
        </MantineProvider>
      </form>
    </Container>
  );
}
