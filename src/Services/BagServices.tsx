import api from "./Api";

export interface BagItem {
  productId: number;
  quantity: number;
  id: number;
}

export const fetchBagItems = async (): Promise<BagItem[]> => {
  const response = await api.get("/bag");
  return response.data;
};

export const addItemToBag = async (
  productId: number,
  quantity: number
): Promise<BagItem> => {
  const existingItemResponse = await api.get(`/bag?productId=${productId}`);
  const existingItem = existingItemResponse.data[0];

  if (existingItem) {
    const updatedQuantity = existingItem.quantity + quantity;
    const response = await api.put(`/bag/${existingItem.id}`, {
      productId,
      quantity: updatedQuantity,
    });
    return response.data;
  } else {
    const response = await api.post("/bag", { productId, quantity });
    return response.data;
  }
};

// export const removeItemFromBag = async (productId: number): Promise<void> => {
//   const response = await api.delete(`/bag?productId=${productId}`);
//   if (response.status !== 200) {
//     throw new Error("Failed to delete the item from the bag");
//   }
// };

export const removeItemFromBag = async (id: number): Promise<void> => {
  const response = await api.delete(`/bag/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete the item from the bag");
  }
};

export const updateItemQuantity = async (
  productId: number,
  newQuantity: number
): Promise<BagItem> => {
  const existingItemResponse = await api.get(`/bag?productId=${productId}`);
  const existingItem = existingItemResponse.data[0];

  if (existingItem) {
    const response = await api.put(`/bag/${existingItem.id}`, {
      productId,
      quantity: newQuantity,
    });
    return response.data;
  } else {
    throw new Error("Item not found in the bag");
  }
};

export const clearBag = async (): Promise<void> => {
  const response = await api.delete("/bag");
  if (response.status !== 200) {
    throw new Error("Failed to clear the bag");
  }
};
