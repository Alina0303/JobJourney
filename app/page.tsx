import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import LandingImg from "@/assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt="logo" loading="eager" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-6 h-screen -mt-20 grid lg:grid-cols-[1fr_400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span>
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            harum id eaque in, tenetur molestiae explicabo officiis soluta
            pariatur est optio quaerat tempora officia reiciendis numquam
            voluptatibus repellendus, quasi quidem sunt veniam! Expedita
            veritatis amet, sunt non suscipit ducimus maiores, fugit porro
            eligendi perspiciatis iste quasi illum sapiente repudiandae atque.
          </p>
          <Button asChild className="mt-4">
            <Link href={"/add-job"}>Get Started</Link>
          </Button>
        </div>
        <Image
          src={LandingImg}
          alt="landing image"
          className="hidden lg:block"
        />
      </section>
    </main>
  );
}
