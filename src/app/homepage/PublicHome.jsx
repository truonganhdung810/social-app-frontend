import PublicPostList from "./components/PublicPostList";
import UsersList from "./components/UsersList";
import "./styles/home.css";

const PublicHome = ({ posts, users }) => {
  return (
    <div className="public-home-container-layout">
      <div className="public-home-left-content">
        <PublicPostList posts={posts}></PublicPostList>
      </div>
      <div className="public-home-right-content">
        <UsersList className="profile-list-friends" users={users}></UsersList>
      </div>
    </div>
  );
};
export default PublicHome;
