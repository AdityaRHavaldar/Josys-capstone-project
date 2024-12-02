import React, { useState } from "react";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

interface Product {
  id?: number;
  name: string;
  description: string;
  category: string;
  sales: number;
  price: number;
  discount: number;
  supplierId: string | null;
  stock: number;
  images: string[];
  colors: string[];
  materials: string[];
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  reviews: { rating: number; comment: string }[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [productName, setProductName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [sales, setSales] = useState(product?.sales || 0);
  const [price, setPrice] = useState(product?.price || 0);
  const [discount, setDiscount] = useState(product?.discount || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [images, setImages] = useState(product?.images || []);
  const [colors, setColors] = useState(product?.colors || []);
  const [materials, setMaterials] = useState(product?.materials || []);
  const [dimensions, setDimensions] = useState(
    product?.dimensions || { width: 0, depth: 0, height: 0 }
  );
  const [reviews, setReviews] = useState(
    product?.reviews || [{ rating: 0, comment: "" }]
  );

  const supplierId = sessionStorage.getItem("supplierId");

  const handleSave = () => {
    const updatedProduct = {
      id: product?.id,
      name: productName,
      description,
      category,
      sales,
      price,
      discount,
      supplierId: supplierId ? supplierId : null,
      stock,
      images,
      colors,
      materials,
      dimensions,
      reviews,
    };
    onSave(updatedProduct);
  };

  const handleArrayChange = (
    field: "colors" | "materials" | "images",
    value: string
  ) => {
    if (value.trim() !== "") {
      if (field === "colors") {
        setColors([...colors, value.trim()]);
      } else if (field === "materials") {
        setMaterials([...materials, value.trim()]);
      } else if (field === "images") {
        setImages([...images, value.trim()]);
      }
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: "colors" | "materials" | "images",
    currentValue: string
  ) => {
    if (event.key === "Enter") {
      handleArrayChange(field, currentValue);
    }
  };

  return (
    <div className="modal bg-white p-6 my-28 mx-[20vw] rounded-md">
      <div className="modal-content">
        <h2 className="text-xl font-semibold mb-4">
          {product ? "Update" : "Add"} Product
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-10">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Sales
                </label>
                <input
                  type="number"
                  value={sales}
                  onChange={(e) => setSales(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Display the colors, materials, and images as comma-separated values */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Colors
                </label>
                <input
                  type="text"
                  value={colors} // Always show an empty value here
                  // onChange={(e) => {setColors(e.target.value)}}
                  onKeyDown={(e) =>
                    handleKeyPress(e, "colors", e.currentTarget.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Press Enter to add a new color"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Materials
                </label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => {}}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Press Enter to add a new material"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <div className="mb-2">{images.join(", ")}</div>
                <input
                  type="text"
                  value={""}
                  onChange={(e) => {}}
                  onKeyDown={(e) =>
                    handleKeyPress(e, "images", e.currentTarget.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Press Enter to add a new image URL"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
