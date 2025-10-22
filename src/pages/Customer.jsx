import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import MyReservations from "./MyReservations";
import EditProfile from "./EditProfile";

function Customer() {
	const location = useLocation();
	const isProfile = location.pathname === "/customer/profile";

	return (
		<>
			<Navbar />
			<div className="bg-gray-50">
				<div className="container mx-auto max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-4 py-6 sm:py-8">
					{/* Tabs */}
					<div className="flex justify-center mb-6 sm:mb-8">
						<div className="bg-white rounded-lg shadow-md p-1 flex flex-col sm:flex-row w-full sm:w-auto">
							<Link
								to="/customer"
								className={`px-4 sm:px-6 py-3 rounded-md font-medium transition-colors text-center ${
									!isProfile ? "bg-[#b4e172] text-[#1a475b]" : "text-gray-600 hover:bg-gray-100"
								}`}
							>
								My Reservations
							</Link>
							<Link
								to="/customer/profile"
								className={`px-4 sm:px-6 py-3 rounded-md font-medium transition-colors text-center ${
									isProfile ? "bg-[#b4e172] text-[#1a475b]" : "text-gray-600 hover:bg-gray-100"
								}`}
							>
								Edit Profile
							</Link>
						</div>
					</div>

					{/* Tab Content */}
					<div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
						{isProfile ? <EditProfile /> : <MyReservations />}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Customer;
