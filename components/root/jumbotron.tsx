import React from "react";
import { Image } from "@heroui/image";

export default function Jumbotron() {
  return (
    <div className="relative w-fit h-fit bg-black">
      <Image
        src={"/img/bckg.png"}
        alt="Jumbotron Image"
        width={10000}
        className="object-fill w-[1000vw] rounded-none z-0"
      />
      <div className="absolute w-full h-full flex top-0 left-0 bg-black/50 z-10">
        <div className="m-auto">
          <div className="text-white text-center">
            <div className="text-4xl lg:text-6xl font-black">
              Web Monitoring
            </div>
            <div className="text-xl lg:text-4xl">
              Beasiswa{" "}
              <span className="text-[#09697E]" id="tentang-beasiswa">
                Tiga Serangkai University
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
