import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ApiService from "../services/ApiServices";
import SummaryCard from "../components/SummaryCard";
import useUserStore from "../store/userStore";
import bookingDataStore from "../store/bookingDataStore";
import selectedPackageStore from "../store/selectedPackage";
import useCheckoutStore from "../store/checkoutStore";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import Steps from "../components/Steps";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePaymentWrapper = ({
  selectedPackage,
  children,
  setPaymentIntent,
  user,
  bookingData,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        let payload = {
          startDate: bookingData?.startDate,
          endDate: bookingData?.endDate,
          startTime: bookingData?.startTime,
          endTime: bookingData?.endTime,
          airport: bookingData?.airport,
          userId: user?.user?.id,
          amount: selectedPackage?.price,
          currency: "gbp",
          payment_method_types: ["card"],
          customer: {
            email: user?.user?.email,
            name: `${user?.user?.firstName} ${user?.user?.lastName}`,
          },
        };
        // console.log(payload);
        const response = await ApiService.postRequest({
          path: "stripe/create-payment-intent",
          payload: {
            startDate: bookingData?.startDate,
            endDate: bookingData?.endDate,
            startTime: bookingData?.startTime,
            endTime: bookingData?.endTime,
            airport: bookingData?.airport,
            userId: user?.user?.id,
            amount: selectedPackage?.price,
            currency: "gbp",
            payment_method_types: ["card"],
            customer: {
              email: user?.user?.email,
              name: `${user?.user?.firstName} ${user?.user?.lastName}`,
            },
          },
        });
        // console.log("Stripe response:", response.data);

        if (response?.data) {
          setPaymentIntent(response.data.paymentIntent.id);
          setClientSecret(response.data.clientSecret);
        }
      } catch (err) {
        setError(err.message || "Failed to initialize payment");
      } finally {
        setLoading(false);
      }
    };

    if (selectedPackage) fetchClientSecret();
  }, [selectedPackage]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{ p: 2, border: "1px solid #ffebee", backgroundColor: "#fff8f8" }}
      >
        <Typography color="error">{error}</Typography>
        <Button
          onClick={() => navigate("/payment")}
          sx={{ mt: 2 }}
          variant="contained"
        >
          Retry Payment
        </Button>
      </Box>
    );

  if (!clientSecret)
    return (
      <Typography color="error">
        Payment initialization failed. Please try again.
      </Typography>
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#00c853",
            colorBackground: "#ffffff",
            colorText: "#30313d",
          },
        },
      }}
    >
      {children}
    </Elements>
  );
};

const StripePaymentForm = ({ selectedPackage, onSuccess, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentElementLoaded, setPaymentElementLoaded] = useState(false);
  const navigate = useNavigate();

  if (!stripe || !elements)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !paymentElementLoaded) {
      setErrorMessage("Payment form is not ready");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          confirmParams: {
            receipt_email: user?.user?.email,
            return_url: window.location.origin + "/confirmation",
          },
          redirect: "if_required",
        }
      );

      if (stripeError) {
        setErrorMessage(stripeError.message);
        return;
      }

      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            await onSuccess();
            navigate("/confirmation");
            break;
          case "processing":
            setErrorMessage("Payment processing — please wait.");
            break;
          case "requires_payment_method":
            setErrorMessage("Payment failed. Please try again.");
            break;
          default:
            setErrorMessage("Something went wrong with your payment.");
        }
      }
    } catch (err) {
      setErrorMessage(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        onReady={() => setPaymentElementLoaded(true)}
        options={{
          wallets: { applePay: "never", googlePay: "never" },
          layout: { type: "tabs", defaultCollapsed: false },
        }}
      />

      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || !paymentElementLoaded || loading}
        sx={{
          bgcolor: "#00c853",
          color: "white",
          py: 1.5,
          textTransform: "none",
          "&:hover": { bgcolor: "#00a844" },
          mt: 3,
          mb: 3,
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          `Pay GBP ${selectedPackage?.price || "0.00"}`
        )}
      </Button>
    </form>
  );
};

function Payment() {
  const { user } = useUserStore();
  const { bookingData, clearBookingData } = bookingDataStore();
  const { checkoutData } = useCheckoutStore();
  const { selectedPackage, clearPackages } = selectedPackageStore();

  const [paymentIntent, setPaymentIntent] = useState();
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    const data = {
      path: "booking/create",
      payload: {
        // Booking Details
        startDate: bookingData?.startDate,
        startTime: bookingData?.startTime,
        endDate: bookingData?.endDate,
        endTime: bookingData?.endTime,
        airport: bookingData?.airport,

        // Checkout Details
        outboundTerminal: checkoutData?.outboundTerminal,
        inboundTerminal: checkoutData?.inboundTerminal,
        outboundFlightNo: checkoutData?.departureFlight,
        inboundFlightNo: checkoutData?.returnFlight,
        title: checkoutData?.title,
        firstName: checkoutData?.firstName,
        lastName: checkoutData?.lastName,
        email: checkoutData?.email,
        phoneNo: checkoutData?.phone,
        vehicleRegistrationNo: checkoutData?.vehicleRegNo,
        vehicleManufacturer: checkoutData?.carManufacturer,
        vehicleModel: checkoutData?.carYear,
        vehicleColor: checkoutData?.carColor,
        type: checkoutData?.carType,
        numberOfPassengers: checkoutData?.passengers,

        // User Info
        userId: user?.user?.id,

        // Package Info
        name: selectedPackage?.customTitle || selectedPackage?.name,
        price: selectedPackage?.price,
        description: selectedPackage?.description,
        bulletPoints:
          selectedPackage?.features || selectedPackage?.bulletPoints,
        totalPayment: selectedPackage?.price,
        referenceNo: `STRIPE-${paymentIntent || "null"}`,
      },
    };

    try {
      const response = await ApiService.postRequest(data);
      if (response.data.data) {
        sessionStorage.setItem(
          "booking-info",
          JSON.stringify(response.data.data)
        );
      }

      clearBookingData();
      clearPackages();
    } catch (err) {
      console.error("Booking creation failed:", err);
    }
  };

  // console.log("🧾 bookingData:", bookingData);
  // console.log("🚗 checkoutData:", checkoutData);
  // console.log("📦 selectedPackage:", selectedPackage);
  // console.log("👤 user:", user);

  return (
    <>
      <Navbar />
      <Steps />
      <section className="w-full lg:px-32 px-8 sm:py-28 py-14">
        <div className="w-full flex md:flex-row flex-col md:justify-evenly justify-center gap-10 lg:px-10 px-0">
          <div className="md:w-[40%]">
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              Payment
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {selectedPackage && (
              <StripePaymentWrapper
                bookingData={bookingData}
                setPaymentIntent={setPaymentIntent}
                selectedPackage={selectedPackage}
                user={user}
              >
                <StripePaymentForm
                  selectedPackage={selectedPackage}
                  onSuccess={handlePaymentSuccess}
                  user={user}
                />
              </StripePaymentWrapper>
            )}

            <Typography
              variant="caption"
              sx={{ color: "#9e9e9e", display: "block" }}
            >
              Your payment is securely processed by Stripe.
            </Typography>
          </div>

          <SummaryCard />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Payment;
