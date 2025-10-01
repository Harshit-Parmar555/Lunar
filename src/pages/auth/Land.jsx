import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { Star, UserCog } from "lucide-react";
import landpage from "@/assets/landpage.png";
import { GlowingStarsBackground } from "@/components/ui/glowing-stars";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Land = () => {
  const hero = " Where every moment finds its perfect beat.";

  return (
    <div className="min-h-screen w-full overflow-y-hidden fixed inset-0">
      <GlowingStarsBackground className="absolute inset-0 -z-10" />

      <div className="relative z-10 h-full flex flex-col">
        <Navbar />
        <div className="w-full flex flex-col items-center mt-40 px-4">
          <TextGenerateEffect
            words={hero}
            className="text-4xl md:text-6xl font-medium poppins max-w-4xl text-center bg-gradient-to-r from-white via-gray-200 to-zinc-400 bg-clip-text text-transparent leading-tight"
          />

          <p className="text-zinc-400 mt-6 text-sm md:text-base max-w-3xl text-center inter italic">
            Listen to the music you love, without interruptions. Search, play
            and explore, all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
            <Button className="inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white group">
              <UserCog className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Meet the Developer
            </Button>

            <Button className="inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-white group">
              <Star className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Star on GitHub
            </Button>
          </div>

          <div className="relative w-full max-w-5xl mt-12 rounded-xl overflow-hidden shadow-2xl border-2 border-zinc-800">
            <img
              src={landpage}
              alt="Tunes Music App Preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
