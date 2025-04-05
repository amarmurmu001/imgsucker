"use client";
import React, { useState } from "react";

type ResultProps = {
  images: string[];
};

const Result: React.FC<ResultProps> = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const toggleSelect = (img: string) => {
    setSelectedImages((prev) =>
      prev.includes(img) ? prev.filter((i) => i !== img) : [...prev, img]
    );
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg";
    link.click();
  };

  const downloadAll = () => {
    images.forEach((img) => downloadImage(img));
  };

  const downloadSelected = () => {
    selectedImages.forEach((img) => downloadImage(img));
  };

  if (!images.length) return null;

  return (
    <section className="px-6 md:px-20 py-12 bg-[#222222] text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Scraped Images</h2>
        <div className="flex gap-4">
          <button
            onClick={downloadAll}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            Download All
          </button>
          <button
            onClick={downloadSelected}
            disabled={selectedImages.length === 0}
            className={`${
              selectedImages.length
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            } px-4 py-2 rounded-lg font-semibold transition`}
          >
            Download Selected
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden border border-gray-700"
          >
            <img
              src={img}
              alt={`img-${index}`}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => setPreviewImage(img)}
            />
            <label className="absolute top-2 left-2 z-10">
              <input
                type="checkbox"
                checked={selectedImages.includes(img)}
                onChange={() => toggleSelect(img)}
                className="peer hidden"
              />
              <div className="w-5 h-5 bg-white border-2 border-yellow-400 rounded-sm peer-checked:bg-yellow-400 flex items-center justify-center transition">
                {selectedImages.includes(img) && (
                  <svg
                    className="w-3 h-3 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-white text-black font-bold px-3 py-1 rounded hover:bg-gray-200 z-50"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="rounded-lg w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Result;
