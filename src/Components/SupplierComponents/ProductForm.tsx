import React, { useState } from "react";
import { Product } from "../../Services/ProductServices";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [productName, setProductName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [discount, setDiscount] = useState(product?.discount || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [images, setImages] = useState(product?.images || []);
  const [colors, setColors] = useState(product?.colors || []);
  const [materials, setMaterials] = useState(product?.materials || []);
  const [dimensions] = useState(
    product?.dimensions || { width: 15, depth: 20, height: 18 }
  );
  const [reviews] = useState(product?.reviews || []);

  const supplierId = Number(sessionStorage.getItem("supplierId"));

  const handleSave = () => {
    const updatedProduct = {
      id: product?.id,
      name: productName,
      description,
      category,
      sales: 50,
      price,
      discount,
      supplierId: supplierId,
      stock,
      images,
      colors,
      materials,
      dimensions,
      reviews,
    };
    onSave(updatedProduct);
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
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
                  placeholder="Enter Name"
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
                  placeholder="Enter Description"
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
                  placeholder="Enter Category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={price === 0 ? "" : price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Enter Price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Discount
                </label>
                <input
                  type="number"
                  value={discount === 0 ? "" : discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  placeholder="Enter Discount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock === 0 ? "" : stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="Enter Stock"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Colors (Comma separated)
                </label>
                <input
                  type="text"
                  value={colors.join(", ")}
                  onChange={(e) =>
                    setColors(
                      e.target.value.split(",").map((color) => color.trim())
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter colors, separated by commas"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Materials (Comma separated)
                </label>
                <input
                  type="text"
                  value={materials.join(", ")}
                  onChange={(e) =>
                    setMaterials(
                      e.target.value
                        .split(",")
                        .map((material) => material.trim())
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter materials, separated by commas"
                />
              </div>

              <div className="mb-4 max-h-56 overflow-y-auto">
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                {images.map((image, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => {
                        const updatedImages = [...images];
                        updatedImages[index] = e.target.value;
                        setImages(updatedImages);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter image URL"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="ml-2 text-red-500 mr-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setImages([...images, ""])}
                  className="mt-2 text-blue-500 rounded-md"
                >
                  + Add Image
                </button>
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
