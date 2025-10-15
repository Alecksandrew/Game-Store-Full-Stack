// src/global/components/MainLayout.tsx
import { Outlet } from "react-router";
import Header from "@/global/components/Header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
