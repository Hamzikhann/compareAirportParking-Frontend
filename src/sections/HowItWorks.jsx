import React from "react";
import img from "/src/assets/work.webp";
import { IoMdArrowRoundForward } from "react-icons/io";
import Button from "../components/Button";
import useCheckoutStore from "../store/checkoutStore";
import useUserStore from "../store/userStore";
import bookingDataStore from "../store/bookingDataStore";

function HowItWorks() {
  const checkoutData = useCheckoutStore((state) => state.checkoutData);
  const user = useUserStore((state) => state.user);
  const data2 = bookingDataStore((state) => state.bookingData);
  const handleClick = () => {
    console.log("Zustand User:", user);
  };
  const data = [
    {
      title: "Unbeatable parking options",
      desc: "The widest selection of parking options at all major US airports, at the best possible price",
    },
    {
      title: "Parking peace of mind",
      desc: "Travel with confidence, knowing your airport parking spot is guaranteed",
    },
    {
      title: "Putting you in the driving seat",
      desc: "Free cancellations and dedicated customer support offers the flexibility you need",
    },
  ];

  return (
    <>
      <section className="bg-white px-24 py-14">
        <div className="bg-[#17485a] py-10 rounded-xl">
          <div className="flex justify-between gap-8">
            <div className="flex flex-col px-10 gap-2 w-full">
              <h1 className="text-white text-[50px] font-bold">How It Works</h1>
              <p className="text-white text-base font-normal">
                Find your space and reserve your airport parking in three easy
                steps
              </p>
              <div className="flex items-center gap-6 mt-2 mb-6">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-[#b2dc7b] text-[80px] font-extrabold">
                    1
                  </h1>
                  <h4 className="text-white font-semibold text-lg">Search</h4>
                  <p className="text-base font-normal text-white text-center">
                    Choose your departure location, package type, and travel
                    dates, then press search
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-[#b2dc7b] text-[80px] font-extrabold">
                    2
                  </h1>
                  <h4 className="text-white font-semibold text-lg">Compare</h4>
                  <p className="text-base font-normal text-white text-center">
                    Review your results, filter based on preferences, then
                    select the product that best fits your needs
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-[#b2dc7b] text-[80px] font-extrabold">
                    3
                  </h1>
                  <h4 className="text-white font-semibold text-lg">Search</h4>
                  <p className="text-base font-normal text-white text-center">
                    Double-check your dates, time, and product details before
                    proceeding to checkout
                  </p>
                </div>
              </div>
              <div>
                <Button
                  text="How It Works"
                  bg="bg-[#b4e172]"
                  borderColor="border-[#b4e172]"
                  textColor="text-[#1a475b]"
                  icon2={IoMdArrowRoundForward}
                  onClick={handleClick}
                />
              </div>
            </div>
            <img className="h-[450px]" src={img} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorks;
