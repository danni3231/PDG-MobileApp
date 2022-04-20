import { message } from "./message";

export type chat = {
  id: string;
  users: string[];
  messages: message[];
};
