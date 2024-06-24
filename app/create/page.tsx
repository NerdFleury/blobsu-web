"use client";

import CreateAccount from "../components/client/CreateAccount";
import HandeSubmit from "../components/server/CreateUser";

export default function Create() {
  return <CreateAccount handleSubmit={HandeSubmit} />;
}
