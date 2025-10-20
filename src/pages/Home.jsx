import React, { Suspense, lazy } from "react";

// Lazy load sections for better performance
const Navbar = lazy(() => import("../sections/Navbar"));
const Hero = lazy(() => import("../sections/Hero"));
const WhyUs = lazy(() => import("../sections/WhyUs"));
const HowItWorks = lazy(() => import("../sections/HowItWorks"));
const TopLocations = lazy(() => import("../sections/TopLocations"));
const Deals = lazy(() => import("../sections/Deals"));
const Footer = lazy(() => import("../sections/Footer"));

function Home() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b4e172]"></div>
				</div>
			}
		>
			<Navbar />
			<Hero />
			<WhyUs />
			<HowItWorks />
			<TopLocations />
			<Deals />
			<Footer />
		</Suspense>
	);
}

export default Home;
