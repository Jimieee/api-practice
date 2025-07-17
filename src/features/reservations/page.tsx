import React, { useState } from "react";
import { SectionHeader } from "@/components/molecules/ReservationHeader";
import { ReservationCalendar } from "@/components/organisms/ReservationCalendar";
import { ReservationFormModal } from "@/components/organisms/ReservationFormModal";
import { useReservations } from "./hooks/useReservations";
import { useProperties } from "../properties/hooks/useProperties";
import { Reservation, ReservationFormData } from "./types/reservation.types";

interface ModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  editingReservation?: Reservation;
  selectedAccommodationId?: number;
}

const ReservationsPage: React.FC = () => {
  const { properties } = useProperties();
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<
    number | undefined
  >();

  const {
    reservations: allReservations,
    loading,
    error,
    createReservation,
    updateReservation,
  } = useReservations();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
  });

  const [actionLoading, setActionLoading] = useState(false);

  const filteredReservations = React.useMemo(() => {
    if (!selectedAccommodationId) return allReservations;

    const selectedProperty = properties.find(
      (p) => p.id === selectedAccommodationId
    );
    if (!selectedProperty) return [];

    return allReservations.filter(
      (reservation) => reservation.accomodation === selectedProperty.name
    );
  }, [allReservations, selectedAccommodationId, properties]);

  const handleAddNew = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      selectedAccommodationId,
    });
  };

  const handleEventClick = (reservation: Reservation) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      editingReservation: reservation,
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateSelect = (_start: Date, _end: Date) => {
    setModalState({
      isOpen: true,
      mode: "create",
      selectedAccommodationId,
    });
  };

  const handleFormSubmit = async (data: ReservationFormData) => {
    setActionLoading(true);

    try {
      if (modalState.mode === "create") {
        await createReservation(data);
      } else if (modalState.editingReservation) {
        await updateReservation(modalState.editingReservation.id, data);
      }

      setModalState({ isOpen: false, mode: "create" });
    } catch (error) {
      console.error("Error saving reservation:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (!actionLoading) {
      setModalState({ isOpen: false, mode: "create" });
    }
  };

  const getInitialFormData = (): ReservationFormData | undefined => {
    if (modalState.mode === "edit" && modalState.editingReservation) {
      return {
        id: modalState.editingReservation.id,
        booking: `BK${modalState.editingReservation.id}`,
        check_in_date: modalState.editingReservation.check_in_date,
        check_out_date: modalState.editingReservation.check_out_date,
        total_amount: modalState.editingReservation.total_amount,
        accomodation_id: selectedAccommodationId || 1,
        user_id: 1,
      };
    }
    return undefined;
  };

  const accommodationOptions = properties.map((property) => ({
    id: property.id,
    name: property.name,
  }));

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error al cargar las reservaciones
                </h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <SectionHeader title="Reservaciones" onAddNew={handleAddNew} />

          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Acomodación:
            </label>
            <select
              value={selectedAccommodationId || ""}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedAccommodationId(value ? parseInt(value) : undefined);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las acomodaciones</option>
              {accommodationOptions.map((accommodation) => (
                <option key={accommodation.id} value={accommodation.id}>
                  {accommodation.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && !actionLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ReservationCalendar
            accommodationId={selectedAccommodationId}
            reservations={filteredReservations}
            onEventClick={handleEventClick}
            onDateSelect={handleDateSelect}
            loading={loading}
          />
        )}

        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
            <div>Total reservaciones: {allReservations.length}</div>
            <div>Reservaciones filtradas: {filteredReservations.length}</div>
            <div>
              Acomodación seleccionada:{" "}
              {selectedAccommodationId ? selectedAccommodationId : "Todas"}
            </div>
          </div>
        )}
      </div>

      <ReservationFormModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={getInitialFormData()}
        mode={modalState.mode}
        loading={actionLoading}
        accommodations={accommodationOptions}
        selectedAccommodationId={selectedAccommodationId}
      />
    </div>
  );
};

export default ReservationsPage;
