import api from "./Api";
import { v4 as uuidv4 } from "uuid";

export interface BagItem {
  productId: number;
  quantity: number;
  id: number;
  userId: number;
  cartId: number;
}

export const fetchBagItems = async (): Promise<BagItem[]> => {
  const response = await api.get("/bag");
  return response.data;
};

export const fetchBagItemsById = async (userId: number): Promise<BagItem[]> => {
  const response = await api.get(`/bag?userId=${userId}`);
  return response.data;
};

export const addItemToBag = async (
  productId: number,
  quantity: number,
  userId: number
): Promise<BagItem> => {
  const existingItemResponse = await api.get(
    `/bag?productId=${productId}&userId=${userId}`
  );
  const existingItem = existingItemResponse.data[0];

  const cartId = uuidv4();

  if (existingItem) {
    const updatedQuantity = existingItem.quantity + quantity;
    const response = await api.put(`/bag/${existingItem.id}`, {
      productId,
      quantity: updatedQuantity,
      userId,
      cartId: existingItem.cartId,
    });
    return response.data;
  } else {
    const response = await api.post("/bag", {
      productId,
      quantity,
      userId,
      cartId,
    });
    return response.data;
  }
};

export const removeItemFromBag = async (id: number): Promise<void> => {
  const response = await api.delete(`/bag/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete the item from the bag");
  }
};

export const updateItemQuantity = async (
  productId: number,
  newQuantity: number,
  userId: number
): Promise<BagItem> => {
  const existingItemResponse = await api.get(
    `/bag?productId=${productId}&userId=${userId}`
  );
  const existingItem = existingItemResponse.data[0];

  if (existingItem) {
    const response = await api.put(`/bag/${existingItem.id}`, {
      productId,
      quantity: newQuantity,
      userId,
      cartId: existingItem.cartId,
    });
    return response.data;
  } else {
    throw new Error("Item not found in the bag");
  }
};

export const clearBag = async (): Promise<void> => {
  try {
    const bagItems = await fetchBagItems();
    for (const item of bagItems) {
      await api.delete(`/bag/${item.id}`);
    }
  } catch (error) {
    throw new Error("Failed to clear the bag");
  }
};
