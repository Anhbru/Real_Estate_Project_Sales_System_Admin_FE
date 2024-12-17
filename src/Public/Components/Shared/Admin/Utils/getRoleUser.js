export const getRoleUserAdmin = () => {
  const data = sessionStorage.getItem("userRole");
  return data === "Admin";
};
