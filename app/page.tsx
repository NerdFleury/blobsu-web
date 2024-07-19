import Home from "./components/Home/Home";
import { Suspense } from "react";
import UserCount from "./components/Home/userCount";

export default function Page() {
  return (
    <Home>
      <Suspense>
        <UserCount />
      </Suspense>
    </Home>
  );
}
