import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans">
      <main className="min-h-screen max-w-[80%] w-full bg-white p-8">
        {children}
      </main>
    </div>
  );
};
