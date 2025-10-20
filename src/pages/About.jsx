import React, { useEffect } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import { FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";

function About() {
	useEffect(() => {
		document.title = "About Us - Compare Airport Parking | Trusted Parking Solutions";
	}, []);

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-[#1a454e] mb-4">About Compare Airport Parking</h1>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							We're revolutionizing airport parking by making it easier than ever to find, compare, and book the best
							parking options for your travels.
						</p>
					</div>

					<div className="bg-white p-8 rounded-lg shadow-md mb-12">
						<h2 className="text-2xl font-bold text-[#1a454e] mb-6">Our Mission</h2>
						<p className="text-gray-600 mb-4">
							At Compare Airport Parking, our mission is to simplify the airport parking experience for travelers
							worldwide. We believe that finding parking shouldn't add stress to your journey.
						</p>
						<p className="text-gray-600">
							By aggregating parking options from trusted providers and presenting them in an easy-to-compare format, we
							help you make informed decisions quickly and confidently.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 mb-12">
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<FaUsers className="text-4xl text-[#b4e172] mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-[#1a454e] mb-2">Trusted by Millions</h3>
							<p className="text-gray-600">
								Over 2 million travelers have used our platform to find their perfect parking solution.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<FaShieldAlt className="text-4xl text-[#b4e172] mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-[#1a454e] mb-2">Secure & Reliable</h3>
							<p className="text-gray-600">
								We partner with verified parking providers and ensure secure transactions for every booking.
							</p>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-md text-center">
							<FaAward className="text-4xl text-[#b4e172] mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-[#1a454e] mb-2">Award-Winning Service</h3>
							<p className="text-gray-600">
								Recognized for excellence in customer service and innovation in travel technology.
							</p>
						</div>
					</div>

					<div className="bg-white p-8 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold text-[#1a454e] mb-6">Our Story</h2>
						<p className="text-gray-600 mb-4">
							Founded in 2018, Compare Airport Parking was born from the frustration of travelers dealing with confusing
							parking options and hidden fees. Our founders, experienced in the travel industry, saw an opportunity to
							create a transparent, user-friendly platform.
						</p>
						<p className="text-gray-600 mb-4">
							Today, we serve travelers across major airports in the United States, offering comprehensive parking
							solutions that save time and money. Our commitment to innovation and customer satisfaction drives
							everything we do.
						</p>
						<p className="text-gray-600">
							Join millions of satisfied customers and experience the difference with Compare Airport Parking.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default About;
