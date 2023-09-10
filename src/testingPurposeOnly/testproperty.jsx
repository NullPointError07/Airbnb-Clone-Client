import axios from "axios";
import { useEffect, useState } from "react";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/data?property=${selectedPropertyType}`
        );
        setProperties(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedPropertyType]);

  const handleFilterChange = (propertyType) => {
    setSelectedPropertyType(propertyType);
  };

  return (
    <div>
      <div>
        <label htmlFor="propertyType">Select Property Type:</label>
        <select
          id="propertyType"
          onChange={(e) => handleFilterChange(e.target.value)}
          value={selectedPropertyType}
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          {/* Add more property types as needed */}
        </select>
      </div>
      <div>
        {/* Render the filtered properties */}
        {Array.isArray(properties) ? (
          properties.map((property) => (
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
    </div>
  );
};

export default Property;
