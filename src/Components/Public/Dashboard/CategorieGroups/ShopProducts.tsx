import React, { useRef } from "react";
import { Link } from "react-router-dom";

const ShopProducts: React.FC = () => {
  const categories = [
    {
      name: "Every day essentials",
      image:
        "https://www.ikea.com/images/9e/23/9e233f51310ac66f52eb7e2586e8449e.jpg?imwidth=160",
      filter: "",
    },
    {
      name: "Storage and organisation",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/storage-organisation-st001.jpeg?imwidth=160",
      filter: "Storage",
    },
    {
      name: "Furniture",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/furniture-fu001.jpeg?imwidth=160",
      filter: "Tables",
    },
    {
      name: "Beds and mattresses",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/beds-mattresses-bm001.jpeg?imwidth=160",
      filter: "Beds",
    },
    {
      name: "Home and textiles",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/textiles-tl001.jpeg?imwidth=160",
      filter: "Chairs",
    },
    {
      name: "Decoration",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/decoration-de001.jpeg?imwidth=160",
      filter: "Lighting",
    },
    {
      name: "Outdoor products",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/outdoor-products-od001.jpeg?imwidth=160",
      filter: "Outdoor",
    },
    {
      name: "Lighting",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/lighting-li001.jpeg?imwidth=160",
      filter: "Lighting",
    },
    {
      name: "Kitchenware & tableware",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/kitchenware-tableware-kt001.jpeg?imwidth=160",
      filter: "Kitchen",
    },
    {
      name: "Bathroom products",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/bathroom-products-ba001.jpeg?imwidth=160",
      filter: "Bathroom",
    },
    {
      name: "Baby and children",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/baby-children-bc001.jpeg?imwidth=160",
      filter: "Childrens",
    },
    {
      name: "Laundry & cleaning",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/laundry-cleaning-lc001.jpeg?imwidth=160",
      filter: "Bathroom",
    },
    {
      name: "Pots and plants",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/pots-plants-pp001.jpeg?imwidth=160",
      filter: "Tables",
    },
    {
      name: "Modular kitchens",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/kitchen-appliances-ka001.jpeg?imwidth=160",
      filter: "Kitchen",
    },
    {
      name: "Food & beverages",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/food-beverages-fb001.jpeg?imwidth=160",
      filter: "Chairs",
    },
    {
      name: "Home improvement",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/home-improvement-hi001.jpeg?imwidth=160",
      filter: "Storage",
    },
    {
      name: "Smart home",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/smart-home-hs001.jpeg?imwidth=160",
      filter: "Tables",
    },
    {
      name: "Carpets, mats & flooring",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/rugs-mats-flooring-rm001.jpeg?imwidth=160",
      filter: "Beds",
    },
    {
      name: "Home electronics",
      image:
        "https://www.ikea.com/global/assets/range-categorisation/images/product/home-electronics-he001.jpeg?imwidth=160",
      filter: "Lighting",
    },
    {
      name: "Pet products",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/pet-products-pt001.jpeg?imwidth=160",
      filter: "Outdoor",
    },
    {
      name: "Christmas collections",
      image:
        "https://www.ikea.com/in/en/range-categorisation/images/product/winter-holiday-wt001.jpeg?imwidth=160",
      filter: "Sofas",
    },
  ];

  const containerRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -1000, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 1000, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          className="absolute left-3 top-7 text-white bg-black rounded-full h-8 w-8 z-10 opacity-50"
          onClick={scrollLeft}
        >
          &lt;
        </button>

        <ul
          ref={containerRef}
          className="flex justify-evenly gap-2.5 overflow-x-auto pb-4"
        >
          {categories.map((category, index) => (
            <li key={index} className="w-52 min-w-[10rem] text-center">
              <Link
                to={`/home/ProductDashboard?categories=${category.filter}`}
                className="hover:underline text-xs"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 m-auto"
                />
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="absolute right-3 top-7 text-white bg-black rounded-full h-8 w-8 z-10 opacity-50"
          onClick={scrollRight}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ShopProducts;
