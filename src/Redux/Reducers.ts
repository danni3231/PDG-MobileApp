import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { Action } from "./Actions";

export interface AppState {
  spaces: space[];
  bookings: booking[];
}

const initState = {
  spaces: [],
  bookings: [],
};

export const appReducer = (state: AppState = initState, action: Action) => {
  switch (action.type) {
    case "@bookings/addBookings":
      return { ...state, bookings: [...state.bookings, action.payload] };

    default:
      return state;
  }
};
