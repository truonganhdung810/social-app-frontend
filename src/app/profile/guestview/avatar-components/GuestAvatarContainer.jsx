import "./styles/avatar-container.css";
import ImageAvatar from "./ImageAvatar";

const GuestAvatarContainer = ({ windowWidth, userName, avaData }) => {
  return (
    <div className="avatar-container" style={{ width: `${windowWidth}px` }}>
      <ImageAvatar avaData={avaData} dislaySize={180}></ImageAvatar>
      <h2 className="user-name">{userName}</h2>
    </div>
  );
};

export default GuestAvatarContainer;
