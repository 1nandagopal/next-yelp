import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
export default function Layout({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      <div className="m-6">{children}</div>
    </SessionProvider>
  );
}
