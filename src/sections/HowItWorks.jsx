import React from "react";
import img from "/src/assets/work.webp";
import { IoMdArrowRoundForward } from "react-icons/io";
import Button from "../components/Button";

function HowItWorks() {
	const handleClick = () => {
		// Handle button click
	};

	return (
		<>
			<section className="bg-white px-4 sm:px-8 lg:px-24 py-14">
				<div className="bg-[#17485a] py-10 rounded-xl">
					<div className="flex flex-col lg:flex-row justify-between gap-8">
						<div className="flex flex-col px-4 sm:px-10 gap-2 w-full">
							<h1 className="text-white text-3xl sm:text-4xl lg:text-[50px] font-bold text-center lg:text-left">
								How It Works
							</h1>
							<p className="text-white text-base font-normal text-center lg:text-left">
								Find your space and reserve your airport parking in three easy steps
							</p>
							<div className="flex flex-col sm:flex-row items-center gap-6 mt-2 mb-6">
								<div className="flex flex-col items-center gap-1">
									<h1 className="text-[#b2dc7b] text-6xl sm:text-[80px] font-extrabold">1</h1>
									<h4 className="text-white font-semibold text-lg">Search</h4>
									<p className="text-sm sm:text-base font-normal text-white text-center">
										Choose your departure location, package type, and travel dates, then press search
									</p>
								</div>
								<div className="flex flex-col items-center gap-1">
									<h1 className="text-[#b2dc7b] text-6xl sm:text-[80px] font-extrabold">2</h1>
									<h4 className="text-white font-semibold text-lg">Compare</h4>
									<p className="text-sm sm:text-base font-normal text-white text-center">
										Review your results, filter based on preferences, then select the product that best fits your needs
									</p>
								</div>
								<div className="flex flex-col items-center gap-1">
									<h1 className="text-[#b2dc7b] text-6xl sm:text-[80px] font-extrabold">3</h1>
									<h4 className="text-white font-semibold text-lg">Reserve</h4>
									<p className="text-sm sm:text-base font-normal text-white text-center">
										Double-check your dates, time, and product details before proceeding to checkout
									</p>
								</div>
							</div>
							<div className="flex justify-center lg:justify-start">
								<Button
									text="How It Works"
									bg="bg-[#b4e172]"
									borderColor="border-[#b4e172]"
									textColor="text-[#1a475b]"
									icon2={IoMdArrowRoundForward}
									onClick={handleClick}
								/>
							</div>
						</div>
						<div className="w-full hidden lg:w-auto lg:flex justify-center">
							<img className="h-[300px] sm:h-[400px] lg:h-[450px] w-auto" src={img} alt="" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default HowItWorks;
