import Home from "./components/client/Home";
import { Suspense } from "react";
import UserCount from "./components/server/userCount";

export default function Page() {
  return (
    <Home>
      <Suspense>
        <UserCount />
      </Suspense>
    </Home>
  );
}
