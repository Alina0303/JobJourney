import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5">
      {/* Firs-col hide on a small screen */}
      <div className="hidden md:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      {/* Second-col hide dropdown menu on big screen */}
      <div className="lg:col-span-4">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}
export default layout;
