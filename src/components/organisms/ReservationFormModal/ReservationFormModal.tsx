import React, { useState, useEffect } from "react";

import { ReservationFormModalProps } from "./ReservationFormModal.types";
import { ReservationFormData } from "./ReservationFormModal.schema";

export const ReservationFormModal: React.FC<ReservationFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  loading,
  accommodations,
  selectedAccommodationId,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    booking: "",
    check_in_date: "",
    check_out_date: "",
    total_amount: 0,
    accomodation_id: selectedAccommodationId || accommodations[0]?.id || 1,
    user_id: 1,
    status: "pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateStatusOptions = [
    { value: "CANCELLED", label: "CANCELLED" },
    { value: "CONFIRMED", label: "CONFIRMED" },
  ];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const bookingNumber = `BK${Date.now().toString().slice(-6)}`;
      setFormData({
        booking: bookingNumber,
        check_in_date: "",
        check_out_date: "",
        total_amount: 0,
        accomodation_id: selectedAccommodationId || accommodations[0]?.id || 1,
        user_id: 1,
        status: "pending",
      });
    }
  }, [initialData, selectedAccommodationId, accommodations]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === "edit") {
      // Para modo edit, solo validamos el status
      if (!formData.status) {
        newErrors.status = "Debe seleccionar un status";
      }
    } else {
      // Validaciones para modo create
      if (!formData.booking.trim()) {
        newErrors.booking = "El número de booking es requerido";
      }

      if (!formData.check_in_date) {
        newErrors.check_in_date = "La fecha de check-in es requerida";
      }

      if (!formData.check_out_date) {
        newErrors.check_out_date = "La fecha de check-out es requerida";
      }

      if (formData.check_in_date && formData.check_out_date) {
        const checkIn = new Date(formData.check_in_date);
        const checkOut = new Date(formData.check_out_date);

        if (checkOut <= checkIn) {
          newErrors.check_out_date =
            "La fecha de check-out debe ser posterior a la de check-in";
        }
      }

      if (formData.total_amount <= 0) {
        newErrors.total_amount = "El monto total debe ser mayor a 0";
      }

      if (!formData.accomodation_id) {
        newErrors.accomodation_id = "Debe seleccionar una acomodación";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error al guardar la reservación:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "accomodation_id" || name === "user_id"
          ? parseInt(value)
          : name === "total_amount"
          ? parseFloat(value)
          : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Nueva Reservación" : "Actualizar Status"}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "edit" ? (
            <>
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Booking:</span>{" "}
                  {formData.booking}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status de la Reservación
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.status ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                >
                  <option value="">Seleccionar status</option>
                  {updateStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Booking
                </label>
                <input
                  type="text"
                  name="booking"
                  value={formData.booking}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.booking ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="BK123456"
                  disabled={loading}
                />
                {errors.booking && (
                  <p className="mt-1 text-sm text-red-600">{errors.booking}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Acomodación
                </label>
                <select
                  name="accomodation_id"
                  value={formData.accomodation_id}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.accomodation_id
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  disabled={loading}
                >
                  <option value="">Seleccionar acomodación</option>
                  {accommodations.map((accommodation) => (
                    <option key={accommodation.id} value={accommodation.id}>
                      {accommodation.name}
                    </option>
                  ))}
                </select>
                {errors.accomodation_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.accomodation_id}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Check-in
                </label>
                <input
                  type="date"
                  name="check_in_date"
                  value={formData.check_in_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.check_in_date ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                {errors.check_in_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.check_in_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Check-out
                </label>
                <input
                  type="date"
                  name="check_out_date"
                  value={formData.check_out_date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.check_out_date ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                {errors.check_out_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.check_out_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto Total
                </label>
                <input
                  type="number"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.total_amount ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                  disabled={loading}
                />
                {errors.total_amount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.total_amount}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {mode === "create" ? "Crear" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationFormModal;
