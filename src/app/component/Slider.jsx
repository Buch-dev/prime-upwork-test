"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

// Responsive slides count
function useVisibleSlides() {
  const [visibleSlides, setVisibleSlides] = useState(3);
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

  // Slide navigation
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

  // Reset current if visibleSlides changes and current is out of range
  useEffect(() => {
    if (current > contracts.length - visibleSlides) setCurrent(0);
    // eslint-disable-next-line
  }, [visibleSlides]);

  // Responsive container max width
  const maxWidths = {
    1: "max-w-[98vw]",
    2: "max-w-[960px]",      // Slightly wider for 2 slides
    3: "max-w-[1440px]",    // Slightly less for 3 slides
  };

  return (
    <section className="flex flex-col items-center justify-center mt-10 lg:mt-16 w-full px-2">
      <h2>
        <Image
          src={"/successful-contract.svg"}
          alt="heading"
          width={277.5}
          height={31}
        />
      </h2>
      <div className="mt-7 flex w-full justify-center">
        <div
          className={`overflow-hidden relative w-full ${
            maxWidths[visibleSlides] || "max-w-[1440px]"
          } mx-auto`}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out gap-2"
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
                }}
              >
                <div className="w-full aspect-[467/486] bg-[#f3f3f3] rounded-xl overflow-hidden relative">
                  <Image
                    src={src}
                    alt="contract"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
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
