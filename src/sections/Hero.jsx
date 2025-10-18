import React from "react";
import bg from "/src/assets/hero.webp";
import Searchbar from "../components/Searchbar";
import { IoFlowerSharp } from "react-icons/io5";

function Hero() {
  return (
    <section
      className="w-full h-[85vh] bg-cover bg-center flex flex-col gap-5 items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
        <h1 className="text-5xl font-semibold">THE AIRPORT PARKING EXPERTS</h1>
        <h1 className="text-7xl font-bold -mt-2">FIND YOUR SPACE</h1>
        <Searchbar />
        <div className="flex items-center gap-3">
          <IoFlowerSharp size={20} className="text-[#b0e37f]"/>
          <p className="text-base font-bold text-white -ml-2">Secure Parking</p>
          <IoFlowerSharp size={20} className="text-[#b0e37f]"/>
           <p className="text-base font-bold text-white -ml-2">Shuttle Included</p>
           <IoFlowerSharp size={20} className="text-[#b0e37f]"/>
           <p className="text-base font-bold text-white -ml-2">Free Cancellation</p>
           <IoFlowerSharp size={20} className="text-[#b0e37f]"/>
           <p className="text-base font-bold text-white -ml-2">Easy Booking</p>
        </div>
    </section>
  );
}

export default Hero;
