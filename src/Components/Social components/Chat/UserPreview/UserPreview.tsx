import * as React from "react";
import { User } from "../../../../Types/user";

import "./UserPreview.css";

interface UserPreviewProps {
  userInfo: User;
}

const UserPreview: React.FC<UserPreviewProps> = ({ userInfo }) => {
  return (
    <section className="userPreview">
      <img className="userPreview__img" src={userInfo.profileImg} alt="" />

      <p className="userPreview__name">{`${userInfo.firstname} ${userInfo.lastname} - ${userInfo.apartment}`}</p>
    </section>
  );
};

export default UserPreview;
