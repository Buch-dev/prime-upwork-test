"use client";

import Image from "next/image";
import React, { useState } from "react";

function Hero() {
  const [showTalent, setShowTalent] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [selectedDropdown, setSelectedDropdown] = useState("Talent");

  // Dropdown options
  const dropdownOptions = [
    {
      key: "Talent",
      icon: "/people.svg",
      title: "Talent",
      desc: "Hire professionals effortlessly.",
    },
    {
      key: "Client",
      icon: "/person.svg",
      title: "Client",
      desc: "Apply to jobs posted by clients",
    },
  ];

  return (
    <section className="relative mt-7 flex flex-col items-center justify-center">
      <Image
        src={"/young-woman-works.svg"}
        alt="hero-image"
        width={335}
        height={285}
        className="rounded-xl md:hidden"
      />
      <Image
        src={"/hero-image-tablet.svg"}
        width={780}
        height={387.65}
        alt="hero-image-tablet"
        className="hidden md:block lg:hidden"
      />
      <Image
        src={"/hero-image-desktop.svg"}
        width={1200.04}
        height={596.4}
        alt="hero-image-tablet"
        className="hidden lg:block"
      />
      <div className="-mt-11 flex flex-col gap-2 md:-mt-14 lg:-mt-20">
        {/* Slider dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setActiveDot(idx)}
              className="focus:outline-none"
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  idx === activeDot
                    ? "bg-[#D0FF00] w-3 h-3 shadow-lg scale-110"
                    : "bg-[#8C9959] w-2.5 h-2.5 opacity-70"
                }`}
                style={{
                  boxShadow: idx === activeDot ? "0 0 8px #D0FF00" : "none",
                }}
              />
            </button>
          ))}
        </div>
        <div className="bg-white flex items-center justify-center w-[207px] h-10 rounded-[50.83px] shadow-lg md:w-[241px] md:h-[46px] ">
          <p className="uppercase text-xs font-bold md:font-extrabold md:text-sm md:leading-[28.86px]">
            Education and Tutoring
          </p>
        </div>
      </div>
      {/* patterns */}
      <div className=" mt-7 flex flex-col gap-4">
        <Image
          src={"/rectangle-group.svg"}
          width={299}
          height={107}
          alt="rectangle"
          className="md:hidden"
        />
        <Image
          src={"/rectangle-play.svg"}
          width={299}
          height={107}
          alt="rectangle"
          className="md:hidden"
        />
        <Image
          src={"/rectangle-top-blur.svg"}
          width={299}
          height={107}
          alt="rectangle"
          className="hidden md:block absolute top-[27px] left-6 z-50 lg:left-[33px] lg:w-[472.92px] lg:h-[159.17px]"
        />
        {/* medium rectangles */}
        <Image
          src={"/rectangle-bottom-blur.svg"}
          width={289}
          height={106.5}
          alt="rectangle"
          className="hidden md:block absolute top-[90px] right-6 z-50 lg:w-[413.75px] lg:h-[150px]"
        />
      </div>
      <form className="bg-[#FFFFFF] flex items-center justify-between p-1 w-full rounded-full mt-8 shadow-lg md:absolute md:top-48 md:w-[462.5px] lg:top-[340px] lg:left-[260px] ">
        <Image
          width={41.86}
          height={41.68}
          alt="search-icon"
          src={"/search-icon.svg"}
        />
        <p className="text-[#737373] font-medium text-xs">
          Find a job, talent or service
        </p>
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-[#282F5426] border-[0.72px] border-[#CDCDCD] w-[88px] h-[41.7px] rounded-full transition-colors duration-200 hover:bg-[#e2e6f7] md:bg-white md:border-white"
          onClick={() => setShowTalent((prev) => !prev)}
        >
          <p className="text-[11.54px] font-medium text-[#474747] md:text-sm">
            {selectedDropdown}
          </p>
          <Image
            src={"/vector.svg"}
            width={7.22}
            height={12.98}
            alt="arrow-up"
            style={{
              transition: "transform 0.3s",
              transform: showTalent ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
      </form>
      {/* Animated dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showTalent
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } bg-white flex flex-col gap-2 items-end rounded-xl mt-2 shadow-lg p-3 self-end md:absolute md:-bottom-2 m-0 md:right-[120px]`}
        style={{
          minWidth: showTalent ? 0 : 0,
          maxHeight: showTalent ? 500 : 0,
        }}
      >
        {dropdownOptions.map((option) => (
          <button
            key={option.key}
            className={`flex items-start gap-1 w-full text-left rounded-lg px-2 py-1 transition-colors ${
              selectedDropdown === option.key
                ? "bg-[#D0FF00]/20"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setSelectedDropdown(option.key);
              setShowTalent(false);
            }}
          >
            <Image src={option.icon} width={22} height={22} alt={option.title} />
            <div className="flex flex-col">
              <h4 className="text-[#181818] text-sm leading-[21px] font-medium">
                {option.title}
              </h4>
              <p className="text-[11px] leading-[17px] text-[#3F3C3C]">
                {option.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
