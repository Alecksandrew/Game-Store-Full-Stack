import { Outlet } from "react-router";

export default function AuthPageLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg-primary p-4">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10 blur-[2px] bg-[url('/the-witcher-3-bg.jpg')] grayscale-100" />
      <Outlet />
    </div>
  );
}
