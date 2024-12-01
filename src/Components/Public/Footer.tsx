import React from "react";

interface Link {
  name: string;
  link: string;
}

interface Links {
  [category: string]: Link[];
}

const Footer: React.FC = () => {
  const links: Links = {
    "Ieka Family": [
      { name: "Log in", link: "Link 1" },
      { name: "Join Ieka family", link: "Link 2" },
      { name: "Member offers", link: "Link 3" },
      { name: "Workshop and events", link: "Link 4" },
    ],
    Services: [
      { name: "Delivery service", link: "Link 5" },
      { name: "Click and collect", link: "Link 6" },
      { name: "Personal shopper", link: "Link 7" },
      { name: "Design your room", link: "Link 8" },
      { name: "Assembly service", link: "Link 9" },
      { name: "Measuring service", link: "Link 10" },
      { name: "Kitchen planning", link: "Link 11" },
      { name: "Installation service", link: "Link 12" },
      { name: "Track and manage your order", link: "Link 13" },
      { name: "Customer service", link: "Link 14" },
      { name: "Recycle program", link: "Link 15" },
    ],
    Help: [
      { name: "How to shop", link: "Link 16" },
      { name: "Return policy", link: "Link 17" },
      { name: "Prices and price tags", link: "Link 18" },
      { name: "Contact us", link: "Link 19" },
      { name: "FAQ's", link: "Link 20" },
      { name: "Planners", link: "Link 21" },
      { name: "Gift card", link: "Link 22" },
      { name: "Feedback", link: "Link 23" },
      { name: "Terms and conditions", link: "Link 24" },
    ],
    "About Ieka": [
      { name: "This is Ieka", link: "Link 25" },
      { name: "Careers at Ieka", link: "Link 26" },
      { name: "News-room", link: "Link 27" },
      { name: "Sustainability", link: "Link 28" },
      { name: "IEKA stores", link: "Link 29" },
      { name: "IEKA restaurant", link: "Link 30" },
      { name: "IEKA for business", link: "Link 31" },
    ],
  };

  return (
    <footer className="py-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <div>
            <div className="h-60 flex flex-col justify-evenly">
              <h2 className="font-bold text-2xl my-2">Join IEKA Family</h2>
              <p className="text-sm">
                {" "}
                Enjoy member-only discounts & offers, early access to IEKA sale,
                delicious food offers and much more. Join for free.
              </p>
              <button className="rounded-full w-32 bg-slate-600 text-white py-1">
                Join the club
              </button>
            </div>
            <div className="h-60 flex flex-col justify-evenly">
              <h2 className="font-bold text-2xl my-2">IEKA Business Network</h2>
              <p className="text-sm">
                {" "}
                Join the membership program for business customers with exciting
                benefits and features. Join us for free and enjoy member
                discounts, quick-fix tips, online tutorials and a lot more.
              </p>
              <button className="rounded-full w-32 bg-slate-600 text-white py-1">
                Join now
              </button>
            </div>
          </div>
          {Object.keys(links).map((category) => (
            <div key={category} className="space-y-4 my-8 ml-8">
              <h3 className="text-lg font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links[category].map((link, idx) => (
                  <li key={idx}>
                    <a href="/" className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
