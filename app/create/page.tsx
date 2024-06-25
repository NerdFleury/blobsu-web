"use client";

import CreateAccount from "../components/client/CreateAccount";
import { handleSubmit } from "../lib/createUser";

export default function Create() {
  return <CreateAccount handleSubmit={handleSubmit} />;
}
