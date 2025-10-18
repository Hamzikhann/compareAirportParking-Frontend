import React, { useRef } from "react";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Steps from "../components/Steps";
import Button from "../components/Button";
import img from "/src/assets/parking.jpg"; 
import { FaStar, FaCarAlt, FaParking, FaCheck } from "react-icons/fa";
import { FaLocationDot, FaPlaneUp, FaRegClock } from "react-icons/fa6";
import { IoMdArrowRoundForward } from "react-icons/io";
import selectedPackageStore from "../store/selectedPackage";

function PackageDetails() {
  const { selectedPackage } = selectedPackageStore();
  if (!selectedPackage) {
    return <p>No package selected.</p>;
  }
  const detailsRef = useRef(null);
  const amenitiesRef = useRef(null);
  const locationRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <Navbar />
      <Steps />
      <section className="px-20 pb-16 flex flex-col gap-5">
        <div className="w-full">
          <img
            className="w-[100%] h-[400px] rounded-lg"
            src={selectedPackage.image}
            alt=""
          />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          {selectedPackage.name}
        </h1>
        <div className="flex gap-12">
          <div className="flex flex-col gap-5 w-[67%]">
            <div className="flex items-center gap-5">
              <div className="px-4 py-4 rounded-md bg-[#f5f8f8] flex items gap-3">
                <div>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{selectedPackage.rating}</p>
                  <p className="flex items-center gap-0.5 text-yellow-400">
                    <FaStar size={14} />
                    <FaStar size={14} />
                    <FaStar size={14} />
                    <FaStar size={14} />
                    <FaStar size={14} />
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800 mb-1">Great</p>
                  <p className="text-sm font-normal text-blue-500 mb-1">
                    (786 rating)
                  </p>
                </div>
              </div>
              <div className="px-4 py-4 rounded-md bg-[#f5f8f8] flex flex-col items gap-3">
                <p className="flex items-center gap-2 text-gray-600 font-normal text-base">
                  <FaLocationDot size={20} />{" "}
                  <p>27299 Wick Road , Taylor , Michigan , US 48180</p>
                </p>
                <p className="flex items-center gap-2 text-gray-600 font-normal text-base">
                  <FaPlaneUp size={20} /> <p>2.1 miles to DTW</p>
                </p>
              </div>
            </div>
            <p className="flex items-center gap-2 text-gray-600 font-light text-base">
              <FaRegClock size={20} /> <p>Open 24/7</p>
            </p>
            <p className="flex items-center gap-2 text-gray-600 font-light text-base">
              <FaCarAlt size={20} /> <p>Free Shuttle</p>
            </p>
            <p className="flex items-center gap-2 text-gray-600 font-light text-base">
              <FaParking size={20} /> <p>Parking Type: {selectedPackage.type}</p>
            </p>
            {/* Tabs */}
            <div className="bg-white mt-5">
              {/* --- Tabs Header --- */}
              <div className="flex gap-10 border-b border-gray-300 p-3 mb-10 lg:sticky lg:top-0 lg:z-40 bg-white">
                <button
                  onClick={() => scrollToSection(detailsRef)}
                  className="text-gray-700 font-medium hover:text-[#17465c] transition"
                >
                  Details
                </button>
                <button
                  onClick={() => scrollToSection(amenitiesRef)}
                  className="text-gray-700 font-medium hover:text-[#17465c] transition"
                >
                  Amenities
                </button>
                <button
                  onClick={() => scrollToSection(locationRef)}
                  className="text-gray-700 font-medium hover:text-[#17465c] transition"
                >
                  Location
                </button>
              </div>

              {/* --- DETAILS SECTION --- */}
              <section ref={detailsRef} className="mb-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Operation Hours
                </h2>
                <p className="text-gray-700 mb-4">
                  The parking lot and your vehicle is available 24 hours a day,
                  7 days a week.
                </p>
                <div className="border border-gray-300 rounded-md overflow-hidden text-center text-sm text-gray-700">
                  <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-300">
                    {[
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <div
                        key={day}
                        className="p-2 border-r last:border-r-0 border-gray-300"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="p-2">Available 24 hours every day</div>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-2 text-gray-800">
                    Arrival Info
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>
                      Guests will drop off their vehicle at 27299 Wick Rd and be
                      transported via free shuttle to their terminal.
                    </li>
                    <li>
                      Vehicle will be moved by insured staff to a secure parking
                      facility.
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-2 text-gray-800">
                    Airport Transportation
                  </h3>
                  <p className="text-gray-700">
                    Shuttles are available 24 hours daily and operate every 15
                    minutes.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-2 text-gray-800">
                    Shuttle Hours
                  </h3>
                  <p className="text-gray-700 mb-2">
                    The shuttle service is available 24/7.
                  </p>
                  <div className="border border-gray-300 rounded-md overflow-hidden text-center text-sm text-gray-700">
                    <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-300">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => (
                        <div
                          key={day}
                          className="p-2 border-r last:border-r-0 border-gray-300"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="p-2">Available 24 hours every day</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-2 text-gray-800">
                    Additional Info
                  </h3>
                  <p className="text-gray-700">
                    Valet Connections is located within minutes of the airport.
                    Free shuttles run every 15 minutes, 24/7. Make sure to
                    arrive at least 15 minutes before your terminal time.
                  </p>
                  <p className="text-gray-700 mt-3">
                    Book your reservation at{" "}
                    <span className="text-[#17465c] font-medium">
                      AirportParkingReservations.com
                    </span>
                  </p>
                </div>
              </section>

              {/* --- AMENITIES SECTION --- */}
              <section ref={amenitiesRef} className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5 text-gray-700">
                  {[
                    "Car Care",
                    "Car Wash",
                    "Exterior Fence",
                    "Open 24 Hours",
                    "Security Cameras",
                    "EV Charging",
                    "Handicap",
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <span className="text-[#17465c] text-lg">✔</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* --- LOCATION SECTION --- */}
              <section ref={locationRef}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Location
                </h2>
                <p className="text-gray-700">
                  27299 Wick Rd, Detroit, MI 48174, United States
                </p>
                <div className="mt-6">
                  <iframe
                    title="map"
                    className="w-full h-72 rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.3836282660875!2d-83.3349386845432!3d42.225941979193896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b4c0b7274cf8d%3A0x6270f4c558fdf9b0!2sDetroit%20Metropolitan%20Wayne%20County%20Airport!5e0!3m2!1sen!2sus!4v1716222329556!5m2!1sen!2sus"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-[32%]">
            <div className="bg-white flex flex-col gap-3 rounded-md shadow-lg border border-gray-300 px-5 py-5 w-full lg:sticky lg:top-3 lg:z-40">
              <div className="text-end">
                <button className="px-4 py-2 rounded-md bg-red-500 text-white text-lg cursor-auto">
                  Limited Offer
                </button>
                <p className="font-semibold text-lg text-gray-800 mt-2">
                  from{" "}
                  <span className="text-base font-normal text-gray-700">
                    {selectedPackage.originalPrice}{" "}
                  </span>
                  to {selectedPackage.price}{" "}
                  <span className="text-base font-normal text-gray-700">
                    per day
                  </span>
                </p>
                <p className="font-bold text-xl text-gray-800 mt-2">
                  {selectedPackage.price}{" "}
                  <span className="font-normal text-gray-700">Total</span>
                </p>
              </div>
              <Button
                text="Reserve Parking"
                bg="bg-[#b4e172]"
                borderColor="border-[#b4e172]"
                textColor="text-[#1a475b]"
                icon2={IoMdArrowRoundForward}
                link="/checkout"
                width="w-full"
              />
              <div className="flex flex-col gap-3 items-center mt-2">
                <p className="flex items-center  gap-1 text-center text-green-600 font-normal text-base">
                  <FaCheck size={16} /> Total includes taxes and fees
                </p>
                <p className="flex items-center gap-1 text-center text-green-600 font-normal text-base">
                  <FaCheck size={16} /> Free Cancellation
                </p>
              </div>
              <hr className="border-0.5 border-gray-300" />
              <p className="text-gray-800 font-normal text-base">
                You save $108* by parking here
              </p>
              <p className="text-gray-600 font-light text-sm">
                *Compared to the general price of parking at DTW for 27 full
                days.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PackageDetails;
