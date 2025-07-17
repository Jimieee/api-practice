import {
  Reservation,
  CalendarEvent,
} from "@/features/reservations/types/reservation.types";

export interface ReservationCalendarProps {
  accommodationId?: number;
  reservations: Reservation[];
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (start: Date, end: Date) => void;
  loading?: boolean;
}
