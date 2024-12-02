import React, { useState, useEffect } from "react";
import {
  fetchBagItemsById,
  removeItemFromBag,
  updateItemQuantity,
  clearBag,
} from "../../Services/BagServices";
import { fetchProductById, Product } from "../../Services/ProductServices";
import { toast, ToastContainer } from "react-toastify";

function Bag() {
  const [bagItems, setBagItems] = useState<
    {
      id: number;
      productId: number;
      quantity: number;
    }[]
  >([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempAddress, setTempAddress] = useState<string>("");

  useEffect(() => {
    const loadBagItems = async () => {
      const userId = Number(sessionStorage.getItem("id"));
      if (userId) {
        const items = await fetchBagItemsById(userId);
        setBagItems(items);
      }
    };

    loadBagItems();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const productData = await Promise.all(
        bagItems.map(async (item) => {
          const product = await fetchProductById(item.productId);
          return product;
        })
      );
      setProducts(productData);
    };

    if (bagItems.length > 0) {
      loadProducts();
    }
  }, [bagItems]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      for (let i = 0; i < bagItems.length; i++) {
        const product = products.find(
          (prod) => prod.id === bagItems[i].productId
        );
        if (product) {
          total += product.price * bagItems[i].quantity;
        }
      }
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [bagItems, products]);

  const handleDeleteProduct = async (id: number) => {
    await removeItemFromBag(id);
    setBagItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleIncrementQuantity = async (productId: number) => {
    const item = bagItems.find((item) => item.productId === productId);
    const userId = sessionStorage.getItem("id");
    if (item && userId) {
      await updateItemQuantity(productId, item.quantity + 1, Number(userId));
      setBagItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const handleDecrementQuantity = async (productId: number) => {
    const item = bagItems.find((item) => item.productId === productId);
    const userId = sessionStorage.getItem("id");
    if (item && item.quantity > 1 && userId) {
      await updateItemQuantity(productId, item.quantity - 1, Number(userId));
      setBagItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const userId = sessionStorage.getItem("id");

  const handlePurchase = () => {
    if (userId) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      await clearBag();
      setBagItems([]);
      toast.success("Payment successful! Thank you for shopping at IEKA.");
    } catch (error) {
      console.log("Error clearing the bag. Please try again.");
    }
    setShowConfirmation(false);
  };

  const handleCancelPayment = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center w-full py-4">Your Bag</h1>
      {!bagItems.length ? (
        <div className="m-auto text-center">
          <h1 className="text-2xl">Your shopping bag is empty</h1>
          <p className="my-2">
            When you add products to your shopping bag, they will appear here.
          </p>

          {!userId && (
            <div>
              <p className="my-2">
                Can't find your products? Make sure you're logged in.
              </p>
              <button className="bg-black rounded-full text-white px-3 py-2">
                Login
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">Product Name</th>
                <th className="px-4 py-2 border-b text-center">Quantity</th>
                <th className="px-4 py-2 border-b text-center">Price</th>
                <th className="px-4 py-2 border-b text-center">Total</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bagItems.map((item) => {
                const product = products.find(
                  (prod) => prod.id === item.productId
                );
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-2 border-b text-center">
                      {product?.name}
                    </td>
                    <td className="px-4 py-3 border-b flex justify-center items-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDecrementQuantity(item.productId)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleIncrementQuantity(item.productId)}
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      ₹{product?.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      ₹{(product?.price! * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">
                Total: ₹{totalAmount.toFixed(2)}
              </h2>
            </div>
            <div>
              <button
                onClick={handlePurchase}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Proceed to Payment
              </button>
            </div>
          </div>

          {showConfirmation && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded shadow-md max-w-sm w-full">
                <h2 className="text-xl">Confirm Purchase</h2>
                <p>Are you sure you want to complete the purchase?</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleCancelPayment}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleConfirmPayment}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Bag;
