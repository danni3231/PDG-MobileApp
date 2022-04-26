import * as Actions from "./Actions";
import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { news } from "../Types/news";
import { chat } from "../Types/chat";
import { pqr } from "../Types/pqr";

export interface AppState {
  currentUser: User;
  userState: boolean;
  users: User[];
  spaces: space[];
  bookings: booking[];
  visits: visitor[];
  news: news[];
  chats: chat[];
  pqr: pqr[];
}

const initState = {
  currentUser: {
    firstname: "",
    lastname: "",
    condominiumId: "",
    apartment: "",
    profileImg: "",
    id: "",
  },
  userState: false,
  users: [],
  spaces: [],
  bookings: [],
  visits: [],
  news: [],
  chats: [],
  pqr: [],
};

export const appReducer = (
  state: AppState = initState,
  action: Actions.Action
) => {
  switch (action.type) {
    // Spaces actions
    case Actions.SET_SPACES:
      return { ...state, spaces: action.payload };

    // Spaces actions
    case Actions.ADD_BOOKINGS:
      return { ...state, bookings: [...state.bookings, action.payload] };

    case Actions.SET_BOOKINGS:
      const bookings = action.payload;
      const currentDateB = new Date();
      const currentDateParseB = parseInt(
        (currentDateB.getTime() / 1000).toFixed(0)
      );

      const bookingsFilter: booking[] = [];

      bookings.forEach((booking: booking) => {
        if (booking.dateStart >= currentDateParseB) {
          bookingsFilter.push(booking);
        }
      });

      return { ...state, bookings: bookingsFilter };

    case Actions.EDIT_BOOKINGS:
      const bookingsCopyE = state.bookings;
      const indexBE = bookingsCopyE.findIndex(
        (booking) => booking.id === action.payload.id
      );

      bookingsCopyE[indexBE] = { ...action.payload };

      return { ...state, bookings: bookingsCopyE };

    case Actions.DELETE_BOOKINGS:
      const bookingsCopyD = state.bookings;
      const indexDB = bookingsCopyD.findIndex(
        (booking) => booking.id === action.payload
      );

      bookingsCopyD.splice(indexDB);

      return { ...state, bookings: bookingsCopyD };

    // Visitors actions
    case Actions.ADD_VISITOR:
      return { ...state, visits: [...state.visits, action.payload] };

    case Actions.SET_VISITS:
      const visits = action.payload;
      const currentDateV = new Date();
      currentDateV.setHours(0);
      currentDateV.setMinutes(0);
      currentDateV.setSeconds(1);

      const currentDateParseV = parseInt(
        (currentDateV.getTime() / 1000).toFixed(0)
      );

      const visitsFilter: visitor[] = [];

      visits.forEach((visit: visitor) => {
        if (visit.date >= currentDateParseV) {
          visitsFilter.push(visit);
        }
      });

      return { ...state, visits: visitsFilter };

    case Actions.EDIT_VISITOR:
      const visitsCopyE = state.visits;
      const indexE = visitsCopyE.findIndex(
        (visit) => visit.id === action.payload.id
      );

      visitsCopyE[indexE] = { ...action.payload };

      return { ...state, visits: visitsCopyE };

    case Actions.DELETE_VISITOR:
      const visitsCopyD = state.visits;
      const indexD = visitsCopyD.findIndex(
        (visit) => visit.id === action.payload
      );

      visitsCopyD.splice(indexD);

      return { ...state, visits: visitsCopyD };

    // User actions
    case Actions.SET_USER:
      return { ...state, currentUser: action.payload };

    case Actions.SET_USERS:
      return { ...state, users: action.payload };

    case Actions.SET_USER_STATE:
      return { ...state, useState: action.payload };

    // news actions
    case Actions.SET_NEWS:
      return { ...state, news: action.payload };

    // chat actions
    case Actions.ADD_CHAT:
      return { ...state, chats: [...state.chats, action.payload] };

    case Actions.ADD_MESSAGE:
      const copyChats = state.chats;
      const chatRef = state.chats.findIndex(
        (chat) => chat.id === action.payload.chatId
      );

      copyChats[chatRef].messages = [
        ...copyChats[chatRef].messages,
        action.payload.message,
      ];

      return { ...state, chats: [...copyChats] };

    case Actions.REMOVE_CHATS:
      return { ...state, chats: [] };

    default:
      return state;
  }
};
