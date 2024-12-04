import * as bcrypt from "bcryptjs";
import { fetchUsers, User } from "./CustomersServices";
import { fetchAdmins, Admin } from "./AdminServices";
import { fetchSuppliers, Supplier } from "./SuppliersServices";

export const authenticate = async (
  emailOrPhone: string,
  password: string
): Promise<User | Admin | Supplier | null> => {
  const users = await fetchUsers();
  const admins = await fetchAdmins();
  const suppliers = await fetchSuppliers();

  const user = users.find(
    (u) =>
      (u.email === emailOrPhone || u.phoneno === +emailOrPhone) &&
      bcrypt.compareSync(password, u.password)
  );

  if (user) return user;

  const admin = admins.find(
    (a) => a.email === emailOrPhone && bcrypt.compareSync(password, a.password)
  );

  if (admin) return admin;

  const supplier = suppliers.find(
    (s) =>
      (s.email === emailOrPhone || s.phoneno === +emailOrPhone) &&
      bcrypt.compareSync(password, s.password!)
  );

  if (supplier) return supplier;

  return null;
};
