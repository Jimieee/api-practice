import apiClient from "@/lib/axios";
import { Reservation, ReservationFormData } from "../types/reservation.types";

export const reservationService = {
  async createReservation(data: ReservationFormData): Promise<Reservation> {
    const response = await apiClient.post("/booking", data);
    return response.data;
  },

  async getReservationsByAccommodation(
    accommodationId: number,
    startDate?: string,
    endDate?: string
  ): Promise<Reservation[]> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const response = await apiClient.get(
      `/bookings/calendar/${accommodationId}?${params.toString()}`
    );
    return response.data;
  },

  // Obtener todas las reservaciones
  async getAllReservations(): Promise<Reservation[]> {
    const response = await apiClient.get("/bookings");
    return response.data;
  },

  // Obtener reservación por ID
  async getReservationById(id: number): Promise<Reservation> {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  // Actualizar reservación
  async updateReservation(
    id: number,
    data: Partial<ReservationFormData>
  ): Promise<Reservation> {
    const response = await apiClient.patch(`/status_booking/${id}`, data);
    return response.data;
  },

  // Eliminar reservación
  async deleteReservation(id: number): Promise<void> {
    await apiClient.delete(`/bookings/${id}`);
  },
};
