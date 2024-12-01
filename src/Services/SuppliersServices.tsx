import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./Api";
import * as bcrypt from "bcryptjs";

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phoneno: number;
  address: string;
  pincode: number;
  password: string;
  role: "supplier";
}

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  const response = await api.get("/suppliers");
  return response.data;
};

export const fetchSupplierById = async (
  supplierId: number
): Promise<Supplier> => {
  const response = await api.get(`/suppliers/${supplierId}`);
  return response.data;
};

export const createSupplier = async (
  supplierData: Omit<Supplier, "id" | "role">
): Promise<Supplier> => {
  const hashedPassword = await bcrypt.hash(supplierData.password, 10);

  const supplierWithHashedPassword = {
    ...supplierData,
    password: hashedPassword,
    role: "supplier",
  };

  const response = await api.post("/suppliers", supplierWithHashedPassword);
  return response.data;
};

export const updateSupplier = async (
  supplierId: number,
  supplierData: Supplier
): Promise<Supplier> => {
  if (supplierData.password) {
    supplierData.password = await bcrypt.hash(supplierData.password, 10);
  }

  const response = await api.put(`/suppliers/${supplierId}`, supplierData);
  return response.data;
};

export const deleteSupplier = async (supplierId: number): Promise<void> => {
  await api.delete(`/suppliers/${supplierId}`);
};

export const useSuppliers = () => {
  return useQuery<Supplier[], Error>({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
  });
};

export const useSupplier = (supplierId: number) => {
  return useQuery<Supplier, Error>({
    queryKey: ["supplier", supplierId],
    queryFn: () => fetchSupplierById(supplierId),
  });
};

export const useCreateSupplier = () => {
  return useMutation<Supplier, Error, Supplier>({
    mutationFn: createSupplier,
  });
};

export const useUpdateSupplier = () => {
  return useMutation<
    Supplier,
    Error,
    { supplierId: number; supplierData: Supplier }
  >({
    mutationFn: ({ supplierId, supplierData }) =>
      updateSupplier(supplierId, supplierData),
  });
};

export const useDeleteSupplier = () => {
  return useMutation<void, Error, number>({
    mutationFn: deleteSupplier,
  });
};
