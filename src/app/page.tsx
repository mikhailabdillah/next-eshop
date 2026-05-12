import { Slices } from "@/slices";

export default function Home() {
  return (
    <main>
      <Slices.Hero />
      <Slices.NewArrival />
      <Slices.IntroFashion />
    </main>
  );
}
