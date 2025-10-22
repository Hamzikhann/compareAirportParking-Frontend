import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
			<div className="max-w-md w-full text-center">
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
					<h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
					<p className="text-gray-600 mb-8">Sorry, the page you are looking for doesn't exist or has been moved.</p>
				</div>

				<div className="space-y-4">
					<Link
						to="/"
						className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#b7e06e] text-[#2a4558] font-semibold rounded-lg hover:bg-[#8fb946] transition-colors duration-200"
					>
						<Home className="w-5 h-5 mr-2" />
						Go to Home
					</Link>

					<button
						onClick={() => window.history.back()}
						className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
					>
						<ArrowLeft className="w-5 h-5 mr-2" />
						Go Back
					</button>
				</div>

				<div className="mt-8 text-sm text-gray-500">
					<p>If you believe this is an error, please contact support.</p>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
