import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../Redux/Reducers";
import { User } from "../../../../Types/user";
import Chip from "../../../UI/Chip/Chip";
import UserPreview from "../UserPreview/UserPreview";

import "./ChatUserList.css";

interface ChatUserListProps {}

const ChatUserList: React.FC<ChatUserListProps> = ({}) => {
  const users = useSelector<AppState, AppState["users"]>(
    (state) => state.users
  );

  return (
    <article>
      <Chip text="Nuevo chat" />
      <div className="scroll scroll--h chatList__scroll">
        <div className="scroll__column chatList__column">
          {users.map((user: User) => {
            return <UserPreview key={user.id} userInfo={user} />;
          })}
        </div>
      </div>
    </article>
  );
};

export default ChatUserList;
