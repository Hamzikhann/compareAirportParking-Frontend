import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import useUserStore from "../store/userStore";
import "react-toastify/dist/ReactToastify.css";
import selectedPackageStore from "../store/selectedPackage";

function PackageCard({ data }) {
  const navigate = useNavigate();
  const { setSelectedPackage } = selectedPackageStore();
  const { isLoggedIn } = useUserStore();

  if (!data || data.length === 0) {
    return <p>No packages available.</p>;
  }

  const formatTitle = (name) => {
    return name.toLowerCase().includes("luton")
      ? "Park Pilot - Luton"
      : `Park Pilot - ${name}`;
  };

  const handleParkHere = (item) => {
      setSelectedPackage(item);
      navigate("/package-details");
  };

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="w-full bg-gray-100 rounded-md shadow-xl px-4 py-6 mb-6"
        >
          <div className="flex flex-col justify-between gap-5">
            <img className="w-full h-[250px]" src={item.image} alt="" />
            {/* Content */}
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-3">
                {formatTitle(item.name)}
              </h2>
              <p className="text-gray-800 mb-3">{item.description}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {item.features.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheck size={16} className="text-green-400" />
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm font-light text-gray-600 font-serif mt-4">
                {item.note}
              </p>
            </div>

            {/* Price & Button */}
            <div className="flex items-center justify-between gap-4 mt-3">
              <h3 className="text-lg font-bold text-gray-700">
                {item.price.includes("Sorry") ? "This is Booked" : item.price}
              </h3>

              {!item.price.includes("Sorry") && (
                <button
                  onClick={() => handleParkHere(item)}
                  className="bg-[#b5e074] text-[#18454f] px-8 py-2 rounded-lg hover:bg-[#99d243] transition"
                >
                  Park Here
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PackageCard;
