import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./Api";

export interface Product {
  id: number;
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
  reviews: {
    rating: number;
    comment: string;
  }[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProductById = async (productId: number): Promise<Product> => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export const fetchProductsByValue = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await fetch(
      `http://localhost:3200/products?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const createProduct = async (productData: Product): Promise<Product> => {
  const response = await api.post("/products", productData);
  return response.data;
};

// export const updateProduct = async (
//   productId: number,
//   productData: Product
// ): Promise<Product> => {
//   const response = await api.put(`/products/${productId}`, productData);
//   return response.data;
// };

export const deleteProduct = async (productId: number): Promise<void> => {
  await api.delete(`/products/${productId}`);
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProduct = (productId: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
};

export const useCreateProduct = () => {
  return useMutation<Product, Error, Product>({
    mutationFn: createProduct,
  });
};
