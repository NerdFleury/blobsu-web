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
import { SubmitButton } from "../components/Create/SubmitButton";
import classes from "../components/styles/AuthenticationTitle.module.css";
import { handleSubmit } from "../lib/createUser";
import { useFormState } from "react-dom";
import React, { useEffect, useState } from "react";
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

function convertToUrl({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  let data = new URLSearchParams();
  data.append("user[username]", name);
  data.append("user[user_email]", email);
  data.append("user[password]", password);
  data.append("user[confirmPassword]", confirmPassword);
  data.append("check", "0");

  let form = new FormData();
  form.append("searchParams", data.toString());
  form.append("user[username]", name);
  form.append("user[user_email]", email);
  form.append("user[password]", password);
  form.append("user[confirmPassword]", confirmPassword);

  return form;
}

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <form
        action={() =>
          formAction(
            convertToUrl({
              name: name,
              email: email,
              confirmPassword: confirmPassword,
              password: password,
            })
          )
        }
      >
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
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                label="Name"
                placeholder="Name"
                required
              />
              <TextInput
                name="user[user_email]"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                variant="filled"
                type="email"
                placeholder="example@gmail.com"
                required
              />
              <PasswordInput
                name="user[password]"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                label="Password"
                placeholder="Your password"
                required
                mt="md"
              />
              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
