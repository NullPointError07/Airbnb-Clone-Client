import all from "../assets/Images/All.png";
import apartment from "../assets/Images/Apartment.png";
import beachfront from "../assets/Images/Beachfront.png";
import cabin from "../assets/Images/Cabin.png";
import camping from "../assets/Images/Camping.png";
import city from "../assets/Images/City.png";
import villa from "../assets/Images/Villa.png";

// category section
const Categories = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { name: "All", image: all },
    { name: "Apartment", image: apartment },
    { name: "Beachfront", image: beachfront },
    { name: "Cabin", image: cabin },
    { name: "Camping", image: camping },
    { name: "City", image: city },
    { name: "Villa", image: villa },
  ];
  return (
    <div className="flex flex-wrap justify-center mt-5 sm:flex-no-wrap">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onSelectCategory(category.name)}
          className={`flex flex-col items-center ${
            selectedCategory === category.name ? "font-bold underline" : ""
          } p-2 m-2`}
        >
          <img
            src={category.image}
            style={{ width: 25, height: 25 }}
            alt=""
            className={`mx-auto ${
              selectedCategory === category.name ? "font-bold" : ""
            }`}
          />
          <p>{category.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Categories;
