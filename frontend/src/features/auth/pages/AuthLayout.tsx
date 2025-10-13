import BackgroundPage from "@/features/auth/components/AuthPageLayout/AuthPageLayout";
import { Outlet } from "react-router";

export default function AuthLayout() {


  return (
    <>
    <BackgroundPage>
      <Outlet />
    </BackgroundPage>
    </>
  );
}
