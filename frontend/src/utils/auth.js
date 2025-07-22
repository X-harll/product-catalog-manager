// src/utils/auth.js
export const setAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
