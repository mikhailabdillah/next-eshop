import dynamic from "next/dynamic";

export const Slices = {
  Hero: dynamic(() => import("./Hero")),
  NewArrival: dynamic(() => import("./NewArrival")),
  IntroFashion: dynamic(() => import("./IntroFashion")),
};
