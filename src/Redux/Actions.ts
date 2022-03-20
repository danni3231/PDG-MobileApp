import { booking } from "../Types/booking";

export type Action = { type: string; payload: any };

export const addBookings = (newBooking: booking): Action => ({
  type: "@bookings/addBookings",
  payload: newBooking,
});
