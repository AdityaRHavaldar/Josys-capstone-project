import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  Product,
  deleteProduct,
  // updateProduct,
} from "../../Services/ProductServices";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";

const SupplierDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const supplierId = Number(sessionStorage.getItem("supplierId"));

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      const supplierProducts = data.filter(
        (product) => product.supplierId === supplierId
      );
      setProducts(supplierProducts);
      setFilteredProducts(supplierProducts);
    };

    loadProducts();
  }, [supplierId]);

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

  const handleDelete = (productId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      confirmDelete(productId);
      deleteProduct(productId);
    }
  };

  const confirmDelete = async (productId: number) => {
    try {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const handleProductClick = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCurrentProduct(product);
      setShowModal(true);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.href = "/home/index";
  };

  return (
    <div>
      <div className="w-full text-center bg-slate-300 p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-[60%] px-4 py-2 rounded-full shadow-md focus:outline-none"
          placeholder="Search for products..."
        />
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-32 hover:scale-105"
        >
          Add New Product
        </button>
        <button
          onClick={handleLogOut}
          className="text-lg transition-colors text-nowrap ml-4 p-2 rounded-full hover:bg-slate-400 duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>
      <hr />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg hover:shadow-lg hover:scale-105 overflow-auto cursor-pointer p-3"
            >
              <div className="relative">
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
                      className="text-white bg-blue-500 rounded-lg hover:bg-blue-600 px-3 py-2 mr-2"
                      onClick={() => handleProductClick(product.id)}
                    >
                      Update
                    </button>
                    <button
                      className="text-white bg-red-500 rounded-lg hover:bg-red-600 px-3 py-2"
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <ProductForm
            product={
              currentProduct
                ? {
                    ...currentProduct,
                    supplierId: String(currentProduct.supplierId),
                  }
                : null
            }
            onClose={handleModalClose}
            onSave={(updatedProduct) => {
              if (currentProduct) {
                // Update existing product
                //   updateProduct(updatedProduct);
              } else {
                // Add new product
                // Your logic for adding a new product
              }
              handleModalClose();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SupplierDashboard;
