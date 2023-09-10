// Home.js
import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ChevronLeftIcon from "../assets/Icons/ChevronLeftIcon";
import ChevronRightIcon from "../assets/Icons/ChevronRightIcon";
import Star from "../assets/Icons/Star";
import Categories from "./Categories";
import Filter from "./Filter";

const Home = () => {
  // const [datas, setDatas] = useState([]);

  // filter purpose state
  const [filterModal, setFilterModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);

  // filter category state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const [selectedBedroom, setSelectedBedroom] = useState("Any");
  const [selectedBathroom, setSelectedBathroom] = useState("Any");
  const [selectedPriceCategory, setSelectedPriceCategory] = useState("Any");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters based on selected values
        const queryParams = {};

        if (selectedCategory !== "All") {
          queryParams.category = selectedCategory;
        }

        if (selectedPropertyType !== "All") {
          queryParams.propertyType = selectedPropertyType;
        }

        if (selectedBedroom !== "Any") {
          queryParams.bedroom = selectedBedroom;
        }

        if (selectedBathroom !== "Any") {
          queryParams.bathroom = selectedBathroom;
        }

        if (selectedPriceCategory === "1-100") {
          queryParams.price = "1-100";
        } else if (selectedPriceCategory === "Over100") {
          queryParams.price = "Over100";
        } else {
          queryParams.price = {};
        }

        // Send the request with the constructed query parameters
        const response = await axios.get(
          "https://air-bnb-clone-server.vercel.app/data",
          { params: queryParams } // Pass query parameters as an object
        );

        setFilteredData(response.data.data);
        setFilteredCount(response.data.count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [
    selectedCategory,
    selectedPropertyType,
    selectedBedroom,
    selectedBathroom,
    selectedPriceCategory,
  ]);

  // filtering change
  const handleFilterChange = (category, property, bedroom, bathroom, price) => {
    setSelectedCategory(category);
    setSelectedPropertyType(property);
    setSelectedBedroom(bedroom);
    setSelectedBathroom(bathroom);
    setSelectedPriceCategory(price);
  };

  // formatting the data from mongoDB
  const formatDate = (date) => {
    const newDate = date.split("-");
    const month = parseInt(newDate[1]);
    const day = newDate[2];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const abbreviatedMonth = monthNames[month - 1];

    return {
      month: abbreviatedMonth,
      day: day,
    };
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const closeFilterModal = () => {
    setFilterModal(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <Categories
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>
        <div className="">
          <button onClick={handleFilterModal} className="border px-6 py-1">
            Filter
          </button>
          {filterModal && (
            <Filter
              closeFilterModal={closeFilterModal}
              filteredCount={filteredCount}
              handleFilterChange={handleFilterChange}
              selectedCategory={selectedCategory}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              selectedBedroom={selectedBedroom}
              setSelectedBedroom={setSelectedBedroom}
              selectedBathroom={selectedBathroom}
              setSelectedBathroom={setSelectedBathroom}
              selectedPriceCategory={selectedPriceCategory}
              setSelectedPriceCategory={setSelectedPriceCategory}
            />
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
          {Array.isArray(filteredData) ? (
            filteredData.map((data) => (
              <div key={data._id}>
                <button>
                  {/* Carousal imported from react library */}
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    renderArrowPrev={(clickHandler, hasPrev) => {
                      return (
                        <div
                          className={`${
                            hasPrev
                              ? "absolute top-1/2 left-0 transform -translate-y-1/2"
                              : "hidden"
                          } flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 `}
                          onClick={clickHandler}
                        >
                          <ChevronLeftIcon className="w-9 h-9 text-white " />
                        </div>
                      );
                    }}
                    renderArrowNext={(clickHandler, hasNext) => {
                      return (
                        <div
                          className={`${
                            hasNext
                              ? "absolute top-1/2 right-0 transform -translate-y-1/2"
                              : "hidden"
                          } flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 `}
                          onClick={clickHandler}
                        >
                          <ChevronRightIcon className="w-9 h-9 text-white " />
                        </div>
                      );
                    }}
                  >
                    {data.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          style={{ width: 800, height: 200 }}
                          className="rounded-3xl"
                          alt=""
                        />
                      </div>
                    ))}
                  </Carousel>
                </button>

                <div className="flex flex-col justify-between mt-2 sm:mt-0 ">
                  <div className="mb-2 flex justify-between">
                    <div className="flex space-x-2 font-bold">
                      <h1>{data.location.state},</h1>
                      <h1>{data.location.country}</h1>
                    </div>
                    <div className="flex space-x-2">
                      <Star />
                      {data.rating}
                    </div>
                  </div>
                  <p className="text-gray-500">
                    Stay with {data.host.name} - hosting for {data.host.year}{" "}
                    years
                  </p>
                  <p className="text-gray-500">
                    {
                      formatDate(data.availability.start_date.split("T")[0])
                        .month
                    }{" "}
                    {formatDate(data.availability.start_date.split("T")[0]).day}{" "}
                    -{" "}
                    {formatDate(data.availability.end_date.split("T")[0]).month}{" "}
                    {formatDate(data.availability.end_date.split("T")[0]).day}
                  </p>
                  <p>
                    <span className="font-bold">${data.price}</span> night
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No matching items found.</p>
          )}
          {}
        </div>
      </div>
    </div>
  );
};

export default Home;
