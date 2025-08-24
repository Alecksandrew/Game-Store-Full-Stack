import BackgroundPage from "@/global/components/BackgroundPage";
import { Outlet } from "react-router";

export default function AuthLayout() {


  return (
    <BackgroundPage>
      <Outlet />
    </BackgroundPage>
  );
}
