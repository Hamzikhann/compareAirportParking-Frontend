import React from "react";
import chicago from "/src/assets/chicago.webp";
import seatac from "/src/assets/seatac.webp";
import detroit from "/src/assets/detroit.webp";
import losAngles from "/src/assets/los-angles.webp";
import polis from "/src/assets/polis.webp";

function TopLocations() {
  return (
    <>
      <section className="bg-white px-20 py-16 flex flex-col gap-6 items-start">
        <h1 className="text-5xl text-gray-800">Top Locations</h1>
        <p className="text-lg font-normal text-gray-700">
          We sell airport parking at every major US and Canadian airport. Check
          out our most popular locations
        </p>
        <div className="grid grid-cols-3 gap-6 h-[80vh] w-full">
          {/* column-1 */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-[65%] overflow-hidden rounded-xl group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${chicago})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative flex items-center justify-center h-full">
                <h1 className="text-white text-4xl font-bold tracking-wide">
                  CHICAGO
                </h1>
              </div>
            </div>
            <div className="relative w-full h-[35%] overflow-hidden rounded-xl group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${seatac})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative flex items-center justify-center h-full">
                <h1 className="text-white text-4xl font-bold tracking-wide">
                  SEATAC
                </h1>
              </div>
            </div>
          </div>
          {/* column-2 */}
          <div className="relative w-full h-full overflow-hidden rounded-xl group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url(${detroit})` }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative flex items-center justify-center h-full">
              <h1 className="text-white text-4xl font-bold tracking-wide">
                DETROIT
              </h1>
            </div>
          </div>
          {/* column-3 */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-[35%] overflow-hidden rounded-xl group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${losAngles})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative flex items-center justify-center h-full">
                <h1 className="text-white text-4xl font-bold tracking-wide">
                  LOS ANGLES
                </h1>
              </div>
            </div>
            <div className="relative w-full h-[65%] overflow-hidden rounded-xl group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${polis})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative flex items-center justify-center h-full">
                <h1 className="text-white text-4xl font-bold tracking-wide">
                  MINNEAPOLIS
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopLocations;
