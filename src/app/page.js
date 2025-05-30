import Image from "next/image";
import Header from "./component/Header";
import Hero from "./component/Hero";
import Slider from "./component/Slider";

export default function Home() {
  return (
    <main className="px-6 py-8 md:px-10 md:py-[34px] lg:px-[120px]">
      <Header />
      <Hero />
      <Slider />
    </main>
  );
}
