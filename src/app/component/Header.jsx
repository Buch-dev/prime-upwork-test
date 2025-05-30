"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const LANGUAGES = [
  {
    key: "EN",
    label: "English",
    icon: "/uk.svg",
    buttonIcon: "/uk.jpg",
  },
  {
    key: "GR",
    label: "Greek",
    icon: "/greek.svg",
    buttonIcon: "/greek.svg",
  },
];

function Header() {
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const langRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLang(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black rounded-full p-1 text-white flex items-center justify-between w-full max-w-[1200px] mx-auto mt-4 shadow-lg">
      <Link
        href="/"
        className="font-bold text-2xl ml-2.5 flex items-center gap-2"
      >
        <Image src="/logo.svg" width={108} height={17.26} alt="logo" priority />
      </Link>
      <nav className="hidden md:flex flex-row gap-4 lg:gap-8">
        <Link
          href="/"
          className="font-semibold text-sm md:text-[11px] hover:underline transition"
        >
          Post a Job
        </Link>
        <Link
          href="/"
          className="font-semibold text-sm md:text-[11px] hover:underline transition"
        >
          Explore Jobs
        </Link>
        <Link
          href="/"
          className="font-semibold text-sm md:text-[11px] hover:underline transition"
        >
          How it Works
        </Link>
      </nav>
      <div className="flex items-center gap-2 text-xs">
        {/* Language Selector Button */}
        <div className="relative" ref={langRef}>
          <button
            className="hidden md:flex bg-black border border-[#94949480] text-white font-medium py-1 px-2 rounded-full items-center gap-2 hover:bg-gray-900 transition"
            onClick={() => setShowLang((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={showLang}
          >
            <Image
              src={selectedLang.buttonIcon}
              width={24}
              height={24}
              alt={selectedLang.key}
              className="rounded-full"
            />
            <span>{selectedLang.key}</span>
            <FiChevronDown
              size={16}
              className={`transition-transform ${
                showLang ? "rotate-180" : ""
              }`}
            />
          </button>
          {/* Dropdown */}
          {showLang && (
            <div className="absolute right-0 mt-2 w-[131px] bg-black rounded-xl shadow-lg z-50 py-2 animate-fade-in">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.key}
                  className={`flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-800 text-white transition ${
                    selectedLang.key === lang.key ? "bg-gray-900" : ""
                  }`}
                  onClick={() => {
                    setSelectedLang(lang);
                    setShowLang(false);
                  }}
                  aria-selected={selectedLang.key === lang.key}
                  tabIndex={0}
                >
                  <Image
                    src={lang.icon}
                    width={20}
                    height={20}
                    alt={lang.key}
                    className="rounded-full"
                  />
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="hidden md:block bg-black border border-[#94949480] text-white font-medium py-2 px-4 rounded-full hover:bg-gray-900 transition">
          Sign in
        </button>
        <button className="bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition">
          Sign Up
        </button>
        <button className="p-2 rounded-full bg-white text-black hover:bg-white/10 transition md:hidden">
          <Image
            src="/hugeicons_menu-square.svg"
            width={17.74}
            height={17.74}
            alt="menu-square"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
