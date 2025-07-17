import { ReservationFormData } from "../../../features/reservations/types/reservation.types";

interface AccommodationOption {
  id: number;
  name: string;
}

export interface ReservationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReservationFormData) => Promise<void>;
  initialData?: ReservationFormData;
  mode: "create" | "edit";
  loading: boolean;
  accommodations: AccommodationOption[];
  selectedAccommodationId?: number;
}
