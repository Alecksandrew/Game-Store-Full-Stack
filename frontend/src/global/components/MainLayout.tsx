// src/global/components/MainLayout.tsx
import { Outlet } from "react-router";
import Header from "@/features/Home/components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
