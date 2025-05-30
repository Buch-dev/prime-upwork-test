"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

// Custom hook for responsive breakpoints
function useVisibleSlides() {
  const [visibleSlides, setVisibleSlides] = useState(3); // Default to 3 for desktop SSR

  useEffect(() => {
    function updateSlides() {
      if (window.innerWidth >= 1024) setVisibleSlides(3);
      else if (window.innerWidth >= 768) setVisibleSlides(2);
      else setVisibleSlides(1);
    }
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return visibleSlides;
}

const contracts = [
  "/contract.svg",
  "/contract.svg",
  "/contract.svg",
  "/contract.svg",
  "/contract.svg",
];

function Slider() {
  const visibleSlides = useVisibleSlides();
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) =>
      prev === 0 ? contracts.length - visibleSlides : prev - 1
    );
  };

  const handleNext = () => {
    setCurrent((prev) =>
      prev >= contracts.length - visibleSlides ? 0 : prev + 1
    );
  };

  // Responsive container width
  const slideWidth = 335;
  const containerWidth = slideWidth * visibleSlides;

  return (
    <section className="flex flex-col items-center justify-center mt-10 lg:mt-16">
      <h2>
        <Image
          src={"/successful-contract.svg"}
          alt="heading"
          width={277.5}
          height={31}
        />
      </h2>
      <div className="mt-7 flex w-full justify-center">
        {/* Responsive slider */}
        <div
          className="w-full max-w-[1005px] h-auto overflow-hidden relative"
          style={{ width: `${containerWidth}px` }}
        >
          <div
            className="transition-transform duration-500 ease-in-out flex"
            style={{
              width: `${(contracts.length / visibleSlides) * 100}%`,
              transform: `translateX(-${(current * 100) / contracts.length}%)`,
            }}
          >
            {contracts.map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0"
                style={{
                  width: `${100 / contracts.length}%`,
                  paddingRight:
                    idx !== contracts.length - 1 ? "0.5rem" : 0,
                }}
              >
                <div className="w-full aspect-[335/433] relative">
                  <Image
                    src={src}
                    alt="contract"
                    fill
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 mt-6">
        <button
          className="flex items-center justify-center bg-white rounded-full w-[40.93px] h-[40.93px] cursor-pointer"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <Image src={"/left.svg"} alt="left" width={11.69} height={11.69} />
        </button>
        <button
          className="flex items-center justify-center bg-white rounded-full w-[40.93px] h-[40.93px] shadow-lg cursor-pointer"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <Image src={"/right.svg"} alt="right" width={11.69} height={11.69} />
        </button>
      </div>
    </section>
  );
}

export default Slider;
