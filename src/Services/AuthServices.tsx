import { fetchUsers, User } from "./CustomersServices";
import { fetchAdmins, Admin } from "./AdminServices";

export const authenticate = async (
  emailOrPhone: string,
  password: string
): Promise<User | Admin | null> => {
  const users = await fetchUsers();
  const admins = await fetchAdmins();

  const user = users.find(
    (u) =>
      (u.email === emailOrPhone || u.phoneno === +emailOrPhone) &&
      u.password === password
  );
  const admin = admins.find(
    (a) =>
      (a.email === emailOrPhone || a.phoneno === +emailOrPhone) &&
      a.password === password
  );

  if (user) return user;
  if (admin) return admin;

  return null;
};
