import React from "react";
import Dropdown from "../components/Dropdown";
import PackageCard from "../components/PackageCard";

function AllPackages({ data }) {
	const sortBy = [
		{ label: "Default List", value: "" },
		{ label: "Denver Airport", value: "denver" },
		{ label: "Seattle (SEA)", value: "seattle" },
		{ label: "Stansted", value: "stansted" }
	];

	return (
		<>
			<section className="flex flex-col items-start w-full lg:px-20 px-6 pb-20 pt-8">
				<div className="flex items-center justify-between gap-10 w-full mb-10">
					<h1 className="text-2xl sm:text-4xl font-bold font-serif text-gray-700">Packages</h1>
					<Dropdown options={sortBy} placeholder="Sort By..." width="w-[200px]" rounded="rounded-lg" />
				</div>
				{/* Remove grid wrapper and let PackageCard handle the layout */}
				<PackageCard data={data} />
			</section>
		</>
	);
}

export default AllPackages;
