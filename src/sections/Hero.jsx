import React from "react";
import bg from "/src/assets/hero.webp";
import Searchbar from "../components/Searchbar";
import { IoFlowerSharp } from "react-icons/io5";

function Hero() {
	return (
		<section
			className="w-full h-[85vh] bg-cover bg-center flex flex-col gap-5 items-center justify-center text-white px-4"
			style={{
				backgroundImage: `url(${bg})`
			}}
		>
			<h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-center">THE AIRPORT PARKING EXPERTS</h1>
			<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold -mt-2 text-center">FIND YOUR SPACE</h1>
			<Searchbar />
			<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 flex-wrap justify-center">
				<div className="flex items-center gap-1">
					<IoFlowerSharp size={16} className="text-[#b0e37f]" />
					<p className="text-sm sm:text-base font-bold text-white">Secure Parking</p>
				</div>
				<div className="flex items-center gap-1">
					<IoFlowerSharp size={16} className="text-[#b0e37f]" />
					<p className="text-sm sm:text-base font-bold text-white">Shuttle Included</p>
				</div>
				<div className="flex items-center gap-1">
					<IoFlowerSharp size={16} className="text-[#b0e37f]" />
					<p className="text-sm sm:text-base font-bold text-white">Free Cancellation</p>
				</div>
				<div className="flex items-center gap-1">
					<IoFlowerSharp size={16} className="text-[#b0e37f]" />
					<p className="text-sm sm:text-base font-bold text-white">Easy Booking</p>
				</div>
			</div>
		</section>
	);
}

export default Hero;
