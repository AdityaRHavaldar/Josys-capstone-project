import React, { useRef } from "react";
import { Link } from "react-router-dom";

const CategoriesCarousel: React.FC = () => {
  const categories = [
    {
      heading: "All things weddings, all things home",
      description:
        "Discover beautiful wedding gifts or essentials to set up your new home, making this season unforgottable",
      image:
        "https://www.ikea.com/images/cf/85/cf85a94a142aec60907f8264508509df.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#9E4842",
    },
    {
      heading: "Crazy winter blankets to keep you warm all season",
      description:
        "Consider how your bedding, pyjamas, sunlight coming into the bedroom might be impacting your sleep",
      image:
        "https://www.ikea.com/images/0d/ef/0defd832985170ae598f80ce2a9529f1.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#946b3d",
    },
    {
      heading: "Jingle all the way with the festive cheer!",
      description:
        "Fill your home with festive cheer with our christmas tree, automatic candles and hangings that bring the holiday sprit to life!",
      image:
        "https://www.ikea.com/images/41/53/4153435ae028879d6ad341d5d3174355.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#223F1A",
    },
    {
      heading:
        "Find the perfect outdoor furniture for those crisp winter evenings",
      description:
        "Outdoor essentials for every gatharing - weather-resistant chairs, stylish tables and storage solutions",
      image:
        "https://www.ikea.com/images/2b/73/2b73b9afe1a3977fa6527c3e58242464.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#656529",
    },
    {
      heading: "Find the perfect secrect santa gift for everyone on your list",
      description:
        "Explore a range of thoughtful and budget-friendly Secret santa gift ideas starting from under $53, make every exchange fun and memorable",
      image:
        "https://www.ikea.com/ext/ingkadam/m/4a69c364207a2b3d/original/PH200548-crop001.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#731013",
    },
    {
      heading: "Beautifully made thoughtfully designed",
      description:
        "Our furneatures seamlessly blends enduring thoughtful design, and every functionality, ensuring lasting beaty and comfort in your home",
      image:
        "https://www.ikea.com/images/14/33/1433df1b7b6001903ffc1476685b1eed.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#192A45",
    },
    {
      heading: "Everyday essential under $20",
      description: "Shop offordable accessaries to elevate your life",
      image:
        "https://www.ikea.com/images/3f/9e/3f9ec65a12d680768248c810f7395ea9.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#ffdb00",
    },
    {
      heading: "New lower price",
      description: "Our favrate product now at redused price.",
      image:
        "https://www.ikea.com/images/df/3e/df3e87ca51c8bafa8b9b842b18ccd5d2.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#e2271d",
    },
    {
      heading: "Fridays ges better at ikea stores",
      description:
        "Enjoy up to 50% off on main courses and and and additional 10% off on home furnishing products. Valid only for Ikea family members",
      image:
        "https://www.ikea.com/images/54/e4/54e41be64472246f01b13e83066ba2f1.jpg?f=s",
      link: "/home/ProductDashboard",
      color: "#006f34",
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
          className="absolute left-5 top-[50%] text-black font-bold bg-white rounded-full h-10 w-10 z-10 opacity-70"
          onClick={scrollLeft}
        >
          &lt;
        </button>

        <ul ref={containerRef} className="flex gap-[10px] overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <li
              key={index}
              className="w-52 min-w-[29rem] text-left hover:scale-[1.01]"
            >
              <Link to={category.link}>
                <img
                  src={category.image}
                  alt=""
                  className=" h-[454px] w-[454px]"
                />
                <div
                  style={{ backgroundColor: category.color }}
                  className="p-[6%] flex flex-col justify-between h-[37vh] w-[454px]"
                >
                  <div>
                    <h1 className="hover:underline text-white text-2xl">
                      {" "}
                      {category.heading}{" "}
                    </h1>
                    <br />
                    <p className=" text-xs text-white">
                      {category.description}
                    </p>
                  </div>
                  <button className=" text-white bg-black rounded-full h-14 w-14 ">
                    &gt;
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="absolute right-5 top-[50%] text-black font-bold bg-white rounded-full h-10 w-10 z-10 opacity-70"
          onClick={scrollRight}
        >
          &gt;
        </button>
      </div>

      <div className="w-full my-2">
        <img
          src="https://www.ikea.com/images/9e/47/9e47980d24ca832382240e12e3acc273.png?f=sg"
          alt="Offers-delivary"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default CategoriesCarousel;
