import React, { useState, ChangeEvent } from "react";
import {
  useSuppliers,
  useCreateSupplier,
  useUpdateSupplier,
  useDeleteSupplier,
  Supplier,
} from "../../Services/SuppliersServices";

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
    phoneno: 0,
    address: "",
    pincode: 0,
    password: "",
    role: "supplier",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateSupplier(
        { supplierId: supplierData.id, supplierData },
        {
          onSuccess: () => {
            alert("Supplier updated successfully.");
            setIsModalOpen(false);
            refetch();
          },
          onError: () => {
            alert("Failed to update supplier.");
          },
        }
      );
    } else {
      createSupplier(supplierData, {
        onSuccess: () => {
          alert("Supplier created successfully.");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          alert("Failed to create supplier.");
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
      phoneno: 0,
      address: "",
      pincode: 0,
      password: "",
      role: "supplier",
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
          alert("Supplier deleted successfully.");
          refetch();
        },
        onError: () => {
          alert("Failed to delete supplier.");
        },
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching suppliers!</p>;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Manage Suppliers</h2>
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
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {isEdit ? "Update Supplier" : "Create Supplier"}
            </h3>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={supplierData.name}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={supplierData.email}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />
              <label>Phone No.:</label>
              <input
                type="text"
                name="phoneno"
                value={supplierData.phoneno}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={supplierData.address}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />
              <label>Pincode:</label>
              <input
                type="text"
                name="pincode"
                value={supplierData.pincode}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />
              <label>Password:</label>
              <input
                type="text"
                name="password"
                value={supplierData.password}
                onChange={handleChange}
                className="w-full border p-2 mb-4"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                {isEdit ? "Update Supplier" : "Create Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuppliersControl;
