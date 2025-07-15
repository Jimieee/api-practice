import apiClient from "@/lib/axios";
import {
  Property,
  PropertyFormData,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyResponse,
} from "../types/property.types";

class PropertyService {
  private baseUrl = "/accomodations";

  async getProperties(): Promise<Property[]> {
    try {
      const response = await apiClient.get<PropertyResponse[]>(this.baseUrl);
      return response.data.map(this.mapResponseToProperty);
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw new Error("No se pudieron cargar las propiedades");
    }
  }

  async getPropertyById(id: number): Promise<Property> {
    try {
      const response = await apiClient.get<PropertyResponse>(
        `/accomodation/${id}`
      );
      return this.mapResponseToProperty(response.data);
    } catch (error) {
      console.error("Error fetching property:", error);
      throw new Error("No se pudo cargar la propiedad");
    }
  }

  async createProperty(propertyData: PropertyFormData): Promise<Property> {
    try {
      const requestData: CreatePropertyRequest = {
        name: propertyData.name,
        address: propertyData.address,
        description: propertyData.description,
      };

      const response = await apiClient.post<PropertyResponse>(
        "/accomodation",
        requestData
      );
      return this.mapResponseToProperty(response.data);
    } catch (error) {
      console.error("Error creating property:", error);
      throw new Error("No se pudo crear la propiedad");
    }
  }

  async updateProperty(
    id: number,
    propertyData: PropertyFormData
  ): Promise<Property> {
    try {
      const requestData: UpdatePropertyRequest = {
        name: propertyData.name,
        address: propertyData.address,
        description: propertyData.description,
      };

      const response = await apiClient.put<PropertyResponse>(
        `/accomodation/${id}`,
        requestData
      );
      return this.mapResponseToProperty(response.data);
    } catch (error) {
      console.error("Error updating property:", error);
      throw new Error("No se pudo actualizar la propiedad");
    }
  }

  async deleteProperty(id: number): Promise<void> {
    try {
      await apiClient.delete(`/accomodation/${id}`);
    } catch (error) {
      console.error("Error deleting property:", error);
      throw new Error("No se pudo eliminar la propiedad");
    }
  }

  private mapResponseToProperty(response: PropertyResponse): Property {
    return {
      id: response.id,
      name: response.name,
      address: response.address,
      description: response.description,
      image: response.image,
      created_at: response.created_at,
      updated_at: response.updated_at,
    };
  }
}

export const propertyService = new PropertyService();
export default propertyService;
