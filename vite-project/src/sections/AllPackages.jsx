import React from "react";
import Dropdown from "../components/Dropdown";
import PackageCard from "../components/PackageCard";

function AllPackages({ data }) {
  const sortBy = [
    { label: "Default List", value: "" },
    { label: "Denver Airport", value: "denver" },
    { label: "Seattle (SEA)", value: "seattle" },
    { label: "Stansted", value: "stansted" },
  ];

  return (
    <>
      <section className="flex flex-col items-start w-full lg:px-20 px-6 pb-20 pt-8">
        <div className="flex items-center justify-between gap-10 w-full mb-10">
          <h1 className="text-4xl font-bold font-serif text-gray-700">
            Packages
          </h1>
          <Dropdown
            options={sortBy}
            placeholder="Sort By..."
            width="w-[200px]"
            rounded="rounded-lg"
          />
        </div>
       <div className="grid grid-cols-2 gap-10">
         <PackageCard data={data} />
       </div>
      </section>
    </>
  );
}

export default AllPackages;
