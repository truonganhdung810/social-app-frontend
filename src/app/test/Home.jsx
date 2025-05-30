import PublicPostList from './PublicPostList'
import UsersList from './UsersList'
import './home.css'

const Home = ({ posts, users }) => {
  return (
    <div className="public-home-container-layout">
      <div className="public-home-left-content">
        {/* Nếu đây là Homepage của user thì dùng
         <CreateNewPost setPosts={setPosts}></CreateNewPost> */}
        <PublicPostList posts={posts}></PublicPostList>
      </div>
      <div className="public-home-right-content">
        <UsersList className="profile-list-friends" users={users}></UsersList>
      </div>
    </div>
  )
}
export default Home
