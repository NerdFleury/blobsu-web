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
} from "@mantine/core";

import classes from "../components/styles/AuthenticationTitle.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { login } from "../lib/loginAction";

const initialState = {
  message: "",
};

export default function AuthenticationTitle() {
  const [state, formAction] = useFormState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.message === "Success") {
      router.push("/");
    }
  }, [state]);

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Center>
        <Text c="red">{state?.message}</Text>
      </Center>
      <form action={formAction}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@mantine.dev"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
            type="password"
            required
            mt="md"
          />

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
