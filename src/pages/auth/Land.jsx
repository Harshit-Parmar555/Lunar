import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { Star, UserCog, ArrowRightFromLine, ChevronRight } from "lucide-react";
import { GlowingStarsBackground } from "@/components/ui/glowing-stars";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Land = () => {
  const hero = " Where every moment finds its perfect beat.";

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <GlowingStarsBackground className="absolute inset-0 -z-10" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-32 sm:pb-8">
          <Button className="rounded-full bg-transparent border border-zinc-600 hover:bg-transparent flex items-center gap-2 px-3">
            <span className="text-white poppins text-xs font-light">
              🎵 Welcome to Lunar
            </span>
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>

          <div className="w-full max-w-6xl mx-auto text-center space-y-6 mb-8">
            <TextGenerateEffect
              words={hero}
              className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl  michroma bg-gradient-to-r from-white via-gray-200 to-zinc-400 bg-clip-text text-transparent leading-tight px-2"
            />

            <p className="text-zinc-400 text-sm sm:text-base md:text-sm max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto inter italic px-4">
              Listen to the music you love, without interruptions. Search, play
              and explore, all in one place.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
            <div className="border border-zinc-800 p-1 rounded-sm">
              <a
                href="https://github.com/Harshit-Parmar555/"
                target="_blank"
                className="flex items-center gap-2 shadow-[0_4px_14px_rgba(0,118,255,0.35)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.5)] hover:bg-black/80 px-4 py-2 bg-black rounded-sm text-white text-xs font-light transition duration-200 ease-linear"
              >
                <UserCog className="h-4 w-4" />
                Meet Developer
              </a>
            </div>

            <div className="border border-zinc-800 p-1 rounded-sm">
              <a
                href="https://github.com/Harshit-Parmar555/"
                target="_blank"
                className="flex items-center gap-2 shadow-[0_4px_14px_rgba(0,118,255,0.35)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.5)] hover:bg-white px-4 py-2 bg-white rounded-sm text-black text-xs font-light transition duration-200 ease-linear"
              >
                <Star className="h-4 w-4" />
                Star on Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
