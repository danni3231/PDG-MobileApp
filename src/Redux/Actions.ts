import { booking } from "../Types/booking";
import { news } from "../Types/news";
import { space } from "../Types/space";
import { User } from "../Types/user";
import { visitor } from "../Types/visitor";
import { chat } from "../Types/chat";
import { message } from "../Types/message";

export type Action = { type: string; payload: any };

// * Space actions

export const setSpaces = (spaces: space[]): Action => ({
  type: "@spaces/setSpaces",
  payload: spaces,
});

// * Bookings actions

export const addBooking = (newBooking: booking): Action => ({
  type: "@bookings/addBooking",
  payload: newBooking,
});

export const setBookings = (bookings: booking[]): Action => ({
  type: "@bookings/setBookings",
  payload: bookings,
});

export const editBooking = (booking: booking): Action => ({
  type: "@bookings/editBooking",
  payload: booking,
});

export const deleteBooking = (bookingId: string): Action => ({
  type: "@bookings/deleteBooking",
  payload: bookingId,
});

// * Visits actions

export const addVisitor = (newVisitor: visitor): Action => ({
  type: "@visits/addVisitor",
  payload: newVisitor,
});

export const setVisits = (visits: visitor[]): Action => ({
  type: "@visits/setVisits",
  payload: visits,
});

export const editVisit = (visit: visitor): Action => ({
  type: "@visits/editVisits",
  payload: visit,
});

export const deleteVisit = (visitId: string): Action => ({
  type: "@visits/deleteVisits",
  payload: visitId,
});

// * Users Actions

export const setUserState = (state: boolean): Action => ({
  type: "@user/setUserState",
  payload: state,
});

export const setUser = (user: User): Action => ({
  type: "@user/setUser",
  payload: user,
});

export const setUsers = (users: User[]): Action => ({
  type: "@user/setUsers",
  payload: users,
});

// * Notices Actions

export const setNews = (news: news[]): Action => ({
  type: "@news/setNews",
  payload: news,
});

// * Chat actions

export const addChat = (chat: chat): Action => ({
  type: "@chats/addChat",
  payload: chat,
});

export const addMessage = (chatId: string, message: message): Action => ({
  type: "@chats/addMessage",
  payload: { chatId: chatId, message: message },
});

export const SET_SPACES = "@spaces/setSpaces";

export const ADD_BOOKINGS = "@bookings/addBooking";
export const SET_BOOKINGS = "@bookings/setBookings";
export const EDIT_BOOKINGS = "@bookings/editBooking";
export const DELETE_BOOKINGS = "@bookings/deleteBooking";

export const SET_VISITS = "@visits/setVisits";
export const ADD_VISITOR = "@visits/addVisitor";
export const EDIT_VISITOR = "@visits/editVisits";
export const DELETE_VISITOR = "@visits/deleteVisits";

export const SET_USER = "@user/setUser";
export const SET_USERS = "@user/setUsers";
export const SET_USER_STATE = "@user/setUserState";

export const SET_NEWS = "@news/setNews";

export const ADD_CHAT = "@chats/addChat";
export const ADD_MESSAGE = "@chats/addMessage";
