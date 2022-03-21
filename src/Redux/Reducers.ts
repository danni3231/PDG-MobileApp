import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { Action, ADD_BOOKINGS, SET_BOOKINGS, SET_SPACES } from "./Actions";

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
    case ADD_BOOKINGS:
      return { ...state, bookings: [...state.bookings, action.payload] };

    case SET_BOOKINGS:
      return { ...state, bookings: action.payload };

    case SET_SPACES:
      return { ...state, spaces: action.payload };

    default:
      return state;
  }
};
