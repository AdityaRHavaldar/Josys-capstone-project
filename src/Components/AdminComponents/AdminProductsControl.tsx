import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  Product,
  useDeleteProduct,
} from "../../Services/ProductServices";

function AdminProductsControl() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };

    loadProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleProductClick = (productId: number) => {};

  const handleDelete = (productId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      confirmDelete(productId);
    }
  };

  const confirmDelete = async (productId: number) => {
    try {
      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div>
      <div className="w-full m-auto text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-[60%] px-4 py-2 rounded-full shadow-md focus:outline-none"
          placeholder="Search for products..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => {
          const isTopSeller = product.sales > 600;

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
                    <button
                      className="w-150px text-white bg-red-500 rounded-lg hover:bg-red-600 px-3 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminProductsControl;
