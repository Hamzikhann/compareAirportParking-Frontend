import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import Input from "../components/Input";
import Button from "../components/Button";

function Deals() {
	return (
		<>
			<section className="bg-gray-100 px-4 sm:px-8 lg:px-20 py-14 flex flex-col gap-6 items-center">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-800 text-center">Exclusive Deals</h1>
				<p className="text-base sm:text-lg font-light text-gray-700 w-full max-w-lg lg:max-w-[600px] text-center">
					Don’t miss out on our amazing deals and discount codes! Sign up and we'll send them to you by email.
				</p>
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
					<Input placeholder="Enter email..." rounded="rounded-md" width="w-full sm:w-[300px]" />
					<Button
						text="Subscribe"
						bg="bg-[#b4e172]"
						borderColor="border-[#b4e172]"
						textColor="text-[#1a475b]"
						icon2={IoMdArrowRoundForward}
					/>
				</div>
			</section>
		</>
	);
}

export default Deals;
