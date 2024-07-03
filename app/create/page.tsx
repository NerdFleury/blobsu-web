"use client";

import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { SubmitButton } from "../components/client/SubmitButton";
import classes from "../components/styles/AuthenticationTitle.module.css";
import { handleSubmit } from "../lib/createUser";
import { useFormState } from "react-dom";
import React from "react";

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
  return (
    <div>
      <form action={formAction}>
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Create an Account
          </Title>
          <Text c="red">{addNewLines(state?.message)}</Text>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput name="name" label="Name" placeholder="Name" required />
            <TextInput
              name="email"
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Your password"
              required
              mt="md"
            />
            <PasswordInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              required
              mt="md"
            />
            <SubmitButton />
          </Paper>
        </Container>
      </form>
    </div>
  );
}
