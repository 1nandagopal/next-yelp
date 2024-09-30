import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
export default function Layout({ children }) {
  return (
    <SessionProvider>
      <div className="h-screen">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
