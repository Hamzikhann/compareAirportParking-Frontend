import React from "react";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function Steps() {
	const steps = ["Select Package", "Package Details", "CheckOut", "Confirmation"];
	const location = useLocation();

	// Map paths to step indexes
	const stepMap = {
		"/packages": 0,
		"/package-details": 1,
		"/checkout": 2,
		"/confirmation": 3
	};

	// Get active step from current path
	const activeStep = stepMap[location.pathname] ?? 0;

	return (
		<section className="lg:px-20 md:px-20 px-5 py-8">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 4,
					width: "100%",
					overflowX: "auto",
					pb: 1
				}}
			>
				{steps.map((step, index) => (
					<Box
						key={step}
						sx={{
							display: "flex",
							alignItems: "center",
							whiteSpace: "nowrap"
						}}
					>
						<Typography
							variant="body1"
							sx={{
								fontWeight: index <= activeStep ? 700 : 400,
								color: index <= activeStep ? "#000" : "#aaa",
								mr: 1
							}}
						>
							{step}
						</Typography>

						{index < steps.length - 1 && (
							<Box sx={{ display: "flex", mx: 1 }}>
								<ChevronRight sx={{ fontSize: "0.8rem" }} />
								<ChevronRight sx={{ fontSize: "0.8rem", ml: -1.2 }} />
							</Box>
						)}
					</Box>
				))}
			</Box>
		</section>
	);
}

export default Steps;
