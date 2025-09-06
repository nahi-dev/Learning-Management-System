import React from "react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";
const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="test-xl md:text-4xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, fugit
        dolorem unde nemo numquam, iure error ullam, consectetur nesciunt aut
        sed.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-10 py-3 rounded-md text-white bg-blue-500">
          Get started
        </button>
        <button className="flex items-center gap-2">
          Learn more <Image src={assets.arrow_icon} alt="arrow_icon" />{" "}
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
