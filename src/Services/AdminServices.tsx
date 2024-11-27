import api from "./Api";

export interface Admin {
  id: number;
  name: string;
  email: string;
  phoneno: number;
  password: string;
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
