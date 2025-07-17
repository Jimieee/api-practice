export interface Reservation {
  id: number;
  user: string;
  accomodation: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  status: string;
}

export interface ReservationFormData {
  id?: number;
  booking: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  accomodation_id: number;
  user_id: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
  borderColor: string;
  reservation: Reservation;
}

export interface ReservationCalendarProps {
  accommodationId?: number;
  reservations: Reservation[];
  onEventClick?: (reservation: Reservation) => void;
  onDateSelect?: (start: Date, end: Date) => void;
  loading?: boolean;
}
