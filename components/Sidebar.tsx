"use client";
import Logo from "@/assets/logo.png";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image
        src={Logo}
        alt="logo"
        loading="eager"
        className="mx-auto  w-50 h-auto"
      />
      <div className="flex flex-col mt-10 gap-y-4">
        {links.map((link, index) => {
          return (
            <Button
              key={index}
              asChild
              variant={link.href === pathname ? "default" : "link"}
            >
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
export default Sidebar;
