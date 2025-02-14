"use client"
import { useState } from "react";
import Image from "next/image";

function Hero() {
  const [url, setUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setImages(data.images);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-10 md:px-40 pt-8 w-full h-[calc(100vh-88px)] relative overflow-hidden">
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-snug">
          Suck Images <br /> From any <span className="text-yellow-400">public website</span>
        </h1>
        <p className="text-white text-sm bg-[#575756] border px-6 py-2 rounded-full">
          No.1 image scraping tool
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-white rounded-3xl px-4 py-4 w-full max-w-lg mt-8 shadow-lg">
        <Image src="/link.png" alt="search icon" width={30} height={30} />
        <input 
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the URL like google.com"
          className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
          required
        />
        <button type="submit" className="bg-[#575756] px-6 py-2 text-white font-bold text-lg rounded-2xl hover:bg-[#575757] transition">
          Suck
        </button>
      </form>

      <div className="flex flex-wrap justify-center mt-6">
        {images.map((img, idx) => (
          <Image key={idx} src={img} alt={`Scraped image ${idx}`} width={200} height={200} className="m-2" />
        ))}
      </div>

      <Image
        src="/Group 3.png"
        alt="landscape"
        className="mt-[70px] absolute bottom-0"
        width={1000}
        height={500}
      />
    </div>
  );
}

export default Hero;
