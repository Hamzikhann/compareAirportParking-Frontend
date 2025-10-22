import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, Mail } from "lucide-react";
import ApiService from "../services/ApiServices";
import { setToken, setUserId, setSessionUser } from "../services/AuthService";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			setIsLoading(true);

			const trimmedEmail = email.trim();
			const trimmedPassword = password.trim();

			if (!trimmedEmail || !trimmedPassword) {
				toast.error("Please fill in all fields!");
				setIsLoading(false);
				return;
			}

			if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
				toast.error("Please enter a valid email address!");
				setIsLoading(false);
				return;
			}

			try {
				const response = await ApiService.postRequest({
					path: "auth/login",
					payload: {
						email: trimmedEmail,
						password: trimmedPassword
					}
				});

				if (!response || !response.data) {
					throw new Error("Invalid response from server");
				}

				const user = response.data.data.user;
				const userRole = user.role.title;

				if (userRole === "Administrator" || userRole === "Subadmin") {
					setToken(response.data.token);
					setUserId(user.id);
					setSessionUser(user);
					toast.success("Admin logged in successfully!");

					// Clear form
					setEmail("");
					setPassword("");

					// Navigate without reload if possible, but keep for now
					// setTimeout(() => {
					navigate("/admin", { replace: true });
					// }, 500);
				} else {
					toast.error("Unauthorized. Not an admin account.");
					navigate("/");
				}
			} catch (error) {
				console.error("Login error:", error);
				toast.error(error.response?.data?.message || "Failed to login. Please try again.");
			} finally {
				setIsLoading(false);
			}
		},
		[email, password, navigate]
	);

	const goToForgotPassword = useCallback(() => {
		navigate("/forgotPassword", { state: { from: "admin" } });
	}, [navigate]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
			<div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
				<Link to="/" className="flex items-center justify-center pt-4 mb-6">
					<img src={logo} alt="Admin Portal Logo" className="w-15 h-14 object-contain" />
				</Link>
				<div className="px-8 pt-2 pb-6">
					<h2 className="mb-2 text-center text-2xl font-bold text-gray-800">Admin Portal</h2>
					<p className="mb-6 text-center text-sm text-gray-600">Enter your credentials to access the admin dashboard</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<input
									id="email"
									type="email"
									placeholder="admin@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									required
									aria-describedby="email-error"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<button
									type="button"
									onClick={goToForgotPassword}
									className="text-xs text-blue-600 hover:text-blue-800"
								>
									Forgot password?
								</button>
							</div>
							<div className="relative">
								<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<input
									id="password"
									type="password"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									required
									aria-describedby="password-error"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className={`w-full rounded-md bg-[#b7e06e] py-2 px-4 text-[#2a4558] transition-colors ${
								isLoading ? "cursor-not-allowed bg-blue-400" : "hover:bg-[#8fb946]"
							}`}
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</button>
					</form>
				</div>

				<div className="border-t border-gray-200 bg-gray-50 px-8 py-4">
					<p className="text-center text-xs text-gray-600">Protected area. Unauthorized access is prohibited.</p>
				</div>
			</div>

			<ToastContainer position="top-right" autoClose={3000} />
		</div>
	);
}

export default AdminLogin;
