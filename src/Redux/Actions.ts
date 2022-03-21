import {
  getBookingsCollection,
  getSpacesCollection,
} from "../Firebase/firebaseApi";
import { booking } from "../Types/booking";
import { space } from "../Types/space";

export type Action = { type: string; payload: any };

export const addBookings = (newBooking: booking): Action => ({
  type: "@bookings/addBookings",
  payload: newBooking,
});

export const setBookings = (bookings: booking[]): Action => ({
  type: "@bookings/setBookings",
  payload: bookings,
});

export const setSpaces = (spaces: space[]): Action => ({
  type: "@spaces/setSpaces",
  payload: spaces,
});

export const ADD_BOOKINGS = "@bookings/addBookings";
export const SET_BOOKINGS = "@bookings/setBookings";
export const SET_SPACES = "@spaces/setSpaces";

//async code for
export const getSpaces = async (dispatch: any) => {
  const snapshot = await getSpacesCollection;

  const newSpaces: space[] = [];

  snapshot.forEach((space: any) => {
    newSpaces.push({ ...space.data(), id: space.id });
  });

  await dispatch(setSpaces(newSpaces));
};

export const getBookings = async (dispatch: any) => {
  const snapshot = await getBookingsCollection;

  const newBookings: booking[] = [];

  snapshot.forEach((booking: any) => {
    newBookings.push({ ...booking.data() });
  });

  await dispatch(setBookings(newBookings));
};
