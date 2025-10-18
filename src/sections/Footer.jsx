import React from "react";
import logo from "/src/assets/logo2.png";
import appStore from "/src/assets/app-store.svg";
import google from "/src/assets/google.svg";
import paypal from "/src/assets/paypal.webp";
import visa from "/src/assets/visa.webp";
import mastercard from "/src/assets/mastercard.webp";
import gPay from "/src/assets/google-pay.webp";
import {
  FaArrowRight,
  FaLinkedin,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#0e252c] rounded-t-3xl pt-10 pb-6 px-6 md:px-16">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-10">
        <img
          src={logo}
          alt="Logo"
          className="w-[200px] rounded-md object-contain"
        />
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2 cursor-pointer text-gray-700 hover:text-red-400">
            <RiInstagramFill size={20} />
          </div>
          <div className="bg-white rounded-full p-2 cursor-pointer text-gray-700 hover:text-blue-400">
            <FaLinkedin size={20} />
          </div>
          <div className="bg-white rounded-full p-2 cursor-pointer text-gray-700 hover:text-blue-500">
            <FaFacebookF size={20} />
          </div>
          <div className="bg-white rounded-full p-2 cursor-pointer text-gray-700 hover:text-red-500">
            <FaYoutube size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-16">
        {/* Left Section - Newsletter */}
        <div className="flex-1 max-w-md">
          <p className="text-gray-300 text-lg mb-4">
            Subscribe to our newsletter and find out about discounts, raffles
            and many other surprises.
          </p>

          <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden w-full max-w-md mb-3">
            <input
              type="email"
              placeholder="Enter your email address."
              className="flex-grow px-4 py-3 text-sm text-gray-700 focus:outline-none"
            />
            <button className="bg-[#b4e172] text-[#1c4e5c] p-3 rounded-full mr-1 hover:bg-[#E60023] hover:text-white transition">
              <FaArrowRight size={14} />
            </button>
          </div>

          <p className="text-[12px] text-gray-300 mt-3 leading-relaxed">
            *By subscribing you accept our Privacy Policy to receive commercial
            communications from Parclick. Without any obligation, you can
            unsubscribe whenever you want in the same newsletter.
          </p>
        </div>
        {/* Middle Section - Links */}
        <div className="flex flex-wrap gap-12 md:gap-20 ">
          <div>
            <h4 className="font-semibold text-[15px] mb-3 text-white">
              About Parclick
            </h4>
            <ul className="space-y-2 text-[14px] text-gray-400">
              <li>Who are we?</li>
              <li>How it works</li>
              <li>Our car parks</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[15px] mb-3 text-white">
              Shall we collaborate?
            </h4>
            <ul className="space-y-2 text-[14px] text-gray-400">
              <li>Professionals</li>
              <li>Parking Provider</li>
              <li>Affiliates</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[15px] mb-3 text-white">
              Contact
            </h4>
            <ul className="space-y-2 text-[14px] text-gray-400">
              <li>Contact us</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Store & Google Play placeholders */}

      <div className="flex items-center gap-10 justify-between mt-6">
        <div className="flex gap-4">
          <div className="w-[120px] h-[50px]">
            <img src={appStore} alt="" />
          </div>
          <div className="w-[120px] h-[50px]">
            <img src={google} alt="" />
          </div>
        </div>
        <div>
          <h5 className="text-gray-400 text-[14px] font-semibold mb-3">
            You can use these payment methods:
          </h5>
          <div className="flex gap-6">
            <img
              src={paypal}
              alt="PayPal"
              className="w-[70px] object-contain"
            />
            <img
              src={visa}
              alt="Visa"
              className="w-[70px] object-contain"
            />
            <img
              src={mastercard}
              alt="Mastercard"
              className="w-[70px] object-contain"
            />
            <img
              src={gPay}
              alt="Google Pay"
              className="w-[70px] object-contain"
            />
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm font-normal text-white">©2025 Airport Parking. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
