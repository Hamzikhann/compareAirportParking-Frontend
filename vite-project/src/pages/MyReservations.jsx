import React, { useState, useEffect } from "react";
import useUserStore from "../store/userStore";
import { getToken } from "../services/AuthService";
import { toast } from "react-toastify";

function MyReservations() {
  const { user } = useUserStore();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("open");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = getToken();
        const response = await fetch("http://localhost:3000/api/bookings/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          toast.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        toast.error("Error fetching reservations");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const now = new Date();

  const openReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return reservationDate >= now && reservation.status !== "completed";
  });

  const pastReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.date);
    return reservationDate < now || reservation.status === "completed";
  });

  const currentReservations = activeTab === "open" ? openReservations : pastReservations;

  if (loading) {
    return <div className="text-center py-8">Loading reservations...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Reservations</h2>

      {/* Sub-tabs */}
      <div className="flex mb-6">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab("open")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "open"
                ? "bg-[#b4e172] text-[#1a475b]"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Open Reservations
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "past"
                ? "bg-[#b4e172] text-[#1a475b]"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Past Reservations
          </button>
        </div>
      </div>

      {currentReservations.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No {activeTab === "open" ? "open" : "past"} reservations found.
        </p>
      ) : (
        <div className="space-y-4">
          {currentReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h3 className="font-semibold">{reservation.packageName}</h3>
              <p className="text-sm text-gray-600">
                Date: {new Date(reservation.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Status: {reservation.status}
              </p>
              {/* Add more reservation details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReservations;
