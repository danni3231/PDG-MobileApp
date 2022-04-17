import * as Actions from "./Actions";
import { booking } from "../Types/booking";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { news } from "../Types/news";
import { chat } from "../Types/chat";

export interface AppState {
  currentUser: User;
  userState: boolean;
  users: User[];
  spaces: space[];
  bookings: booking[];
  visits: visitor[];
  news: news[];
  chats: chat[];
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
      return { ...state, bookings: action.payload };

    // Visitors actions
    case Actions.ADD_VISITOR:
      return { ...state, visits: [...state.visits, action.payload] };

    case Actions.SET_VISITS:
      return { ...state, visits: action.payload };

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

      return { ...state, chats: copyChats };

    default:
      return state;
  }
};
