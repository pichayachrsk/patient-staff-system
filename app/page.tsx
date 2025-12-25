import Link from "next/link";
import { Header } from "./components/header";
import { LinkButton } from "./components/linkButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Header text="PATIENT STAFF SYSTEM" />

      <div className="flex gap-4">
        <LinkButton href="/patient-view" text="Patient View" target="_blank" />
        <LinkButton href="/staff-view" text="Staff View" target="_blank" />
      </div>
    </div>
  );
}
