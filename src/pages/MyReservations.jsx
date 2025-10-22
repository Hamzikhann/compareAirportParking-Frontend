import { useState, useEffect } from "react";
import useUserStore from "../store/userStore";
import { toast } from "react-toastify";
import ApiService from "../services/ApiServices";
function MyReservations() {
	const { user } = useUserStore();
	const [reservations, setReservations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("open");

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				// const token = getToken();
				// const response = await axios.post("http://localhost:8000/api/booking/list", {}, {
				//   headers: {
				//     "access-token": token,
				//   },
				// });
				let data = {
					path: "booking/list",
					payload: {}
				};
				let response = await ApiService.postRequest(data);

				setReservations(response.data.data.allBookings);
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
		const reservationDate = new Date(reservation.startDate);
		return reservationDate >= now && reservation.status !== "completed";
	});

	const pastReservations = reservations.filter((reservation) => {
		const reservationDate = new Date(reservation.startDate);
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
						className={`px-6 py-2 rounded-md font-medium transition-colors text-nowrap ${
							activeTab === "open" ? "bg-[#b4e172] text-[#1a475b]" : "text-gray-600 hover:bg-gray-200"
						}`}
					>
						Open Reservations
					</button>
					<button
						onClick={() => setActiveTab("past")}
						className={`px-6 py-2 rounded-md font-medium transition-colors text-nowrap ${
							activeTab === "past" ? "bg-[#b4e172] text-[#1a475b]" : "text-gray-600 hover:bg-gray-200"
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
						<div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
							<h3 className="font-semibold">{reservation.airport}</h3>
							<p className="text-sm text-gray-600">
								Start Date: {new Date(reservation.startDate).toLocaleDateString()}
							</p>
							<p className="text-sm text-gray-600">End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>
							<p className="text-sm text-gray-600">Status: {reservation.status}</p>
							{/* Add more reservation details as needed */}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default MyReservations;
