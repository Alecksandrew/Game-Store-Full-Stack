import type { ReactNode } from "react";

type BackgroundPageProps  = {
    children?:ReactNode
}

export default function BackgroundPage({children}:BackgroundPageProps ) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg-primary p-4">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10 blur-[2px] bg-[url('/the-witcher-3-bg.jpg')] grayscale-100" />
      {children}
    </div>
  );
}
