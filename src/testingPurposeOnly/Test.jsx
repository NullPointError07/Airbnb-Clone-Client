import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
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
          "http://localhost:5000/data",
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

  const handleFilterChange = (category, property, bedroom, bathroom, price) => {
    setSelectedCategory(category);
    setSelectedPropertyType(property);
    setSelectedBedroom(bedroom); // Updating bedroom state
    setSelectedBathroom(bathroom); // Updating bathroom state
    setSelectedPriceCategory(price);
  };

  return (
    <div className="w-3/4 flex justify-between">
      {/* For Selecting Property Value */}
      <div>
        <label htmlFor="propertyType">Select Property Type:</label>
        <select
          id="propertyType"
          onChange={(e) =>
            handleFilterChange(
              e.target.value,
              selectedBedroom,
              selectedBathroom,
              selectedPriceCategory
            )
          }
          value={selectedPropertyType}
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          {/* Add more property types as needed */}
        </select>
      </div>
      {/* For Selecting Bedroom Value */}
      <div>
        <label htmlFor="bedrooms">Select Number of Bedrooms:</label>
        <select
          id="bedrooms"
          onChange={(e) =>
            handleFilterChange(
              selectedCategory,
              selectedPropertyType,
              e.target.value, // Update only bedroom here
              selectedBathroom,
              selectedPriceCategory
            )
          }
          value={selectedBedroom}
        >
          <option value="Any">Any</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          <option value="5">5 Bedrooms</option>
          <option value="6">6 Bedrooms</option>
          <option value="7">7 Bedrooms</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {/* For Selecting Bathroom Value */}
      <div>
        <label htmlFor="bathroom">Select Number of Bathrooms:</label>
        <select
          id="bathroom"
          onChange={(e) =>
            handleFilterChange(
              selectedCategory,
              selectedPropertyType,
              selectedBedroom,
              e.target.value, // Update only bathroom here
              selectedPriceCategory
            )
          }
          value={selectedBathroom}
        >
          <option value="Any">Any</option>
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="4">4 Bathrooms</option>
          <option value="5">5 Bathrooms</option>
          <option value="6">6 Bathrooms</option>
          <option value="7">7 Bathrooms</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="priceCategory">Select Price Category:</label>
        <select
          id="priceCategory"
          onChange={(e) => setSelectedPriceCategory(e.target.value)}
          value={selectedPriceCategory}
        >
          <option value="Any">Any Price</option>
          <option value="1-100">$1 - $100</option>
          <option value="Over100">Over $100</option>
        </select>
      </div>
      <div>
        {/* Render the filteredData if it's an array */}
        {Array.isArray(filteredData) ? (
          filteredData.map((property) => (
            <div key={property._id}>
              {/* Display property information */}
              <h2>{property.title}</h2>
              <p>
                Location: {property.location.country}, {property.location.state}
              </p>
            </div>
          ))
        ) : (
          <p>No matching items found.</p>
        )}
      </div>
      <p>Number of elements {filteredCount}</p>
    </div>
  );
};

export default Home;
