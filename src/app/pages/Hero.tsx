"use client";
import { FC } from "react";
import Image from "next/image";

type HeroProps = {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

const Hero: FC<HeroProps> = ({ url, setUrl, handleSubmit, loading }) => {
  return (
    <div className="flex flex-col items-center px-10 md:px-40 pt-8 w-full h-[calc(100vh-88px)] relative overflow-hidden">
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-snug">
          Suck Images <br /> From any{" "}
          <span className="text-yellow-400">public website</span>
        </h1>
        <p className="text-white text-sm bg-[#575756] border px-6 py-2 rounded-full">
          No.1 image scraping tool
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 bg-white rounded-3xl px-4 py-4 w-full max-w-lg mt-8 shadow-lg"
      >
        <Image src="/Link.png" alt="search icon" width={30} height={30} />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the URL like google.com"
          className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
          required
        />
        <button
          type="submit"
          className="bg-[#575756] px-6 py-2 text-white font-bold text-lg rounded-2xl hover:bg-[#575757] transition"
        >
          Suck
        </button>
      </form>

      {/* Loading Bar */}
      {loading && (
        <div className="w-full max-w-lg mt-4">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 animate-pulse w-[60%] rounded-full"></div>
          </div>
          <p className="text-sm text-white mt-2 text-center">Scraping images...</p>
        </div>
      )}

      <Image
        src="/Group 3.png"
        alt="landscape"
        className="absolute bottom-0 w-[300px] md:w-[500px]"
        width={500}
        height={250}
      />
    </div>
  );
};

export default Hero;
