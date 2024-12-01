import { useUsers, useDeleteUser } from "../../Services/CustomersServices";

function AdminUsersControl() {
  const { data: users, isLoading, isError, refetch } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (userId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      deleteUser(userId, {
        onSuccess: () => {
          alert("User deleted successfully.");
          refetch();
        },
        onError: (error) => {
          alert("Failed to delete user.");
        },
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users!</p>;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Manage Users</h2>
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
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2 text-center">
                {user.id}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.name}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.email}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {user.phoneno}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded "
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersControl;
