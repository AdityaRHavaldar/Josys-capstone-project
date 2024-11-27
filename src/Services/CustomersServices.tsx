import api from "./Api";

export interface User {
  id: number;
  name: string;
  email: string;
  phoneno: number;
  password: string;
  gender: string;
  address: string;
  pincode: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("/customers");
  return response.data;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/customers/${userId}`);
  return response.data;
};

export const createUser = async (userData: User): Promise<User> => {
  const response = await api.post("/customers", userData);
  return response.data;
};

export const updateUser = async (
  userId: number,
  userData: User
): Promise<User> => {
  const response = await api.put(`/customers/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/customers/${userId}`);
};
