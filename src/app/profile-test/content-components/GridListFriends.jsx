"use client";

import React from "react";
import "./styles/friendgrid.css";
import ImageAvatar from "./ImageAvatar";
import { useRef, useState, useEffect } from "react";

const GridListFriends = ({ users }) => {
  const elementRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);
  return (
    <div className="friend-grid-container">
      <h2 className="friend-title">Bạn bè</h2>
      <div className="friend-grid">
        {users.map((user, index) => (
          <div className="friend-item" key={index} ref={elementRef}>
            <ImageAvatar
              avaData={{
                src: user.avatar,
                rOffsetX: user.ava_offsetX,
                rOffsetY: user.ava_offsetY,
                cropWidth: user.ava_width,
              }}
              dislaySize={size}
              alt={user.name}
              className="friend-avatar"
            />
            <p className="friend-name">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridListFriends;
