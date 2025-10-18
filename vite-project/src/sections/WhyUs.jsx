import React from "react";
import img from "/src/assets/whyUs.webp";
import {
  FaMobileScreen,
  FaRegClock,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { FaUnlockAlt } from "react-icons/fa";

function WhyUs() {
  const data = [
    {
      icon: FaMobileScreen,
      title: "More Convinient",
      desc: "Do it all from your mobile. Enter the app, find parking, and reserve. It's that easy. Oh, and if your plans change, update your reservation.",
    },
    {
      icon: FaRegClock,
      title: "Faster",
      desc: "Stop stressing, circling, or being late because we always have a spot for you. With Parclick, reserve before you go out and always park on the first try.",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Cheaper",
      desc: "No last-minute surprises here. Compare prices, choose the best parking you find, and save every time you park.",
    },
    {
      icon: FaUnlockAlt,
      title: "And safer",
      desc: "Pay through the app, park only in verified car parks, and if you ever need help, contact us.",
    },
  ];
  return (
    <>
      <section className="bg-white px-20 py-14 flex flex-col gap-14 items-center">
        <h1 className="text-5xl text-gray-800">Why Park With Us?</h1>
        <div className="flex gap-10 justify-between w-full">
          <div className="flex flex-col gap-8 w-[52%]">
            {data.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <div className="flex gap-4 items-start">
                    <div className="rounded-md p-3 bg-[#b4df7a] bg-opacity-70 text-[##204845]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-base font-normal text-gray-700">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-300" />
                </div>
              );
            })}
          </div>
          <div>
            <img className="rounded-3xl" src={img} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUs;
