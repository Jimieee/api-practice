import React, { useState } from "react";
import { SectionHeader } from "@/components/molecules/PropertyHeader";
import {
  PropertyFormData,
  PropertyFormModal,
  PropertyGrid,
} from "@/components/organisms";
import { ReservationCalendar } from "@/components/organisms/ReservationCalendar";
import { ReservationFormModal } from "@/components/organisms/ReservationFormModal";
import { useProperties } from "@/features/properties/hooks/useProperties";
import { useReservations } from "@/features/reservations/hooks/useReservations";
import { Property } from "@/features/properties/types/property.types";
import {
  Reservation,
  ReservationFormData,
} from "@/features/reservations/types/reservation.types";

interface PropertyModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  editingProperty?: Property;
}

interface ReservationModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  editingReservation?: Reservation;
  selectedAccommodationId?: number;
}

const DashboardPage: React.FC = () => {
  const {
    properties,
    loading: propertiesLoading,
    error: propertiesError,
    createProperty,
    updateProperty,
  } = useProperties();
  const {
    reservations,
    loading: reservationsLoading,
    error: reservationsError,
    createReservation,
    updateReservation,
  } = useReservations();

  const [activeTab, setActiveTab] = useState<"properties" | "reservations">(
    "properties"
  );
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<
    number | undefined
  >();

  const [propertyModalState, setPropertyModalState] =
    useState<PropertyModalState>({
      isOpen: false,
      mode: "create",
    });

  const [reservationModalState, setReservationModalState] =
    useState<ReservationModalState>({
      isOpen: false,
      mode: "create",
    });

  const [actionLoading, setActionLoading] = useState(false);

  const handleAddNewProperty = () => {
    setPropertyModalState({
      isOpen: true,
      mode: "create",
      editingProperty: undefined,
    });
  };

  const handleEditProperty = (id: string) => {
    const property = properties.find((p) => p.id === parseInt(id));
    if (property) {
      setPropertyModalState({
        isOpen: true,
        mode: "edit",
        editingProperty: property,
      });
    }
  };

  const handlePropertyFormSubmit = async (data: PropertyFormData) => {
    setActionLoading(true);

    try {
      if (propertyModalState.mode === "create") {
        await createProperty(data);
      } else if (propertyModalState.editingProperty) {
        await updateProperty(propertyModalState.editingProperty.id, data);
      }

      setPropertyModalState({ isOpen: false, mode: "create" });
    } catch (error) {
      console.error("Error saving property:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleClosePropertyModal = () => {
    if (!actionLoading) {
      setPropertyModalState({ isOpen: false, mode: "create" });
    }
  };

  // Reservation handlers
  const handleAddNewReservation = () => {
    setReservationModalState({
      isOpen: true,
      mode: "create",
      selectedAccommodationId,
    });
  };

  const handleEventClick = (reservation: Reservation) => {
    setReservationModalState({
      isOpen: true,
      mode: "edit",
      editingReservation: reservation,
    });
  };

  const handleDateSelect = (start: Date, end: Date) => {
    setReservationModalState({
      isOpen: true,
      mode: "create",
      selectedAccommodationId,
    });
  };

  const handleReservationFormSubmit = async (data: ReservationFormData) => {
    setActionLoading(true);

    try {
      if (reservationModalState.mode === "create") {
        await createReservation(data);
      } else if (reservationModalState.editingReservation) {
        await updateReservation(
          reservationModalState.editingReservation.id,
          data
        );
      }

      setReservationModalState({ isOpen: false, mode: "create" });
    } catch (error) {
      console.error("Error saving reservation:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseReservationModal = () => {
    if (!actionLoading) {
      setReservationModalState({ isOpen: false, mode: "create" });
    }
  };

  const getInitialPropertyFormData = (): PropertyFormData | undefined => {
    if (
      propertyModalState.mode === "edit" &&
      propertyModalState.editingProperty
    ) {
      return {
        id: propertyModalState.editingProperty.id,
        name: propertyModalState.editingProperty.name,
        address: propertyModalState.editingProperty.address,
        description: propertyModalState.editingProperty.description,
        image: null,
      };
    }
    return undefined;
  };

  const getInitialReservationFormData = (): ReservationFormData | undefined => {
    if (
      reservationModalState.mode === "edit" &&
      reservationModalState.editingReservation
    ) {
      return {
        id: reservationModalState.editingReservation.id,
        booking: `BK${reservationModalState.editingReservation.id}`,
        check_in_date: reservationModalState.editingReservation.check_in_date,
        check_out_date: reservationModalState.editingReservation.check_out_date,
        total_amount: reservationModalState.editingReservation.total_amount,
        accomodation_id: selectedAccommodationId || 1,
        user_id: 1,
      };
    }
    return undefined;
  };

  const gridProperties = properties.map((property) => ({
    id: property.id.toString(),
    title: property.name,
    address: property.address,
    description: property.description,
    image: property.image,
  }));

  const accommodationOptions = properties.map((property) => ({
    id: property.id,
    name: property.name,
  }));

  const filteredReservations = selectedAccommodationId
    ? reservations.filter((reservation) => {
        // Buscar la propiedad por ID
        const selectedProperty = properties.find(
          (p) => p.id === selectedAccommodationId
        );

        return (
          reservation.accomodation === selectedProperty?.name ||
          reservation.accomodation_id === selectedAccommodationId
        );
      })
    : reservations;

  if (propertiesError || reservationsError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error al cargar los datos
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {propertiesError || reservationsError}
                </div>
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
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("properties")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "properties"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Alojamientos
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "properties" && (
          <>
            <SectionHeader
              title="Alojamientos"
              onAddNew={handleAddNewProperty}
            />

            {propertiesLoading && !actionLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <PropertyGrid
                properties={gridProperties}
                onEdit={handleEditProperty}
              />
            )}
          </>
        )}

        {activeTab === "reservations" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <SectionHeader
                title="Reservaciones"
                onAddNew={handleAddNewReservation}
              />

              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Acomodación:
                </label>
                <select
                  value={selectedAccommodationId || ""}
                  onChange={(e) =>
                    setSelectedAccommodationId(
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
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

            {reservationsLoading && !actionLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ReservationCalendar
                accommodationId={selectedAccommodationId || 0}
                reservations={filteredReservations}
                onEventClick={handleEventClick}
                onDateSelect={handleDateSelect}
                loading={reservationsLoading}
              />
            )}
          </>
        )}
      </div>

      <PropertyFormModal
        isOpen={propertyModalState.isOpen}
        onClose={handleClosePropertyModal}
        onSubmit={handlePropertyFormSubmit}
        initialData={getInitialPropertyFormData()}
        mode={propertyModalState.mode}
        loading={actionLoading}
      />

      <ReservationFormModal
        isOpen={reservationModalState.isOpen}
        onClose={handleCloseReservationModal}
        onSubmit={handleReservationFormSubmit}
        initialData={getInitialReservationFormData()}
        mode={reservationModalState.mode}
        loading={actionLoading}
        accommodations={accommodationOptions}
        selectedAccommodationId={selectedAccommodationId}
      />
    </div>
  );
};

export default DashboardPage;
