import React, { useEffect, useState } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Button from "../components/Button";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";

function ContactUs() {
	useEffect(() => {
		document.title = "Contact Us - Compare Airport Parking | Get in Touch";
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// In a real app, this would send the form data to a backend
		toast.success("Thank you for your message! We'll get back to you soon.");
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-[#1a454e] mb-4">Contact Us</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Have questions about airport parking? Need help with your booking? We're here to help!
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12">
						<div>
							<h2 className="text-2xl font-bold text-[#1a454e] mb-6">Get in Touch</h2>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4e172]"
									/>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4e172]"
									/>
								</div>
								<div>
									<label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
										Subject
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4e172]"
									/>
								</div>
								<div>
									<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
										Message
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows="5"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b4e172]"
									></textarea>
								</div>
								<Button
									type="submit"
									text="Send Message"
									bg="bg-[#b4e172]"
									borderColor="border-[#b4e172]"
									textColor="text-[#1a475b]"
								/>
							</form>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-[#1a454e] mb-6">Contact Information</h2>
							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<FaMapMarkerAlt className="text-2xl text-[#b4e172] mt-1" />
									<div>
										<h3 className="font-semibold text-[#1a454e]">Address</h3>
										<p className="text-gray-600">
											123 Airport Way
											<br />
											Travel City, TC 12345
											<br />
											United States
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<FaPhone className="text-2xl text-[#b4e172] mt-1" />
									<div>
										<h3 className="font-semibold text-[#1a454e]">Phone</h3>
										<p className="text-gray-600">
											(555) 123-PARK
											<br />
											Toll-free: 1-800-AIRPORT
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<FaEnvelope className="text-2xl text-[#b4e172] mt-1" />
									<div>
										<h3 className="font-semibold text-[#1a454e]">Email</h3>
										<p className="text-gray-600">
											support@compareairportparking.com
											<br />
											sales@compareairportparking.com
										</p>
									</div>
								</div>
								<div className="flex items-start space-x-4">
									<FaClock className="text-2xl text-[#b4e172] mt-1" />
									<div>
										<h3 className="font-semibold text-[#1a454e]">Business Hours</h3>
										<p className="text-gray-600">
											Monday - Friday: 9:00 AM - 6:00 PM EST
											<br />
											Saturday: 10:00 AM - 4:00 PM EST
											<br />
											Sunday: Closed
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default ContactUs;
