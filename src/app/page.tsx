"use client";
import { useState } from "react";
import Hero from "./pages/Hero";
import Result from "./pages/Result";
export default function Home() {
   const [url, setUrl] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
  
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
        setLoading(false);
      }
    };
  return (
    <div >
       <Hero url={url} setUrl={setUrl} handleSubmit={handleSubmit} loading={loading} />
       <Result images={images} />
    </div>
  )
}
