"use client";

import Image from "next/image";
import React, { useState } from "react";

const contracts = [
  "/contract.svg",
  "/contract.svg",
  "/contract.svg",
  "/contract.svg",
  "/contract.svg",
];

function Slider() {
  const [current, setCurrent] = useState(0);

  // Responsive visible slides
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg and up
      if (window.innerWidth >= 768) return 2; // md and up
    }
    return 1; // mobile
  };

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  React.useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Width for the slider container
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
                    idx !== contracts.length - 1 ? "0.5rem" : 0, // gap-2
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
        >
          <Image src={"/left.svg"} alt="left" width={11.69} height={11.69} />
        </button>
        <button
          className="flex items-center justify-center bg-white rounded-full w-[40.93px] h-[40.93px] shadow-lg cursor-pointer"
          onClick={handleNext}
        >
          <Image src={"/right.svg"} alt="right" width={11.69} height={11.69} />
        </button>
      </div>
    </section>
  );
}

export default Slider;
