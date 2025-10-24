import React from "react";
import bg from "/src/assets/background.jpg";
import Searchbar from "../components/Searchbar";
import { IoFlowerSharp } from "react-icons/io5";

function Hero() {
	return (
		<section
			className="w-full min-h-screen bg-cover bg-center flex flex-col gap-5 items-center justify-center text-white px-4 relative"
			style={{
				backgroundImage: `url(${bg})`
			}}
		>
			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50"></div>

			{/* Content */}
			<div className="relative z-10 flex flex-col gap-5 items-center justify-center text-center">
				<h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold">THE AIRPORT PARKING EXPERTS</h1>
				<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold -mt-2">FIND YOUR SPACE</h1>
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
			</div>
		</section>
	);
}

export default Hero;
