import Navbar from "@/components/navbar";

export default function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}
