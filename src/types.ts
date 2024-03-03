export interface Company {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
  }
  
  export interface Employee {
    id: number;
    companyId: number
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    url: string;
    phone: string;
    birthdate: string;
    isActive: boolean;
  }
  
  export interface AuthResponse {
    userToken: string;
    role: string;
    displayName: string;
    login: string;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  