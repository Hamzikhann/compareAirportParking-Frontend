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
	};

	const navLinks = [
		{ title: "Home", link: "/" },
		{ title: "How it works", link: "/how-it-works" },
		{ title: "About", link: "/about" },
		{ title: "Contact Us", link: "/contact-us" }
	];

	return (
		<>
			<div className="bg-white shadow-lg sticky top-0 z-50 flex items-center justify-between gap-12 py-4 px-4 sm:px-14 border-b border-gray-100">
				<Link to="/" className="transition-transform hover:scale-105">
					<img className="w-auto h-10" src={logo} alt="Compare Airport Parking Logo" />
				</Link>

				{/* Mobile menu button */}
				<div className="lg:hidden">
					<button
						onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
						className="text-gray-800 hover:text-[#1a454e] focus:outline-none"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>

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

				{/* Mobile menu */}
				{accountDropdownOpen && (
					<div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40">
						<div className="flex flex-col py-4 px-4 space-y-4">
							{navLinks.map((item, index) => (
								<Link
									to={item.link}
									key={index}
									onClick={() => setAccountDropdownOpen(false)}
									className="text-lg font-medium text-gray-700 hover:text-[#1a454e] transition-colors duration-200"
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>
				)}

				<div className="flex items-center gap-3">
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
