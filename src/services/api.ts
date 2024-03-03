import { LoginCredentials, AuthResponse, Company, Employee } from "../types";
import { API_URL } from "../config";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json() as Promise<AuthResponse>;
};

export const fetchCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${API_URL}/company`);
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json() as Promise<Company[]>;
};

export const fetchEmployees = async (selectedCompany: number): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/employee?company=${selectedCompany}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json() as Promise<Employee[]>;
};
