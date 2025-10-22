import React, { useState, useEffect } from "react";
import logo from "/src/assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Login from "../sections/Login";
import SignUp from "../sections/SignUp";
import useUserStore from "../store/userStore";
import { IoIosArrowDown } from "react-icons/io";
import { getToken, getSessionUser, logOut as clearSession } from "../services/AuthService";

function Navbar() {
	const { user, isLoggedIn, logOut, setUser } = useUserStore();
	const [openLogin, setOpenLogin] = useState(false);
	const [openSignup, setOpenSignup] = useState(false);
	const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = getToken();
		const storedUser = getSessionUser();
		if (token && storedUser && !isLoggedIn) {
			setUser(storedUser, token);
		}
	}, [isLoggedIn, setUser]);

	const handleLogout = () => {
		logOut();
		clearSession();
		navigate("/");
	};

	const handleAccountOption = (option) => {
		if (option === "logout") {
			handleLogout();
		} else if (option === "edit-profile") {
			navigate("/customer/profile");
		} else if (option === "my-reservations") {
			navigate("/customer");
		}
		setAccountDropdownOpen(false);
		setMobileMenuOpen(false);
	};

	const navLinks = [
		{ title: "Home", link: "/" },
		{ title: "How it works", link: "/how-it-works" },
		{ title: "About", link: "/about" },
		{ title: "Contact Us", link: "/contact-us" }
	];

	return (
		<>
			<div className="bg-white shadow-lg sticky top-0 z-50 relative">
				<div className="flex items-center justify-between gap-12 py-4 px-4 sm:px-14 border-b border-gray-100">
					<Link to="/" className="transition-transform hover:scale-105">
						<img className="w-auto h-10" src={logo} alt="Compare Airport Parking Logo" />
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-8">
						{navLinks.map((item, index) => (
							<Link to={item.link} key={index} className="group">
								<div className="text-lg font-medium text-gray-700 hover:text-[#1a454e] transition-colors duration-200 relative">
									{item.title}
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#b4e172] transition-all duration-200 group-hover:w-full"></span>
								</div>
							</Link>
						))}
					</div>

					{/* Desktop Auth Buttons */}
					<div className="hidden lg:flex items-center gap-3">
						{isLoggedIn && (user?.role?.title === "Administrator" || user?.role?.title === "Subadmin") ? (
							// ✅ Admin/Subadmin → show Sign In + Register only
							<>
								<Button onClick={() => setOpenLogin(true)} text="Sign In" />
								<Button
									onClick={() => setOpenSignup(true)}
									text="Register"
									bg="bg-[#b4e172]"
									borderColor="border-[#b4e172]"
									textColor="text-[#1a475b]"
								/>
							</>
						) : isLoggedIn ? (
							// ✅ Normal logged-in user → show My account dropdown
							<>
								<div className="relative">
									<button
										onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
										className="flex text-nowrap items-center gap-2 bg-[#b4e172] border border-[#b4e172] text-[#1a475b] py-2 px-4 rounded-md hover:bg-[#a3d66a]"
									>
										My account
										<IoIosArrowDown
											className={`transition-transform duration-200 ${accountDropdownOpen ? "rotate-180" : ""}`}
										/>
									</button>
									{accountDropdownOpen && (
										<div className="absolute right-0 mt-2 w-38 text-sm bg-white border border-gray-300 rounded-md shadow-lg z-20">
											<button
												onClick={() => handleAccountOption("my-reservations")}
												className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
											>
												My Reservations
											</button>
											<button
												onClick={() => handleAccountOption("edit-profile")}
												className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
											>
												Edit Profile
											</button>
											<button
												onClick={() => handleAccountOption("logout")}
												className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
											>
												Logout
											</button>
										</div>
									)}
								</div>
							</>
						) : (
							// ✅ Not logged in → show Sign In + Register
							<>
								<Button onClick={() => setOpenLogin(true)} text="Sign In" />
								<Button
									onClick={() => setOpenSignup(true)}
									text="Register"
									bg="bg-[#b4e172]"
									borderColor="border-[#b4e172]"
									textColor="text-[#1a475b]"
								/>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="text-gray-800 hover:text-[#1a454e] focus:outline-none transition-colors duration-200"
						>
							<svg
								className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileMenuOpen && (
					<div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-200 z-40 transition-all duration-300 ease-in-out opacity-100 translate-y-0">
						<div className="flex flex-col py-6 px-4 sm:px-14 space-y-6">
							{/* Navigation Links */}
							<div className="space-y-1">
								{navLinks.map((item, index) => (
									<Link
										to={item.link}
										key={index}
										onClick={() => setMobileMenuOpen(false)}
										className={`block px-4 py-3 text-lg font-medium text-gray-800 hover:text-[#1a454e] hover:bg-gradient-to-r hover:from-[#b4e172]/10 hover:to-transparent rounded-xl transition-all duration-300 group border border-transparent hover:border-[#b4e172]/20 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
											}`}
										style={{ transitionDelay: `${index * 50}ms` }}
									>
										{item.title}
									</Link>
								))}
							</div>

							{/* Divider */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-4 bg-white text-gray-500 font-medium">Account</span>
								</div>
							</div>

							{/* Auth Section */}
							<div className={`transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
								}`} style={{ transitionDelay: '200ms' }}>
								{isLoggedIn && (user?.role?.title === "Administrator" || user?.role?.title === "Subadmin") ? (
									// ✅ Admin/Subadmin → show Sign In + Register only
									<div className=" flex gap-2">
										<button
											onClick={() => { setOpenLogin(true); setMobileMenuOpen(false); }}
											className="w-full px-6 py-4 bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
										>
											Sign In
										</button>
										<button
											onClick={() => { setOpenSignup(true); setMobileMenuOpen(false); }}
											className="w-full px-6 py-4 bg-[#b4e172] hover:bg-[#a3d66a] text-[#1a475b] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
										>
											Register
										</button>
									</div>
								) : isLoggedIn ? (
									// ✅ Normal logged-in user → show account options
									<div className="space-y-2">
										<button
											onClick={() => handleAccountOption("my-reservations")}
											className="flex items-center px-4 py-3 text-gray-700 hover:text-[#1a454e] hover:bg-gradient-to-r hover:from-[#b4e172]/10 hover:to-transparent rounded-xl transition-all duration-300 group border border-transparent hover:border-[#b4e172]/20"
										>
											<div className="flex items-center space-x-3">
												<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
													<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
													</svg>
												</div>
												<span className="font-medium">My Reservations</span>
											</div>
										</button>

										<button
											onClick={() => handleAccountOption("edit-profile")}
											className="flex items-center px-4 py-3 text-gray-700 hover:text-[#1a454e] hover:bg-gradient-to-r hover:from-[#b4e172]/10 hover:to-transparent rounded-xl transition-all duration-300 group border border-transparent hover:border-[#b4e172]/20"
										>
											<div className="flex items-center space-x-3">
												<div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
													<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
													</svg>
												</div>
												<span className="font-medium">Edit Profile</span>
											</div>
										</button>

										<div className="pt-2 border-t border-gray-200">
											<button
												onClick={() => handleAccountOption("logout")}
												className="flex items-center px-4 py-3 text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent rounded-xl transition-all duration-300 group border border-transparent hover:border-red-200"
											>
												<div className="flex items-center space-x-3">
													<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
														<svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
														</svg>
													</div>
													<span className="font-medium">Logout</span>
												</div>
											</button>
										</div>
									</div>



								) : (
									// ✅ Not logged in → show Sign In + Register
									<div className="flex gap-4">
										<button
											onClick={() => { setOpenLogin(true); setMobileMenuOpen(false); }}
											className="w-full px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
										>
											Sign In
										</button>
										<button
											onClick={() => { setOpenSignup(true); setMobileMenuOpen(false); }}
											className="w-full px-6 py-4 bg-[#b4e172] hover:bg-[#a3d66a] text-[#1a475b] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
										>
											Register
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Modals */}
			<Login
				open={openLogin}
				onClose={() => setOpenLogin(false)}
				onOpenSignup={() => {
					setOpenLogin(false);
					setTimeout(() => setOpenSignup(true), 300);
				}}
			/>
			<SignUp
				open={openSignup}
				onClose={() => setOpenSignup(false)}
				onOpenLogin={() => {
					setOpenSignup(false);
					setTimeout(() => setOpenLogin(true), 300);
				}}
			/>
		</>
	);
}

export default Navbar;
