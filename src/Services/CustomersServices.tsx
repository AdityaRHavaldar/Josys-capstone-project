import * as bcrypt from "bcryptjs";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./Api";
interface orderType {
  id: number;
  quantity: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
  phoneno: number | null;
  password: string;
  gender: string;
  address: string;
  pincode: string;
  role: "user";
  orders: orderType[];
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("/customers");
  return response.data;
};

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/customers/${userId}`);
  return response.data;
};

export const createUser = async (
  userData: Omit<User, "id" | "role">
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const userWithHashedPassword = {
    ...userData,
    password: hashedPassword,
    role: "user",
  };
  const response = await api.post("/customers", userWithHashedPassword);
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

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useUser = (userId: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });
};

export const useCreateUser = () => {
  return useMutation<User, Error, User>({
    mutationFn: createUser,
  });
};

export const useUpdateUser = () => {
  return useMutation<User, Error, { userId: number; userData: User }>({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
  });
};

export const useDeleteUser = () => {
  return useMutation<void, Error, number>({
    mutationFn: deleteUser,
  });
};
