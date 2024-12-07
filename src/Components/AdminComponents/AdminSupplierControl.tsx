import React, { useState, ChangeEvent, useEffect } from "react";
import {
  useSuppliers,
  useCreateSupplier,
  useUpdateSupplier,
  useDeleteSupplier,
  Supplier,
} from "../../Services/SuppliersServices";
import { toast } from "react-toastify";

const AdminSuppliersControl: React.FC = () => {
  const { data: suppliers, isLoading, isError, refetch } = useSuppliers();
  const { mutate: createSupplier } = useCreateSupplier();
  const { mutate: updateSupplier } = useUpdateSupplier();
  const { mutate: deleteSupplier } = useDeleteSupplier();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [supplierData, setSupplierData] = useState<Supplier>({
    id: 0,
    name: "",
    email: "",
    phoneno: "",
    address: "",
    pincode: "",
    password: "",
    newPassword: "",
    role: "supplier",
    productArray: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (isEdit) {
      const updatedSupplierData = {
        ...supplierData,
        password: supplierData.password ? supplierData.password : undefined,
      };

      updateSupplier(
        { supplierId: supplierData.id, supplierData: updatedSupplierData },
        {
          onSuccess: () => {
            toast.success("Supplier updated successfully.");
            setIsModalOpen(false);
            refetch();
          },
          onError: () => {
            toast.error("Failed to update supplier.");
          },
        }
      );
    } else {
      createSupplier(supplierData, {
        onSuccess: () => {
          toast.success("Supplier created successfully.");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to create supplier.");
        },
      });
    }
  };

  const openCreateModal = () => {
    setIsEdit(false);
    setSupplierData({
      id: 0,
      name: "",
      email: "",
      phoneno: "",
      address: "",
      pincode: "",
      password: "",
      newPassword: "",
      role: "supplier",
      productArray: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (supplier: Supplier) => {
    setIsEdit(true);
    setSupplierData(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (supplierId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
    if (confirmed) {
      deleteSupplier(supplierId, {
        onSuccess: () => {
          toast.success("Supplier deleted successfully.");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete supplier.");
        },
      });
    }
  };

  useEffect(() => {
    if (isEdit && supplierData.password === "") {
      setSupplierData((prevState) => ({
        ...prevState,
        password: "",
      }));
    }
  }, [isEdit, supplierData.password]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching suppliers!</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={openCreateModal}
        >
          New Supplier
        </button>
      </div>

      <table className="min-w-full table-auto mt-4 border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone No.</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers?.map((supplier) => (
            <tr key={supplier.id}>
              <td className="border border-gray-300 p-2 text-center">
                {supplier.id}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {supplier.name}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {supplier.email}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {supplier.phoneno}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => openEditModal(supplier)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(supplier.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">
              {isEdit ? "Update Supplier" : "Create Supplier"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={supplierData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full border p-2 mb-4 rounded-md"
                />
              </div>

              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={supplierData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border p-2 mb-4 rounded-md"
                />
              </div>

              <div>
                <label>Phone No.:</label>
                <input
                  type="text"
                  name="phoneno"
                  value={supplierData.phoneno}
                  onChange={handleChange}
                  pattern="^[6-9][0-9]{9}$"
                  placeholder="Enter Phone No"
                  className="w-full border p-2 mb-4 rounded-md"
                />
              </div>

              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={supplierData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full border p-2 mb-4 rounded-md"
                />
              </div>

              <div>
                <label>Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={supplierData.pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
                  className="w-full border p-2 mb-4 rounded-md"
                />
              </div>

              <div>
                <label>Password:</label>
                <input
                  type={isEdit ? "password" : "text"}
                  name="password"
                  value={supplierData.password}
                  onChange={handleChange}
                  className="w-full border p-2 mb-4 rounded-md"
                  placeholder={
                    isEdit ? "Leave blank to keep unchanged" : "Enter password"
                  }
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isEdit ? "Update Supplier" : "Create Supplier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuppliersControl;
