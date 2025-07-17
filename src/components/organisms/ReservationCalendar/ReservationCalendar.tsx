import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import {
  ReservationCalendarProps,
  CalendarEvent,
} from "../../../features/reservations/types/reservation.types";

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  reservations,
  onEventClick,
  onDateSelect,
  loading = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesStatus =
        selectedStatus === "all" || reservation.status === selectedStatus;
      const matchesSearch =
        searchTerm === "" ||
        reservation.user.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [reservations, selectedStatus, searchTerm]);

  const events = useMemo<CalendarEvent[]>(() => {
    return filteredReservations
      .filter((reservation) => reservation && reservation.id) 
      .map((reservation) => ({
        id: reservation.id?.toString() ?? "",
        title: `${reservation.user ?? "Sin usuario"} - ${
          reservation.accomodation ?? "Sin propiedad"
        }`,
        start: new Date(reservation.check_in_date ?? ""),
        end: new Date(reservation.check_out_date ?? ""),
        backgroundColor: getStatusColor(reservation.status ?? ""),
        borderColor: getStatusColor(reservation.status ?? ""),
        reservation,
      }));
  }, [filteredReservations]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getEventsForDay = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return dayDate >= eventStart && dayDate <= eventEnd;
    });
  };

  const handleDayClick = (day: number) => {
    if (onDateSelect) {
      const startDate = new Date(currentYear, currentMonth, day);
      const endDate = new Date(currentYear, currentMonth, day + 1);
      onDateSelect(startDate, endDate);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventClick) {
      onEventClick(event.reservation);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const statusOptions = [...new Set(reservations.map((r) => r.status))];

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h1>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">Todos los estados</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Buscar huésped
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Nombre del huésped..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white w-64"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-7 gap-px mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="h-32 bg-white"></div>
          ))}

          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isTodayDate = isToday(day);

            return (
              <div
                key={day}
                className={`h-32 p-2 bg-white border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  isTodayDate ? "bg-blue-50" : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isTodayDate ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 truncate"
                      style={{ backgroundColor: event.backgroundColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                    >
                      <div className="text-white font-medium">
                        {event.reservation.user}
                      </div>
                      <div className="text-white text-xs opacity-90">
                        {event.reservation.accomodation}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{dayEvents.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Confirmado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600">Pendiente</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Cancelado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCalendar;
