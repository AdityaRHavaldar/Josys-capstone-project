import React from "react";
import { Link } from "react-router-dom";

const ShopByRooms: React.FC = () => {
  const categories = [
    {
      name: "Bedroom",
      image:
        "https://www.ikea.com/images/a-calm-bedroom-with-a-large-bed-a-wooden-desk-a-dynamic-grey-97b26da5f0394ee77a37dac6b13f22f7.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Living room",
      image:
        "https://www.ikea.com/images/two-blue-kivik-armchairs-face-each-other-on-a-black-and-whit-e8eb237382f450dbf0c88bd152083b1f.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Childrens room",
      image:
        "https://www.ikea.com/images/a-bedroom-with-a-kura-reversible-bed-and-another-bed-paralle-2e66ab0bad65e50092be14cf43bc687b.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Home office",
      image:
        "https://www.ikea.com/ext/ingkadam/m/2345c6d3fe01268b/original/PH199092.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Kitchen",
      image:
        "https://www.ikea.com/ext/ingkadam/m/281d8ad7debae447/original/PH181767.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Dining room",
      image:
        "https://www.ikea.com/images/an-ekedalen-dining-table-and-chairs-in-dark-wood-sit-in-fron-ce7e989c5117f9e23edafd31df066c48.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Bathroom",
      image:
        "https://www.ikea.com/images/a-hemnes-mirror-cabinet-in-white-with-bathroom-items-on-the--a59784ae57d8595cc51ea2e5216023b3.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Outdoor",
      image:
        "https://www.ikea.com/images/a-sunny-wood-decking-outdoor-space-by-a-brick-wall-furnished-f8a79c6214034169083baf8bff094bd3.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
    {
      name: "Hallway",
      image:
        "https://www.ikea.com/images/a-sunny-wood-decking-outdoor-space-by-a-brick-wall-furnished-f8a79c6214034169083baf8bff094bd3.jpg?imwidth=300",
      link: "/ProductDashboard",
    },
  ];

  return (
    <div className="">
      <div>
        <ul className="flex justify-evenly gap-2.5 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <li key={index} className="w-52 min-w-[10rem] text-center">
              <Link to={category.link} className="hover:underline text-xs">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32  m-auto"
                />
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopByRooms;
