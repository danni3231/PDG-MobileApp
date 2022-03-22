import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { visitor } from "../Types/visitor";
import {
  Action,
  ADD_BOOKINGS,
  ADD_VISITOR,
  SET_BOOKINGS,
  SET_SPACES,
  SET_VISITS,
} from "./Actions";

export interface AppState {
  spaces: space[];
  bookings: booking[];
  visits: visitor[];
}

const initState = {
  spaces: [],
  bookings: [],
  visits: [],
};

export const appReducer = (state: AppState = initState, action: Action) => {
  switch (action.type) {
    case ADD_BOOKINGS:
      return { ...state, bookings: [...state.bookings, action.payload] };

    case SET_BOOKINGS:
      return { ...state, bookings: action.payload };

    case SET_SPACES:
      return { ...state, spaces: action.payload };

    case ADD_VISITOR:
      return { ...state, visits: [...state.visits, action.payload] };

    case SET_VISITS:
      return { ...state, visits: action.payload };
    default:
      return state;
  }
};
