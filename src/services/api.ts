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

export const deleteCompany = async (id: number, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/company/delete/${id}`, {
    method: 'GET',
    headers: {
      'x-client-token': token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete company');
  }
};

export const setCompanyStatus = async (id: number, isActive: boolean, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/company/status/${id}`, {
    method: 'PATCH',
    headers: {
      'x-client-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isActive: isActive,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to deactivate company');
  }
};

export const addCompany = async (name: string, description: string, token: string): Promise<Company> => {
  const response = await fetch(`${API_URL}/company`, {
    method: 'POST',
    headers: {
      'x-client-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      description: description,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create company');
  }

  return response.json() as Promise<Company>;
};
