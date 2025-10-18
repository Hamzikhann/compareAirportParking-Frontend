import React, { useEffect } from "react";
import Navbar from "../sections/Navbar";
import Steps from "../components/Steps";
import AllPackages from "../sections/AllPackages";
import Footer from "../sections/Footer";
import selectedPackageStore from "../store/selectedPackage";


function Packages() {
  const { packages, payload } = selectedPackageStore();

  useEffect(() => {
    // console.log("API Response:", packages);
  }, [packages, payload]);

  if (!packages || packages.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[60vh] text-gray-600">
          <p>No packages found for this search.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Steps />
      <AllPackages data={packages} />
      <Footer />
    </>
  );
}

export default Packages;
