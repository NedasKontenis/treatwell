export interface Reservation {
  id: number;
  dateTime: string;
  notes: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalPrice: number;
  userId: number;
  serviceId: number;
}

export type ReservationMappedWithServiceResponse = Reservation & {
  serviceName: string;
  serviceDescription: string;
  serviceDurationMinutes: number;
  serviceImageUrl: string | null;
};

export type ReservationMappedWithServiceAndUserResponse =
  ReservationMappedWithServiceResponse & {
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    userPhoneNumber: string;
  };
