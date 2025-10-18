import React, { useState } from "react";
import paypal from "/src/assets/paypal.webp";
import visa from "/src/assets/visa.webp";
import mastercard from "/src/assets/mastercard.webp";
import { FaRegCreditCard } from "react-icons/fa";
import Input from "./Input";

function PaymentBox() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="w-full mt-3 transition-all duration-500 ease-in-out">
      {/* BEFORE */}
      {!showPaymentForm && (
        <div
          onClick={() => setShowPaymentForm(true)}
          className="w-full cursor-pointer hover:bg-white bg-gray-100 border border-gray-400 py-4 px-4 text-gray-900 flex items-center gap-4 rounded-md transition-all duration-300 ease-in-out"
        >
          <FaRegCreditCard size={24} />
          <p className="text-lg">Card</p>
        </div>
      )}

      {/* AFTER */}
      {showPaymentForm && (
        <div
          className={`w-full bg-white py-2 flex flex-col gap-2 rounded-md border border-gray-300 transition-all duration-500 ease-in-out opacity-100`}
        >
          <div className="flex items-center justify-between gap-10 px-4">
            <div className="flex items-center gap-4 text-gray-900">
              <FaRegCreditCard size={24} />
              <p className="text-lg">Pay with card</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={visa} alt="" className="h-6" />
              <img src={mastercard} alt="" className="h-6" />
              <img src={paypal} alt="" className="h-6" />
            </div>
          </div>

          <hr className="border-0.5 border-gray-400 mb-3" />

          <div className="px-4">
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-base font-normal text-gray-900">
                Card Number <span className="text-base text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="xx-xx-xx-xx"
                rounded="rounded-md"
                width="w-full"
                padding="py-3 px-3"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 mb-4 w-1/2">
                <label className="text-base font-normal text-gray-900">
                  Expiration Date{" "}
                  <span className="text-base text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="mm/yy"
                  rounded="rounded-md"
                  width="w-full"
                  padding="py-3 px-3"
                />
              </div>

              <div className="flex flex-col gap-1 mb-4 w-1/2">
                <label className="text-base font-normal text-gray-900">
                  CVV <span className="text-base text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="xxx"
                  rounded="rounded-md"
                  width="w-full"
                  padding="py-3 px-3"
                />
              </div>
            </div>

            <p className="text-sm font-light text-blue-600 mb-3">
              By paying with my card, I agree to the PayPal Privacy Statement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentBox;
