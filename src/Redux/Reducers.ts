import * as Actions from "./Actions";
import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";

export interface AppState {
  user: User;
  userState: boolean;
  spaces: space[];
  bookings: booking[];
  visits: visitor[];
}

const initState = {
  user: {
    firstname: "",
    lastname: "",
    condominiumId: "",
    apartment: "",
    id: "",
  },
  userState: false,
  spaces: [],
  bookings: [],
  visits: [],
};

export const appReducer = (
  state: AppState = initState,
  action: Actions.Action
) => {
  switch (action.type) {
    case Actions.SET_SPACES:
      return { ...state, spaces: action.payload };

    case Actions.ADD_BOOKINGS:
      return { ...state, bookings: [...state.bookings, action.payload] };

    case Actions.SET_BOOKINGS:
      return { ...state, bookings: action.payload };

    case Actions.ADD_VISITOR:
      return { ...state, visits: [...state.visits, action.payload] };

    case Actions.SET_VISITS:
      return { ...state, visits: action.payload };

    case Actions.SET_USER:
      return { ...state, user: action.payload };

    case Actions.SET_USER_STATE:
      return { ...state, useState: action.payload };

    default:
      return state;
  }
};
