import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <div className="flex flex-col items-center px-10 md:px-40 pt-8 w-full  overflow-hidden">
      
        <div className="flex flex-col gap-4 items-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Suck Images
          </h1>
          <p className="text-white text-sm bg-[#575756] border px-6 py-2 rounded-full">
            From any public website
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white rounded-3xl px-4 py-4 w-full max-w-lg mt-8 shadow-lg">
          <Image src="/link.png" alt="search icon" width={30} height={30} />
          <input
            type="text"
            placeholder="Enter the URL like google.com"
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
          />
          <button className="bg-[#575756] px-6 py-2 text-white font-bold text-lg rounded-2xl hover:bg-[#575757]  transition">
            Suck
          </button>
        </div>
     

      <Image
        src="/Group 3.png"
        alt="landscape"
        className="mt-[70px]"
        width={1000}
        height={500}
      />
    </div>
  );
}

export default Hero;
