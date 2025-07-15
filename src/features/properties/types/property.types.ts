export interface Property {
  id: number;
  name: string;
  address: string;
  description: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyFormData {
  id?: number;
  name: string;
  address: string;
  description: string;
  image?: File | null;
}

export interface CreatePropertyRequest {
  name: string;
  address: string;
  description: string;
}

export interface UpdatePropertyRequest {
  name: string;
  address: string;
  description: string;
}

export interface PropertyResponse {
  id: number;
  name: string;
  address: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}