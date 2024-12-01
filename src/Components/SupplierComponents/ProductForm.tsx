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
  supplierId: number;
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
  const [images, setImages] = useState(product?.images || [""]);
  const [colors, setColors] = useState(product?.colors || [""]);
  const [materials, setMaterials] = useState(product?.materials || [""]);
  const [dimensions, setDimensions] = useState(
    product?.dimensions || { width: 0, depth: 0, height: 0 }
  );
  const [reviews, setReviews] = useState(
    product?.reviews || [{ rating: 0, comment: "" }]
  );

  const addInputField = (field: string) => {
    if (field === "colors") {
      setColors([...colors, ""]);
    } else if (field === "materials") {
      setMaterials([...materials, ""]);
    } else if (field === "reviews") {
      setReviews([...reviews, { rating: 0, comment: "" }]);
    }
  };

  const handleSave = () => {
    const updatedProduct = {
      id: product?.id,
      name: productName,
      description,
      category,
      sales,
      price,
      discount,
      supplierId: 1, // Assuming supplierId is fixed for the supplier
      stock,
      images,
      colors,
      materials,
      dimensions,
      reviews,
    };
    onSave(updatedProduct);
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Colors
                </label>
                {colors.map((color, index) => (
                  <div key={index} className="flex mb-2 items-center">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...colors];
                        newColors[index] = e.target.value;
                        setColors(newColors);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {index === colors.length - 1 && (
                      <button
                        type="button"
                        onClick={() => addInputField("colors")}
                        className="ml-2 text-green-600"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Materials
                </label>
                {materials.map((material, index) => (
                  <div key={index} className="flex mb-2 items-center">
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => {
                        const newMaterials = [...materials];
                        newMaterials[index] = e.target.value;
                        setMaterials(newMaterials);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {index === materials.length - 1 && (
                      <button
                        type="button"
                        onClick={() => addInputField("materials")}
                        className="ml-2 text-green-600"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
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
              {product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
