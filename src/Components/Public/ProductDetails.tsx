import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Services/ProductServices";
import { addItemToBag, fetchBagItemsById } from "../../Services/BagServices";
import { toast, ToastContainer } from "react-toastify";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  sales: number;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  colors: string[];
  materials: string[];
  dimensions: { width: number; depth: number; height: number };
  reviews: { rating: number; comment: string }[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [addedToBag, setAddedToBag] = useState<Set<number>>(new Set());
  const [bagItems, setBagItems] = useState<any[]>([]); // state for current items in the bag

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(Number(id));
      setProduct(data);
      setCurrentImage(data.images[0]);
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const loadBagItems = async () => {
      const userId = sessionStorage.getItem("id");
      if (userId) {
        const items = await fetchBagItemsById(Number(userId));
        setBagItems(items);
      }
    };
    loadBagItems();
  }, []);

  if (!product) return <div>Loading...</div>;

  const rating = (product.sales / 3) | 0;

  const handleAddToBag = async (productId: number) => {
    const userId = sessionStorage.getItem("id");

    if (userId) {
      try {
        // Check if the product has already been added
        if (addedToBag.has(productId)) {
          toast.info("This item is already in your bag.");
          return;
        }

        // Add the item to the bag
        const newBagItem = await addItemToBag(productId, 1, Number(userId));

        // Display a success toast.
        toast.success(
          `Item added to bag: Product ${newBagItem.productId} with quantity ${newBagItem.quantity}`
        );

        // Update the 'addedToBag' set to prevent adding the same product repeatedly.
        setAddedToBag((prevSet) => new Set(prevSet.add(productId)));

        // Fetch and update the bag items list after adding an item.
        const updatedBagItems = await fetchBagItemsById(Number(userId));
        setBagItems(updatedBagItems);
      } catch (error) {
        // Display an error toast if something goes wrong.
        toast.error("Error adding item to the bag.");
      }
    } else {
      // Handle the case where the user is not logged in
      toast.error("Please log in to add items to the bag.");
    }
  };

  return (
    <div className="flex justify-between p-8">
      <div className="w-[60vw] flex flex-nowrap">
        <div className="flex flex-col gap-4 w-[20%]">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 object-cover cursor-pointer rounded-md border-2 border-transparent hover:border-blue-500 transition"
              onMouseEnter={() => setCurrentImage(image)}
            />
          ))}
        </div>
        <div className="p-20">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-auto max-h-[70vh] object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="w-[40vw] pt-20 relative right-0 top-0">
        <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
        <div className="text-sm text-gray-600 mt-2">
          <p>{`Dimensions: ${product.dimensions.height} (H) x ${product.dimensions.width} (W) x ${product.dimensions.depth} (D)`}</p>
        </div>

        <div>
          <p className="text-2xl font-sans mt-4">{product.description}</p>
        </div>

        <div className="flex items-center mt-4">
          <span className="text-lg line-through text-gray-500">
            ${product.price}
          </span>
          <span className="text-2xl font-bold ml-4">
            ${(product.price - product.discount).toFixed(2)}
          </span>
        </div>
        <span className="text-sm text-gray-500 mt-2 block">
          Price incl. of all taxes
        </span>

        <div className="flex items-center mt-4">
          <span className="text-yellow-500">{"★ 4"}</span>
          <span className="ml-2 text-gray-500">({rating} reviews)</span>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold">Choose Color:</p>
          <div className="flex items-center gap-4">
            {product.colors.map((color) => (
              <label key={color} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  onChange={() => {}}
                  className="h-4 w-4"
                />
                <span className="text-sm">{color}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold">Availability:</p>
          <p>{product.stock} in stock</p>
        </div>

        <button
          onClick={() => handleAddToBag(product.id)}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add to Bag
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
