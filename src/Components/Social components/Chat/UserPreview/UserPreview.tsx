import * as React from "react";
import { useNavigate } from "react-router";
import { Breathing, Image } from "react-shimmer";
import { User } from "../../../../Types/user";

import "./UserPreview.css";

interface UserPreviewProps {
  userInfo: User;
}

const UserPreview: React.FC<UserPreviewProps> = ({ userInfo }) => {
  const navigate = useNavigate();
  return (
    <section
      className="userPreview"
      onClick={() => navigate(`/Social/Chat/${userInfo.id}`)}
    >
      <Image
        src={userInfo.profileImg}
        fallback={<Breathing className="userPreview__img" />}
        NativeImgProps={{
          className: "userPreview__img",
        }}
        fadeIn
      />

      <p className="userPreview__name">{`${userInfo.firstname} ${userInfo.lastname} - ${userInfo.apartment}`}</p>
    </section>
  );
};

export default UserPreview;
