"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import classes from "../styles/AuthenticationTitle.module.css";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

interface UserFormData {
  username: string;
  user_email: string;
  password: string;
  confirmPassword: string;
}

// Define a type for the error messages
interface FormErrors {
  username?: string;
  user_email?: string;
  password?: string;
  confirmPassword?: string;
  apiError?: string;
}

export default function CreateAccount({
  handleSubmit,
}: {
  handleSubmit: Function;
}) {
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    user_email: "",
    password: "",
    confirmPassword: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");

  const [nameState, setNameState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passState, setPassState] = useState(false);
  const [confState, setconfState] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors: FormErrors = {};
    if (!name) {
      formErrors.username = "Username is required";
      setNameState(true);
    }
    if (!email) {
      formErrors.user_email = "Email is required";
      setEmailState(true);
    }
    if (!pass) {
      formErrors.password = "Password is required";
      setPassState(true);
    }
    if (pass !== conf) {
      formErrors.confirmPassword = "Passwords do not match";
      setconfState(true);
    }
    return formErrors;
  };

  const submitFunction = (e: FormEvent) => {
    e.preventDefault();
    setNameState(false);
    setEmailState(false);
    setPassState(false);
    setconfState(false);
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const user = new URLSearchParams();
      user.append("user[username]", name);
      user.append("user[user_email]", email);
      user.append("user[password]", pass);
      user.append("check", "0");
      handleSubmit(user);
    }
  };

  return (
    <div>
      <form onSubmit={submitFunction}>
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Create an Account
          </Title>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              error={(nameState && "Enter a valid name") || nameState}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              placeholder="example@gmail.com"
              required
            />
            <TextInput
              error={(emailState && "Enter a valid email") || emailState}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="example@gmail.com"
              required
            />
            <PasswordInput
              error={(passState && "Enter a password") || passState}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              label="Password"
              placeholder="Your password"
              required
              mt="md"
            />
            <PasswordInput
              error={(confState && "Passwords do not match") || confState}
              value={conf}
              onChange={(e) => setConf(e.target.value)}
              label="Confirm Password"
              placeholder="Your password"
              required
              mt="md"
            />
            <Button fullWidth mt="xl" type="submit">
              Create Account
            </Button>
          </Paper>
        </Container>
      </form>
    </div>
  );
}
