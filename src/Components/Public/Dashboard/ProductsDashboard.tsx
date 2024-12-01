import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsByValue,
  Product,
} from "../../../Services/ProductServices";
import { addItemToBag } from "../../../Services/BagServices";
import { FaAngleDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryGroup from "./CategorieGroups/CategoryGroup";
import { toast, ToastContainer } from "react-toastify";

function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [addedToBag, setAddedToBag] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("categories");

  useEffect(() => {
    const loadProducts = async () => {
      if (category) {
        const data = await fetchProductsByValue(category);
        setProducts(data);
        setSortedProducts(data);
      } else {
        const data = await fetchProducts();
        setProducts(data);
        setSortedProducts(data);
      }
    };

    loadProducts();
  }, [category]);

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    let filteredProducts = [...products];

    switch (filter) {
      case "price":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "ratings":
        filteredProducts.sort((a, b) => {
          const avgRatingA =
            a.reviews.reduce((sum, review) => sum + review.rating, 0) /
            a.reviews.length;
          const avgRatingB =
            b.reviews.reduce((sum, review) => sum + review.rating, 0) /
            b.reviews.length;
          return avgRatingB - avgRatingA;
        });
        break;
      case "Top seller":
        filteredProducts.sort((a, b) => b.sales - a.sales);
        break;
      case "offers":
        filteredProducts = products.filter((product) => product.discount > 0);
        break;
      case "Material":
      case "size":
      case "Color":
      case "Doors":
      case "Features":
      case "sales":
        break;
      default:
        filteredProducts = [...products];
    }

    setSortedProducts(filteredProducts);
  };

  const filters = [
    { name: "price" },
    { name: "ratings" },
    { name: "Top seller" },
    { name: "offers" },
    { name: "Material" },
    { name: "size" },
    { name: "Color" },
    { name: "Doors" },
    { name: "Features" },
    { name: "sales" },
  ];

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToBag = async (productId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const newBagItem = await addItemToBag(productId, 1);
      toast.success(
        `Item added to bag: Product ${newBagItem.productId} with quantity ${newBagItem.quantity}`
      );
      setAddedToBag((prevSet) => new Set(prevSet.add(productId)));
    } catch (error) {
      toast.error("Error adding item to the bag.");
    }
  };

  return (
    <div>
      <CategoryGroup />
      <div>
        <ul className="flex justify-evenly items-center gap-2.5 overflow-x-auto pb-4 mt-2">
          <h2 className="font-bold whitespace-nowrap">Sort By :</h2>
          {filters.map((filter, index) => (
            <li
              key={index}
              className="w-52 min-w-[5rem] rounded-full bg-slate-100 p-1 text-center"
            >
              <button
                onClick={() => handleFilter(filter.name)}
                className={`text-lg flex justify-evenly items-center w-full ${
                  selectedFilter === filter.name ? "underline text-black" : ""
                }`}
              >
                {filter.name} <FaAngleDown />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {sortedProducts.map((product) => {
          const isTopSeller = product.sales > 600;
          const isProductAdded = addedToBag.has(product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-lg hover:shadow-lg hover:scale-105 overflow-auto cursor-pointer p-3"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                {isTopSeller && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Top Seller
                  </span>
                )}
                <div className="h-80 w-full flex items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-auto my-auto object-cover"
                  />
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between h-[200px]">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.stock} in stock
                    </p>
                  </div>
                  <div>
                    {!isProductAdded ? (
                      <button
                        className="w-150px bg-slate-300 rounded-lg hover:bg-slate-500 hover:text-white px-3 py-2"
                        onClick={(event) => handleAddToBag(product.id, event)}
                      >
                        Add to Bag
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-150px bg-slate-500 text-white rounded-lg px-3 py-2"
                      >
                        Added
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductDashboard;
