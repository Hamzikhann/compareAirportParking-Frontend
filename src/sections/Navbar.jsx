import React, { useState, useEffect } from "react";
import logo from "/src/assets/compareparkinglogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Login from "../sections/Login";
import SignUp from "../sections/SignUp";
import useUserStore from "../store/userStore";
import { IoIosArrowDown, IoIosMenu, IoIosClose } from "react-icons/io";
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
			{/* Modern Navbar Design */}
			<nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<Link to="/" className="flex-shrink-0 flex items-center group">
							<div className="flex items-center space-x-3">
								<img
									className="h-[3.75rem] w-auto transition-transform duration-300 group-hover:scale-110"
									src={logo}
									alt="Compare Airport Parking"
								/>
								{/* <div className="hidden sm:block">
									<div className="text-lg font-bold text-gray-900 leading-tight">Compare Airport</div>
									<div className="text-sm font-semibold text-[#b4e172] leading-tight">Parking</div>
								</div> */}
							</div>
						</Link>

						{/* Desktop Navigation Links */}
						<div className="hidden lg:flex items-center space-x-8">
							{navLinks.map((item, index) => (
								<Link
									key={index}
									to={item.link}
									className="text-gray-700 hover:text-[#1a454e] font-medium transition-colors duration-200 relative group"
								>
									{item.title}
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b4e172] transition-all duration-300 group-hover:w-full"></span>
								</Link>
							))}
						</div>

						{/* Desktop Auth Section */}
						<div className="hidden lg:flex items-center space-x-4">
							{isLoggedIn && (user?.role?.title === "Administrator" || user?.role?.title === "Subadmin") ? (
								<>
									<button
										onClick={() => setOpenLogin(true)}
										className="text-gray-700 hover:text-[#1a454e] font-medium transition-colors duration-200"
									>
										Sign In
									</button>
									<button
										onClick={() => setOpenSignup(true)}
										className="bg-[#b4e172] hover:bg-[#a3d66a] text-[#1a475b] font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm"
									>
										Register
									</button>
								</>
							) : isLoggedIn ? (
								<div className="relative">
									<button
										onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
										className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200"
									>
										<div className="w-8 h-8 bg-gradient-to-br from-[#b4e172] to-[#1a475b] rounded-full flex items-center justify-center text-white text-sm font-bold">
											{user?.firstName?.charAt(0) || "U"}
										</div>
										<span className="font-medium">Account</span>
										<IoIosArrowDown
											className={`transition-transform duration-200 ${accountDropdownOpen ? "rotate-180" : ""}`}
										/>
									</button>

									{accountDropdownOpen && (
										<div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
											<div className="px-4 py-3 border-b border-gray-100">
												<p className="text-sm font-medium text-gray-900">
													{user?.firstName} {user?.lastName}
												</p>
												<p className="text-sm text-gray-500 truncate">{user?.email}</p>
											</div>

											<button
												onClick={() => handleAccountOption("my-reservations")}
												className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
											>
												<svg
													className="w-5 h-5 mr-3 text-gray-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
													/>
												</svg>
												My Reservations
											</button>

											<button
												onClick={() => handleAccountOption("edit-profile")}
												className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
											>
												<svg
													className="w-5 h-5 mr-3 text-gray-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
												Edit Profile
											</button>

											<div className="border-t border-gray-100 mt-2 pt-2">
												<button
													onClick={() => handleAccountOption("logout")}
													className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
												>
													<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
														/>
													</svg>
													Logout
												</button>
											</div>
										</div>
									)}
								</div>
							) : (
								<>
									<button
										onClick={() => setOpenLogin(true)}
										className="text-gray-700 hover:text-[#1a454e] font-medium transition-colors duration-200"
									>
										Sign In
									</button>
									<button
										onClick={() => setOpenSignup(true)}
										className="bg-[#b4e172] hover:bg-[#a3d66a] text-[#1a475b] font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm"
									>
										Register
									</button>
								</>
							)}
						</div>

						{/* Mobile menu button */}
						<div className="lg:hidden">
							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#1a454e] hover:bg-gray-50 transition-colors duration-200"
							>
								{mobileMenuOpen ? <IoIosClose className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="lg:hidden absolute top-16 inset-x-0 bg-white/98 backdrop-blur-lg border-b border-gray-200 shadow-xl z-40">
						<div className="px-4 pt-2 pb-6 space-y-1">
							{/* Mobile Navigation Links */}
							{navLinks.map((item, index) => (
								<Link
									key={index}
									to={item.link}
									onClick={() => setMobileMenuOpen(false)}
									className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1a454e] hover:bg-gray-50 rounded-lg transition-colors duration-200"
								>
									{item.title}
								</Link>
							))}

							{/* Mobile Auth Section */}
							<div className="border-t border-gray-200 pt-4 mt-4">
								{isLoggedIn && (user?.role?.title === "Administrator" || user?.role?.title === "Subadmin") ? (
									<div className="space-y-2">
										<button
											onClick={() => {
												setOpenLogin(true);
												setMobileMenuOpen(false);
											}}
											className="w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1a454e] hover:bg-gray-50 rounded-lg transition-colors duration-200"
										>
											Sign In
										</button>
										<button
											onClick={() => {
												setOpenSignup(true);
												setMobileMenuOpen(false);
											}}
											className="w-full text-left px-4 py-3 text-base font-medium bg-[#b4e172] text-[#1a475b] rounded-lg transition-colors duration-200"
										>
											Register
										</button>
									</div>
								) : isLoggedIn ? (
									<div className="space-y-1">
										<div className="px-4 py-3 border-b border-gray-100">
											<p className="text-sm font-medium text-gray-900">
												{user?.firstName} {user?.lastName}
											</p>
											<p className="text-sm text-gray-500">{user?.email}</p>
										</div>
										<button
											onClick={() => handleAccountOption("my-reservations")}
											className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
										>
											<svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
												/>
											</svg>
											My Reservations
										</button>
										<button
											onClick={() => handleAccountOption("edit-profile")}
											className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
										>
											<svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
											Edit Profile
										</button>
										<button
											onClick={() => handleAccountOption("logout")}
											className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
										>
											<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
												/>
											</svg>
											Logout
										</button>
									</div>
								) : (
									<div className="space-y-2">
										<button
											onClick={() => {
												setOpenLogin(true);
												setMobileMenuOpen(false);
											}}
											className="w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-[#1a454e] hover:bg-gray-50 rounded-lg transition-colors duration-200"
										>
											Sign In
										</button>
										<button
											onClick={() => {
												setOpenSignup(true);
												setMobileMenuOpen(false);
											}}
											className="w-full text-left px-4 py-3 text-base font-medium bg-[#b4e172] text-[#1a475b] rounded-lg transition-colors duration-200"
										>
											Register
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</nav>

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
