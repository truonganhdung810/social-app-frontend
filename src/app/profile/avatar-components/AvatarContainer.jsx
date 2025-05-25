import { FaCamera } from "react-icons/fa";
import "./styles/avatar-container.css";

const AvatarContainer = ({ windowWidth }) => {
  return (
    <div className="avatar-container" style={{ width: `${windowWidth}px` }}>
      <div className="group-button">
        <div className="img-container">
          <img
            className="avatar-img"
            src="https://i.pinimg.com/736x/2f/57/79/2f5779092e30a4b4288a083ec450202f.jpg"
            alt="Avatar"
          />
        </div>
        <button className="button-edit-avatar">
          <FaCamera className="camera" />
        </button>
      </div>
      <div className="user-name">
        <h2>Trương Anh Dũng</h2>
      </div>
    </div>
  );
};

export default AvatarContainer;
