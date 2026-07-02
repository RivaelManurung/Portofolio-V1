import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Service } from "@/components/service/Service";
import { Experience } from "@/components/experience/Experience";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Service />
      <Experience />
    </>
  );
}
