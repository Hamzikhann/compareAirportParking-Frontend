import React, { Suspense, lazy, useState } from "react";

// Lazy load components for better performance
const Navbar = lazy(() => import("../sections/Navbar"));
const Footer = lazy(() => import("../sections/Footer"));
const Steps = lazy(() => import("../components/Steps"));
const Button = lazy(() => import("../components/Button"));

import {
	FaStar,
	FaCarAlt,
	FaParking,
	FaCheck,
	FaShieldAlt,
	FaMapMarkerAlt,
	FaPhone,
	FaClock,
	FaImages
} from "react-icons/fa";

import { IoMdArrowRoundForward, IoIosPricetag } from "react-icons/io";
import { GiCarKey } from "react-icons/gi";
import selectedPackageStore from "../store/selectedPackage";

function PackageDetails() {
	const { selectedPackage, selectedDetails } = selectedPackageStore();
	console.log(selectedDetails);
	const [activeTab, setActiveTab] = useState("overview");

	if (!selectedPackage) {
		return (
			<Suspense
				fallback={
					<div className="min-h-screen flex items-center justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b4e172]"></div>
					</div>
				}
			>
				<Navbar />
				<div className="flex justify-center items-center h-[60vh] text-gray-600">
					<p>No package selected. Please go back and select a parking package.</p>
				</div>
				<Footer />
			</Suspense>
		);
	}

	const { name, type, price, originalPrice, rating, image, features, amenities, cancellation, description, note } =
		selectedPackage;

	const sections = selectedDetails?.sections || {};
	const companyInfo = selectedDetails || {};

	// Function to safely render HTML content
	const renderHTML = (html) => {
		return { __html: html || "" };
	};

	// Calculate average rating from reviews
	const calculateAverageRating = () => {
		if (!sections.videos?.reviews) return rating || 0;
		const reviews = sections.videos.reviews;
		const total = reviews.reduce((sum, review) => sum + review.stars, 0);
		return (total / reviews.length).toFixed(1);
	};

	// Render star rating
	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);

		for (let i = 0; i < fullStars; i++) {
			stars.push(<FaStar key={i} className="text-yellow-400" size={16} />);
		}

		const emptyStars = 5 - stars.length;
		for (let i = 0; i < emptyStars; i++) {
			stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" size={16} />);
		}

		return stars;
	};

	// Extract address from overview content
	const extractAddress = () => {
		if (!sections.overview?.content) return null;
		const content = sections.overview.content;
		const addressMatch = content.match(/ADDRESS:-(.*?)(?=You must call|Directions:|$)/s);
		return addressMatch ? addressMatch[1].trim() : null;
	};

	const averageRating = calculateAverageRating();
	const totalReviews = sections.videos?.reviews?.length || 0;
	const address = extractAddress();

	// Tab configuration
	const tabs = [
		{ id: "overview", label: "Overview", icon: FaParking },
		{ id: "amenities", label: "Amenities", icon: FaShieldAlt },
		{ id: "location", label: "Location", icon: FaMapMarkerAlt },
		{ id: "reviews", label: "Reviews", icon: FaStar },
		...(sections.photos ? [{ id: "photos", label: "Photos", icon: FaImages }] : [])
	];

	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b4e172]"></div>
				</div>
			}
		>
			<Navbar />
			<Steps />

			<section className="min-h-screen bg-gray-50">
				{/* Hero Section */}
				<div className="relative h-80 bg-gradient-to-r from-[#15445f] to-[#1a5a7a]">
					<img className="w-full h-full object-cover mix-blend-overlay" src={image} alt={name} />
					<div className="absolute inset-0 bg-black bg-opacity-40"></div>
					<div className="absolute bottom-6 left-6 lg:left-20 text-white">
						<h1 className="text-3xl lg:text-4xl font-bold mb-2">{name}</h1>
						<p className="text-lg lg:text-xl opacity-90 max-w-2xl">{description}</p>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
					<div className="flex flex-col xl:flex-row gap-8">
						{/* Main Content */}
						<div className="flex-1">
							{/* Quick Info Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
								{/* Rating Card */}
								<div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 text-center border border-gray-100 hover:border-[#b4e172]/30">
									<div className="relative">
										<div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
											<FaStar className="text-white text-xs" />
										</div>
										<div className="flex justify-center mb-4">{renderStars(averageRating)}</div>
									</div>
									<div className="space-y-2">
										<p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#15445f] to-[#1a5a7a] bg-clip-text text-transparent mb-2">{averageRating}</p>
										<p className="text-gray-700 font-medium text-lg">Customer Rating</p>
										<div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
											<span className="text-sm text-gray-600 font-medium">{totalReviews} reviews</span>
										</div>
									</div>
								</div>

								{/* Service Type Card */}
								<div className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 border border-gray-100 hover:border-blue-200">
									<div className="flex items-center gap-4 mb-6">
										<div className="w-12 h-12 bg-gradient-to-r from-[#15445f] to-[#1a5a7a] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<GiCarKey className="text-white" size={24} />
										</div>
										<h3 className="text-xl font-bold text-gray-800">Service Type</h3>
									</div>
									<div className="space-y-3">
										<p className="text-gray-800 font-semibold text-lg">{type}</p>
										{companyInfo.serviceType && (
											<div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
												<p className="text-sm text-blue-700 font-medium">{companyInfo.serviceType}</p>
											</div>
										)}
									</div>
								</div>

								{/* Company Info Card */}
								<div className="group bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 border border-gray-100 hover:border-green-200">
									<div className="flex items-center gap-4 mb-6">
										<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<FaShieldAlt className="text-white" size={20} />
										</div>
										<h3 className="text-xl font-bold text-gray-800">Provider</h3>
									</div>
									<div className="space-y-3">
										<p className="text-gray-800 font-semibold text-lg">{companyInfo.companyName}</p>
										<div className="bg-green-50 rounded-lg p-3 border border-green-100">
											<p className="text-sm text-green-700 font-medium">{companyInfo.airportName}</p>
										</div>
									</div>
								</div>
							</div>

							{/* Navigation Tabs */}
							<div className="bg-white rounded-xl shadow-lg mb-8">
								<div className="border-b border-gray-200">
									<nav className="flex flex-wrap sm:flex-nowrap overflow-x-auto px-4 lg:px-6">
										{tabs.map((tab) => {
											const { id, label, icon: Icon } = tab;
											return (
												<button
													key={id}
													onClick={() => setActiveTab(id)}
													className={`py-4 px-2 lg:px-4 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${
														activeTab === id
															? "border-[#b4e172] text-[#15445f]"
															: "border-transparent text-gray-500 hover:text-gray-700"
													}`}
												>
													<Icon size={16} />
													{label}
												</button>
											);
										})}
									</nav>
								</div>

								{/* Tab Content */}
								<div className="p-4 lg:p-6">
									{/* Overview Tab */}
									{activeTab === "overview" && (
										<div className="space-y-6">
											<div>
												<h3 className="text-xl font-semibold text-gray-800 mb-4">About This Parking</h3>
												<p className="text-gray-700 leading-relaxed">{description}</p>
											</div>

											{/* Features Grid */}
											<div>
												<h4 className="text-lg font-semibold text-gray-800 mb-3">What's Included</h4>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
													{features.map((feature, idx) => (
														<div key={idx} className="flex items-center gap-3">
															<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
																<FaCheck size={12} className="text-green-600" />
															</div>
															<span className="text-gray-700">{feature}</span>
														</div>
													))}
												</div>
											</div>

											{/* Detailed Overview from API */}
											{sections.overview && (
												<div className="mt-6">
													<h4 className="text-lg font-semibold text-gray-800 mb-3">Detailed Information</h4>
													<div
														className="prose prose-sm max-w-none text-gray-700"
														dangerouslySetInnerHTML={renderHTML(sections.overview.html)}
													/>
												</div>
											)}

											{/* Return Procedure */}
											{sections.return && (
												<div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
													<h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
														<FaCarAlt className="text-blue-600" />
														Return Procedure
													</h4>
													<div className="text-gray-700 space-y-2">
														{sections.return.additionalInfo?.slice(0, 3).map((info, idx) => (
															<p key={idx} className="text-sm">
																• {info}
															</p>
														))}
													</div>
												</div>
											)}
										</div>
									)}

									{/* Amenities Tab */}
									{activeTab === "amenities" && (
										<div className="space-y-6">
											<h3 className="text-xl font-semibold text-gray-800 mb-4">Parking Amenities</h3>
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{amenities.map((amenity, idx) => (
													<div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
														<FaShieldAlt className="text-[#15445f]" size={18} />
														<span className="text-gray-700">{amenity}</span>
													</div>
												))}
											</div>

											{/* Additional Features */}
											<div className="mt-6">
												<h4 className="text-lg font-semibold text-gray-800 mb-3">Service Features</h4>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													{features.map((feature, idx) => (
														<div key={idx} className="flex items-center gap-3">
															<FaCheck className="text-green-500" size={16} />
															<span className="text-gray-700">{feature}</span>
														</div>
													))}
												</div>
											</div>
										</div>
									)}

									{/* Location Tab */}
									{activeTab === "location" && (
										<div className="space-y-6">
											<h3 className="text-xl font-semibold text-gray-800 mb-4">Location Details</h3>

											{/* Address Information */}
											{address && (
												<div className="bg-gray-50 rounded-lg p-4">
													<h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
														<FaMapMarkerAlt className="text-red-500" />
														Parking Address
													</h4>
													<p className="text-gray-700 whitespace-pre-line">{address}</p>
												</div>
											)}

											{/* Contact Information */}
											<div className="bg-blue-50 rounded-lg p-4">
												<h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
													<FaPhone className="text-blue-600" />
													Contact Information
												</h4>
												<div className="space-y-2 text-sm text-gray-700">
													<p>
														<strong>Operations:</strong> 07946 069129
													</p>
													<p>
														<strong>Customer Service:</strong> 0203 370 4220
													</p>
													<p className="flex items-center gap-2">
														<FaClock className="text-gray-600" />
														Operating Hours: 04:00 - 23:55
													</p>
												</div>
											</div>

											{/* Directions */}
											{sections.overview?.content?.includes("Directions:") && (
												<div className="bg-green-50 rounded-lg p-4">
													<h4 className="font-semibold text-gray-800 mb-2">Directions</h4>
													<p className="text-gray-700 text-sm">
														{sections.overview.content.split("Directions:")[1]?.split("Arrival Procedure:")[0]}
													</p>
												</div>
											)}
										</div>
									)}

									{/* Reviews Tab */}
									{activeTab === "reviews" && (
										<div className="space-y-6">
											<div className="flex items-center justify-between">
												<h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
												<div className="text-right">
													<p className="text-2xl font-bold text-gray-800">{averageRating}/5</p>
													<p className="text-sm text-gray-600">{totalReviews} reviews</p>
												</div>
											</div>

											{sections.videos?.reviews ? (
												<div className="space-y-4 max-h-96 overflow-y-auto">
													{sections.videos.reviews
														.filter((review) => review.hasText)
														.map((review, idx) => (
															<div key={idx} className="bg-gray-50 rounded-lg p-4">
																<div className="flex items-center gap-2 mb-2">
																	<div className="flex">{renderStars(review.stars)}</div>
																	<span className="text-sm text-gray-600">{review.author}</span>
																</div>
																<p className="text-gray-700 text-sm">{review.text}</p>
															</div>
														))}
												</div>
											) : (
												<p className="text-gray-500 text-center py-8">No reviews available yet.</p>
											)}
										</div>
									)}

									{/* Photos Tab */}
									{activeTab === "photos" && sections.photos && (
										<div className="space-y-6">
											<h3 className="text-xl font-semibold text-gray-800 mb-4">Parking Photos</h3>
											{sections.photos.photos ? (
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													{sections.photos.photos.map((photo, idx) => (
														<div key={idx} className="bg-gray-100 rounded-lg overflow-hidden">
															<img src={photo.src} alt={photo.alt} className="w-full h-48 object-cover" />
														</div>
													))}
												</div>
											) : (
												<div className="text-center py-8">
													<FaImages className="mx-auto text-gray-400 mb-3" size={48} />
													<p className="text-gray-500">No photos available for this parking location.</p>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Booking Sidebar */}
						<div className="w-full xl:w-96 flex-shrink-0">
							<div className="bg-white rounded-xl shadow-lg border border-gray-200 lg:sticky lg:top-6">
								{/* Price Header */}
								<div className="bg-gradient-to-r from-[#15445f] to-[#1a5a7a] text-white p-6 rounded-t-xl">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Total Price</span>
										{originalPrice && originalPrice !== "null" && (
											<span className="text-sm line-through opacity-75">{originalPrice}</span>
										)}
									</div>
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-bold">{price}</span>
										<span className="text-sm opacity-90">total</span>
									</div>
									{originalPrice && originalPrice !== "null" && (
										<div className="flex items-center gap-2 mt-2">
											<IoIosPricetag className="text-green-300" />
											<span className="text-sm text-green-300 font-medium">
												You save £
												{(
													parseFloat(originalPrice.replace(/[^\d.]/g, "")) - parseFloat(price.replace(/[^\d.]/g, ""))
												).toFixed(2)}
											</span>
										</div>
									)}
								</div>

								{/* Booking Info */}
								<div className="p-6 space-y-4">
									<div className="space-y-3 mb-6">
										{cancellation && (
											<div className="flex items-center gap-2 text-green-600">
												<FaCheck size={16} />
												<span className="text-sm">Free Cancellation Available</span>
											</div>
										)}
										<div className="flex items-center gap-2 text-green-600">
											<FaCheck size={16} />
											<span className="text-sm">Includes All Taxes & Fees</span>
										</div>
										<div className="flex items-center gap-2 text-green-600">
											<FaCheck size={16} />
											<span className="text-sm">24/7 Customer Support</span>
										</div>
									</div>

									<Button
										text="Reserve This Parking"
										bg="bg-[#b4e172]"
										borderColor="border-[#b4e172]"
										textColor="text-[#1a475b]"
										icon2={IoMdArrowRoundForward}
										link="/checkout"
										width="w-full"
										padding="py-4"
									/>

									{/* Important Note */}
									{note && (
										<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
											<p className="text-xs text-yellow-800">{note}</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</Suspense>
	);
}

export default PackageDetails;
