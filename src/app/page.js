import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          className="object-cover"
          priority
          alt="campgrounds image"
        />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center select-none">
        <div className="flex flex-col items-center space-y-6 text-white bg-gray-600/60 p-10 rounded-md">
          <h1 className="text-6xl font-medium">Campgrounds</h1>
          <p>Create and share your favourite camps</p>
          <div className="flex w-full h-full justify-between">
            <Link href="/campgrounds">View</Link>
            <Link href="/new">Create</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
