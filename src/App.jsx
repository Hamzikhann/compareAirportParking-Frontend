import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Packages = lazy(() => import("./pages/Packages"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Payment = lazy(() => import("./pages/Payment"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Customer = lazy(() => import("./pages/Customer"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingSpinner = () => (
	<div className="min-h-screen flex items-center justify-center">
		<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b4e172]"></div>
	</div>
);

function App() {
	return (
		<>
			<Router>
				<Suspense fallback={<LoadingSpinner />}>
					<Routes>
						<Route path="/adminLogin" element={<AdminLogin />} />
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminDashboard />
								</ProtectedRoute>
							}
						/>
						<Route path="/" element={<Home />} />
						<Route path="/packages" element={<Packages />} />
						<Route path="/package-details" element={<PackageDetails />} />
						<Route path="/checkout" element={<CheckOut />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/confirmation" element={<Confirmation />} />
						<Route path="/customer" element={<Customer />} />
						<Route path="/customer/profile" element={<Customer />} />
						<Route path="/how-it-works" element={<HowItWorks />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>

			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
				pauseOnFocusLoss
			/>
		</>
	);
}

export default App;
