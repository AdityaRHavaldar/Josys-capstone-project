import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./Api";

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin";
}

export const fetchAdmins = async (): Promise<Admin[]> => {
  const response = await api.get("/admin");
  return response.data;
};

export const fetchAdminById = async (adminId: number): Promise<Admin> => {
  const response = await api.get(`/admin/${adminId}`);
  return response.data;
};

export const createAdmin = async (adminData: Admin): Promise<Admin> => {
  const response = await api.post("/admin", adminData);
  return response.data;
};

export const updateAdmin = async (
  adminId: number,
  adminData: Admin
): Promise<Admin> => {
  const response = await api.put(`/admin/${adminId}`, adminData);
  return response.data;
};

export const deleteAdmin = async (adminId: number): Promise<void> => {
  await api.delete(`/admin/${adminId}`);
};

export const useAdmins = () => {
  return useQuery<Admin[], Error>({
    queryKey: ["admins"],
    queryFn: fetchAdmins,
  });
};

export const useAdmin = (adminId: number) => {
  return useQuery<Admin, Error>({
    queryKey: ["admin", adminId],
    queryFn: () => fetchAdminById(adminId),
  });
};

export const useCreateAdmin = () => {
  return useMutation<Admin, Error, Admin>({
    mutationFn: createAdmin,
  });
};

export const useUpdateAdmin = () => {
  return useMutation<Admin, Error, { adminId: number; adminData: Admin }>({
    mutationFn: ({ adminId, adminData }) => updateAdmin(adminId, adminData),
  });
};

export const useDeleteAdmin = () => {
  return useMutation<void, Error, number>({
    mutationFn: deleteAdmin,
  });
};
