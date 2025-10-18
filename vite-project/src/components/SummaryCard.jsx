import React from "react";
import selectedPackageStore from "../store/selectedPackage";
import bookingDataStore from "../store/bookingDataStore";

function SummaryCard() {
  const { selectedPackage } = selectedPackageStore();
  const { bookingData } = bookingDataStore();
  return (
    <>
      {/* summary-card */}
      <div className="border border-gray-300 rounded-md lg:sticky lg:top-3 lg:z-40">
        <div className="flex flex-col gap-3 px-4 py-4">
          <h1 className="text-2xl font-mono font-semibold text-gray-800">
            Order Summary
          </h1>
          <p className="text-base font-normal text-gray-950">
            {selectedPackage.name}
          </p>
          <p className="text-sm font-normal text-gray-800 -mt-1">
            Parking Type: {selectedPackage.type}
          </p>
          <p className="text-sm font-normal text-gray-800 -mt-1">
            Check-in: {bookingData.startDate} - {bookingData.startTime}
          </p>
          <p className="text-sm font-normal text-gray-800 -mt-1">
            Check-out: {bookingData.endDate} - {bookingData.endTime}
          </p>
          <p className="text-sm font-normal text-gray-800 -mt-1">
            4 Days of parking{" "}
          </p>
        </div>
        <hr className="border-0.5 border-gray-300" />
        <div className="flex flex-col gap-2 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-normal text-gray-800">Subtotal</p>
            <p className="text-sm font-normal text-gray-800">
              {selectedPackage.price}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-normal text-gray-800">Booking Fee</p>
            <p className="text-sm font-normal text-gray-800">$0.00</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-normal text-gray-800">Taxes & Fees</p>
            <p className="text-sm font-normal text-gray-800">$0.00</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-normal text-gray-800">
              - Airport Access Fee
            </p>
            <p className="text-sm font-normal text-gray-800">$0.00</p>
          </div>
        </div>
        <hr className="border-0.5 border-gray-300" />
        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <p className="text-sm font-semibold text-gray-950">Total</p>
          <p className="text-sm font-semibold text-gray-950">
            {selectedPackage.price}
          </p>
        </div>
        <hr className="border-0.5 border-gray-300" />
        <p className="px-4 py-4 text-sm font-normal text-blue-600 hover:underline cursor-pointer">
          Have a coupon code?
        </p>
      </div>
    </>
  );
}

export default SummaryCard;
