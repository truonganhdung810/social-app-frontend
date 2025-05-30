import React from "react";
import "./userslist.css";
import ImageAvatar from "./ImageAvatar";
import Link from "next/link";

const UsersList = ({ users }) => {
  return (
    <div className="home-user-list-container">
      <h3 className="home-user-list-title">People</h3>
      <input className="home-user-list-search-input" placeholder="Search" />

      <ul className="home-user-list-user-list">
        {users.map((user) => (
          <li className="home-user-list-user-item" key={user.id}>
            <Link
              href={`/profile/${user.id}`}
              className="home-user-list-user-link"
            >
              <div className="home-user-list-avatar-container">
                <ImageAvatar
                  className="home-user-list-avatar"
                  alt={user.name}
                  userData={{
                    avatar: user.avatar,
                    ava_offsetX: user.ava_offsetX,
                    ava_offsetY: user.ava_offsetY,
                    ava_width: user.ava_width,
                  }}
                  dislaySize={36}
                ></ImageAvatar>
              </div>
              <span className="home-user-list-username">{user.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
