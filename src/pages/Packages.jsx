import React, { useEffect, Suspense, lazy } from "react";

// Lazy load components for better performance
const Navbar = lazy(() => import("../sections/Navbar"));
const Steps = lazy(() => import("../components/Steps"));
const AllPackages = lazy(() => import("../sections/AllPackages"));
const Footer = lazy(() => import("../sections/Footer"));
import selectedPackageStore from "../store/selectedPackage";

function Packages() {
	const { packages, payload } = selectedPackageStore();

	useEffect(() => {
		// console.log("API Response:", packages);
	}, [packages, payload]);

	if (!packages || packages.length === 0) {
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
					<p>No packages found for this search.</p>
				</div>
				<Footer />
			</Suspense>
		);
	}

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
			<AllPackages data={packages} />
			<Footer />
		</Suspense>
	);
}

export default Packages;
