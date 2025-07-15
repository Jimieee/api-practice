import { useState, useEffect, useCallback } from "react";
import { Property, PropertyFormData } from "../types/property.types";
import propertyService from "../services/propertyService";

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProperty: (data: PropertyFormData) => Promise<Property>;
  updateProperty: (id: number, data: PropertyFormData) => Promise<Property>;
  deleteProperty: (id: number) => Promise<void>;
  getPropertyById: (id: number) => Promise<Property>;
}

export const useProperties = (): UsePropertiesResult => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLoadingState = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
    if (isLoading) setError(null);
  }, []);

  const handleError = useCallback((err: unknown): string => {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    setError(errorMessage);
    return errorMessage;
  }, []);

  const fetchProperties = useCallback(async () => {
    setLoadingState(true);
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [setLoadingState, handleError]);

  const createProperty = useCallback(
    async (data: PropertyFormData): Promise<Property> => {
      setLoadingState(true);
      const tempId = Date.now();

      const optimisticProperty: Property = {
        id: tempId,
        name: data.name,
        address: data.address,
        description: data.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProperties((prev) => [...prev, optimisticProperty]);

      try {
        await propertyService.createProperty(data);

        const updatedProperties = await propertyService.getProperties();
        setProperties(updatedProperties);

        const realProperty = updatedProperties[updatedProperties.length - 1];
        return realProperty;
      } catch (err) {
        setProperties((prev) => prev.filter((p) => p.id !== tempId));
        const errorMessage = handleError(err);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [setLoadingState, handleError]
  );

  const updateProperty = useCallback(
    async (id: number, data: PropertyFormData): Promise<Property> => {
      setLoadingState(true);

      const originalProperty = properties.find((p) => p.id === id);
      if (!originalProperty) {
        const errorMessage = "Propiedad no encontrada";
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }

      const optimisticProperty: Property = {
        ...originalProperty,
        name: data.name,
        address: data.address,
        description: data.description,
        updated_at: new Date().toISOString(),
      };

      setProperties((prev) =>
        prev.map((p) => (p.id === id ? optimisticProperty : p))
      );

      try {
        await propertyService.updateProperty(id, data);

        return optimisticProperty;
      } catch (err) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? originalProperty : p))
        );
        const errorMessage = handleError(err);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [properties, setLoadingState, handleError]
  );

  const deleteProperty = useCallback(
    async (id: number): Promise<void> => {
      setLoadingState(true);

      const propertyToDelete = properties.find((p) => p.id === id);
      if (!propertyToDelete) {
        const errorMessage = "Propiedad no encontrada";
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }

      setProperties((prev) => prev.filter((p) => p.id !== id));

      try {
        await propertyService.deleteProperty(id);
      } catch (err) {
        setProperties((prev) => [...prev, propertyToDelete]);
        const errorMessage = handleError(err);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [properties, setLoadingState, handleError]
  );

  // Obtener propiedad por ID
  const getPropertyById = useCallback(
    async (id: number): Promise<Property> => {
      setLoadingState(true);
      try {
        const property = await propertyService.getPropertyById(id);
        return property;
      } catch (err) {
        const errorMessage = handleError(err);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [setLoadingState, handleError]
  );

  // Efecto para carga inicial
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
  };
};
