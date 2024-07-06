"use client";

import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  createTheme,
  Input,
  MantineProvider,
} from "@mantine/core";
import { SubmitButton } from "../components/client/SubmitButton";
import classes from "../components/styles/AuthenticationTitle.module.css";
import { handleSubmit } from "../lib/createUser";
import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function addNewLines(text: String) {
  let lines = text
    .split(".")
    .map((line) => line.trim())
    .filter((line) => line);

  lines = lines.filter((line, index) => lines.indexOf(line) === index);

  // Add index and new lines
  return lines.map((item, index) => (
    <React.Fragment key={index}>
      {index + 1}. {item}
      <br />
    </React.Fragment>
  ));
}

export default function Page() {
  const [state, formAction] = useFormState(handleSubmit, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.message === "Success") {
      alert("Account successfully created");
      router.push("/");
    }
  }, [state, router]);
  return (
    <div>
      <form action={formAction}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
              Create an Account
            </Title>
            <Text c="red">{addNewLines(state?.message)}</Text>
            <Paper bg="#00292e" shadow="md" p={30} mt={30} radius="md">
              <TextInput
                name="user[username]"
                variant="filled"
                label="Name"
                placeholder="Name"
                required
              />
              <TextInput
                name="user[user_email]"
                label="Email"
                variant="filled"
                type="email"
                placeholder="example@gmail.com"
                required
              />
              <PasswordInput
                name="user[password]"
                variant="filled"
                label="Password"
                placeholder="Your password"
                required
                mt="md"
              />
              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                variant="filled"
                placeholder="Confirm password"
                required
                mt="md"
              />
              <SubmitButton />
              <Text mt="sm" size="xs">
                Have an account? <Link href="/login">Login.</Link>
              </Text>
            </Paper>
          </Container>
        </MantineProvider>
      </form>
    </div>
  );
}
