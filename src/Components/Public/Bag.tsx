import React, { useState, useEffect } from "react";
import {
  fetchBagItemsById,
  removeItemFromBag,
  updateItemQuantity,
  clearBag,
  BagItem,
} from "../../Services/BagServices";
import { fetchProductById, Product } from "../../Services/ProductServices";
import { toast } from "react-toastify";

function Bag() {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userId = Number(sessionStorage.getItem("userId"));

  useEffect(() => {
    const loadBagItems = async () => {
      if (userId) {
        const items = await fetchBagItemsById(userId);
        setBagItems(items);
      }
    };

    loadBagItems();
  }, [userId]);

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
                      ₹{(product?.price ?? 0) * item.quantity}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end items-center gap-8">
            <h2 className="text-xl font-semibold">
              Grand Total: ₹{totalAmount.toFixed(2)}
            </h2>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded"
              onClick={handlePurchase}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Confirm Payment</h3>
            <p className="my-4">
              Are you sure you want to confirm the payment?
            </p>

            <div className="flex justify-between">
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
  );
}

export default Bag;
