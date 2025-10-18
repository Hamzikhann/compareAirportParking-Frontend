import React from "react";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import WhyUs from "../sections/WhyUs";
import HowItWorks from "../sections/HowItWorks";
import TopLocations from "../sections/TopLocations";
import Deals from "../sections/Deals";
import Footer from "../sections/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyUs />
      <HowItWorks />
      <TopLocations />
      <Deals />
      <Footer />
    </>
  );
}

export default Home;