import React, { useState } from "react";
import Navbar from "../sections/Navbar";
import Steps from "../components/Steps";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import PaymentBox from "../components/PaymentBox";
import Button from "../components/Button";
import Footer from "../sections/Footer";
import SummaryCard from "../components/SummaryCard";
import useUserStore from "../store/userStore";
import useCheckoutStore from "../store/checkoutStore";
import selectedPackageStore from "../store/selectedPackage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckOut() {
  const navigate = useNavigate();
  const setCheckoutData = useCheckoutStore((state) => state.setCheckoutData);
  const selectedPackage = selectedPackageStore(
    (state) => state.selectedPackage
  );
  const { user, isLoggedIn } = useUserStore();

  // ---------- Form States ----------
  const [formData, setFormData] = useState({
    title: user.user?.title || "",
    firstName: user.user?.firstName || "",
    lastName: user.user?.lastName || "",
    email: user.user?.email || "",
    phone: user.user?.phone || "",
    outboundTerminal: "",
    inboundTerminal: "",
    departureFlight: "",
    returnFlight: "",
    vehicleRegNo: "",
    carYear: "",
    carColor: "",
    carManufacturer: "",
    carType: "",
    passengers: "",
  });

  // ---------- Dropdown Options ----------
  const title = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
    { label: "Dr", value: "Dr" },
  ];

  const carType = [
    { label: "Manual", value: "Manual" },
    { label: "Auto", value: "Auto" },
  ];

  // ---------- Handle Change ----------
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ---------- Form Validation ----------
  const validateForm = () => {
    const requiredFields = [
      "title",
      "firstName",
      "email",
      "phone",
      "outboundTerminal",
      "inboundTerminal",
      "departureFlight",
      "returnFlight",
      "vehicleRegNo",
      "carYear",
      "carColor",
      "carManufacturer",
      "carType",
      "passengers",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `Please fill the ${field.replace(/([A-Z])/g, " $1")} field.`
        );
        return false;
      }
    }
    return true;
  };

  // ---------- Submit Handler ----------
  const handleSubmit = () => {
    if (!isLoggedIn) {
      toast.error(
        "Please login or sign up before completing your reservation."
      );
      return;
    }

    const isIncomplete = Object.values(formData).some(
      (val) => String(val).trim() === ""
    );

    if (isIncomplete) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setCheckoutData(formData);
    toast.success("Form submitted successfully!");
    // console.log("Form Data Submitted:", formData);

    setTimeout(() => {
      navigate("/payment");
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <Steps />

      <section className="flex flex-col gap-8 items-start w-full lg:px-20 px-6 pb-20 pt-8">
        <h1 className="text-4xl font-bold font-serif text-gray-800">
          Checkout
        </h1>

        <section className="flex gap-12 w-full">
          {/* Left Content */}
          <div className="w-[68%] bg-white">
            {/* Your Details */}
            <div className="flex flex-col gap-7 mt-4 w-full">
              <h1 className="text-2xl font-semibold text-gray-800">
                1. Your Details
              </h1>
              {!isLoggedIn ? (
                <div className="p-5 bg-gray-50 border border-gray-200 rounded-md text-center">
                  <p className="text-gray-700 text-base font-medium">
                    Please{" "}
                    <span className="text-blue-600 cursor-pointer">login</span>{" "}
                    or{" "}
                    <span className="text-blue-600 cursor-pointer">
                      sign up
                    </span>{" "}
                    to continue.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-7 w-full">
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-normal text-gray-900">
                      Title <span className="text-base text-red-500">*</span>
                    </label>
                    <Dropdown
                      options={title}
                      placeholder="Select Title"
                      value={formData.title}
                      onChange={(val) => handleChange("title", val)}
                      width="w-full"
                      rounded="rounded-md"
                      padding="py-3 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-normal text-gray-900">
                      First Name{" "}
                      <span className="text-base text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      rounded="rounded-md"
                      width="w-full"
                      padding="py-3 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-normal text-gray-900">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      rounded="rounded-md"
                      width="w-full"
                      padding="py-3 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-normal text-gray-900">
                      Email <span className="text-base text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      rounded="rounded-md"
                      width="w-full"
                      padding="py-3 px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-base font-normal text-gray-900">
                      Phone No <span className="text-base text-red-500">*</span>
                    </label>
                    <Input
                      type="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      rounded="rounded-md"
                      width="w-full"
                      padding="py-3 px-3"
                    />
                  </div>
                </div>
              )}
            </div>

            <hr className="border-0.5 border-gray-300 my-8" />

            {/* Flight Details */}
            <div className="flex flex-col gap-7 mt-4 w-full">
              <h1 className="text-2xl font-semibold text-gray-800">
                2. Flight Details
              </h1>
              <div className="grid grid-cols-2 gap-7 w-full">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Outbound Terminal{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Outbound Terminal"
                    type="text"
                    placeholder="Enter outbound terminal"
                    value={formData.outboundTerminal}
                    onChange={(e) =>
                      handleChange("outboundTerminal", e.target.value)
                    }
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Inbound Terminal{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Inbound Terminal"
                    type="text"
                    placeholder="Enter inbound terminal"
                    value={formData.inboundTerminal}
                    onChange={(e) =>
                      handleChange("inboundTerminal", e.target.value)
                    }
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Departure Flight{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Departure Flight"
                    type="text"
                    placeholder="Enter departure flight"
                    value={formData.departureFlight}
                    onChange={(e) =>
                      handleChange("departureFlight", e.target.value)
                    }
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Return Flight{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Return Flight"
                    type="text"
                    placeholder="Enter return flight"
                    value={formData.returnFlight}
                    onChange={(e) =>
                      handleChange("returnFlight", e.target.value)
                    }
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
              </div>
            </div>

            <hr className="border-0.5 border-gray-300 my-8" />

            {/* Vehicle Details */}
            <div className="flex flex-col gap-7 mt-4 w-full">
              <h1 className="text-2xl font-semibold text-gray-800">
                3. Vehicle Details
              </h1>
              <div className="grid grid-cols-2 gap-7 w-full">
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Vehicle Registration No{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Vehicle Registration No"
                    type="text"
                    placeholder="Enter registration number"
                    value={formData.vehicleRegNo}
                    onChange={(e) =>
                      handleChange("vehicleRegNo", e.target.value)
                    }
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Car Year <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Car Year"
                    type="text"
                    placeholder="Enter car year"
                    value={formData.carYear}
                    onChange={(e) => handleChange("carYear", e.target.value)}
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Car Color <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Car Color"
                    type="text"
                    placeholder="Enter car color"
                    value={formData.carColor}
                    onChange={(e) => handleChange("carColor", e.target.value)}
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Car Manufacturer{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="Car Manufacturer"
                    type="text"
                    placeholder="Enter manufacturer"
                    value={formData.carManufacturer}
                    onChange={(e) =>
                      handleChange("carManufacturer", e.target.value)
                    }
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    Car Type <span className="text-base text-red-500">*</span>
                  </label>
                  <Dropdown
                    options={carType}
                    placeholder="Select car type"
                    value={formData.carType}
                    onChange={(val) => handleChange("carType", val)}
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-normal text-gray-900">
                    No of Passengers{" "}
                    <span className="text-base text-red-500">*</span>
                  </label>
                  <Input
                    label="No of Passengers"
                    type="number"
                    placeholder="Enter passengers"
                    value={formData.passengers}
                    onChange={(e) => handleChange("passengers", e.target.value)}
                    width="w-full"
                    rounded="rounded-md"
                    padding="py-3 px-3"
                  />
                </div>
              </div>
            </div>

            <div className="text-end mt-5">
              <p className="font-semibold text-base text-gray-500">
                Pay{" "}
                <span className="text-gray-950">{selectedPackage.price}</span>{" "}
                Today
              </p>
              <p className="text-gray-600 text-xs font-light mt-1">
                By selecting ‘Complete Reservation’ you agree to our Terms of
                Use and Privacy Notice.
              </p>
            </div>

            {/* Complete Reservation Button */}
            <div className="flex flex-col gap-3 mt-5">
              <Button
                text="Submit"
                bg="bg-[#b4e172]"
                borderColor="border-[#b4e172]"
                textColor="text-[#1a475b]"
                width="w-full"
                padding="py-4"
                onClick={handleSubmit}
              />
            </div>
          </div>

          {/* Right Content */}
          <section className="w-[32%] bg-white">
            <SummaryCard />
          </section>
        </section>
      </section>

      <Footer />
    </>
  );
}

export default CheckOut;
