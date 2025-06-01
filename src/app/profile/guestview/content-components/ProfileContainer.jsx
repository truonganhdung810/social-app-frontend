import PostsList from "./PostsList";
import PhotosGrid from "./PhotosGrid";

import "./styles/profile-container.css";
import GridListFriends from "./GridListFriends";

export default function ProfileContainer({ userName, avaData, posts, users }) {
  const images = posts
    .filter((post) => post.image && post.image.trim() !== "")
    .map((post) => post.image);

  return (
    <div className="guest-profile-container-layout">
      <div className="guest-profile-left-content">
        <PhotosGrid
          className="guest-profile-photos-grid"
          images={images}
        ></PhotosGrid>
        <GridListFriends
          className="guest-profile-list-friends"
          users={users}
        ></GridListFriends>
      </div>
      <div className="guest-profile-right-content">
        <PostsList
          posts={posts}
          userName={userName}
          avaData={avaData}
        ></PostsList>
      </div>
    </div>
  );
}
