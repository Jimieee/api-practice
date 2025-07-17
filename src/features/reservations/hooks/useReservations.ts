import { useState, useEffect, useCallback } from "react";
import { reservationService } from "../services/reservationService";
import { Reservation, ReservationFormData } from "../types/reservation.types";

export const useReservations = (accommodationId?: number) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(
    async (startDate?: string, endDate?: string) => {
      setLoading(true);
      setError(null);

      try {
        let data: Reservation[];

        if (accommodationId) {
          data = await reservationService.getReservationsByAccommodation(
            accommodationId,
            startDate,
            endDate
          );
        } else {
          data = await reservationService.getAllReservations();
        }

        setReservations(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar reservaciones"
        );
      } finally {
        setLoading(false);
      }
    },
    [accommodationId]
  );

  const createReservation = useCallback(async (data: ReservationFormData) => {
    setLoading(true);
    setError(null);

    try {
      const newReservation = await reservationService.createReservation(data);
      setReservations((prev) => [...prev, newReservation]);
      return newReservation;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear reservación"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReservation = useCallback(
    async (id: number, data: Partial<ReservationFormData>) => {
      setLoading(true);
      setError(null);

      try {
        const updatedReservation = await reservationService.updateReservation(
          id,
          data
        );
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === id ? updatedReservation : reservation
          )
        );
        return updatedReservation;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al actualizar reservación"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteReservation = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await reservationService.deleteReservation(id);
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al eliminar reservación"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return {
    reservations,
    loading,
    error,
    createReservation,
    updateReservation,
    deleteReservation,
    refetchReservations: fetchReservations,
  };
};
