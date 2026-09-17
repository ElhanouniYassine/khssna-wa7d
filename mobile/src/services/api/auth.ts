import api from "./client";

export type AuthResponse = {
  token: string;
};

export type UserResponse = {
  name: string;
  email: string;
  city: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  city: string;
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (
  data: RegisterRequest,
): Promise<UserResponse> => {
  const response = await api.post<UserResponse>("/users", data);

  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>("/users/me");

  return response.data;
};
