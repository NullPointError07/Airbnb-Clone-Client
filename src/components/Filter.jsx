// importing as prop
const Filter = ({
  closeFilterModal,
  filteredCount,
  handleFilterChange,
  selectedPropertyType,
  selectedCategory,

  selectedBedroom,

  selectedBathroom,

  selectedPriceCategory,
  setSelectedPriceCategory,
}) => {
  const propertyTypes = ["Villa", "Apartment", "House"];
  // const propertyTypes = [
  //   { name: "Villa", img: <VillaIcon /> },
  //   { name: "Apartment", img: <ApartmentIcon /> },
  //   { name: "House", img: <HouseIcon /> },
  // ];
  const bedroomOptions = ["Any", "1", "2", "3", "4", "5", "6", "7"];
  const bathroomOptions = ["Any", "1", "2", "3", "4", "5", "6", "7"];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
        <div className="flex border-b-2 pb-2">
          <button onClick={closeFilterModal}>X</button>
          <h1 className="text-center ml-44">Filters</h1>
        </div>

        {/* To Select Property Type */}
        <h1 className="text-xl text-left font-semibold mt-4 mb-4">
          Property Type
        </h1>
        <div>
          <div className="flex space-x-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  handleFilterChange(
                    selectedCategory,
                    type,
                    selectedBedroom,
                    selectedBathroom,
                    selectedPriceCategory
                  )
                }
                className={`border-2 rounded-2xl pt-20 pb-4 pr-12 pl-5 font-bold text-right ${
                  selectedPropertyType === type
                    ? "bg-black text-white border-black"
                    : ""
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* To Select Bedroom Type */}
        <h1 className="text-xl text-left font-semibold mt-4 mb-4">
          Beds & Bathrooms
        </h1>
        <div>
          <h1 className="text-xl text-left font-semibold mt-4 mb-4">
            Bedrooms:
          </h1>
          <div>
            {bedroomOptions.map((option, index) => (
              <button
                key={option}
                className={`bedroom-button border-2 mr-4 rounded-3xl p-2 ${
                  selectedBedroom === option ? "bg-black text-white" : ""
                }`}
                onClick={() =>
                  handleFilterChange(
                    selectedCategory,
                    selectedPropertyType,
                    option,
                    selectedBathroom,
                    selectedPriceCategory
                  )
                }
              >
                {index === 0 ? "Any" : `${option} `}
              </button>
            ))}
          </div>
        </div>

        {/* To Select Bathroom Type */}
        <div>
          <h1 className="text-xl text-left font-semibold mt-4 mb-4">
            Select Bathroom:
          </h1>
          <div>
            {bathroomOptions.map((option, index) => (
              <button
                key={option}
                className={`bedroom-button border-2 mr-4 rounded-full p-2 ${
                  selectedBathroom === option ? "bg-black text-white" : ""
                }`}
                onClick={() =>
                  handleFilterChange(
                    selectedCategory,
                    selectedPropertyType,
                    selectedBedroom,
                    option,
                    selectedPriceCategory
                  )
                }
              >
                {index === 0 ? "Any" : `${option} `}
              </button>
            ))}
          </div>
        </div>

        {/* To Select Price Category */}
        <h1 className="text-xl text-left font-semibold mt-4 mb-4">
          Price Category
        </h1>
        <div>
          <div className="space-x-4 font-bold">
            <button
              onClick={() => setSelectedPriceCategory("Any")}
              className={`p-5 border-2 rounded-2xl ${
                selectedPriceCategory === "Any"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedPriceCategory("1-100")}
              className={`p-5 border-2 rounded-2xl ${
                selectedPriceCategory === "1-100"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => setSelectedPriceCategory("Over100")}
              className={`p-5 border-2 rounded-2xl ${
                selectedPriceCategory === "Over100"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              Entire House
            </button>
          </div>
        </div>

        {/* button to show different places */}
        <button
          onClick={closeFilterModal}
          className="mt-4 bg-black  text-white py-2 px-4 rounded-lg w-full transition duration-300"
        >
          Show {filteredCount} Places
        </button>
      </div>
    </div>
  );
};

export default Filter;
