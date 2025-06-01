import ProfileContainer from "./content-components/ProfileContainer";
import CoverAvatarSection from "./CoverAvatarSection";

const GuestProfileLayout = ({ user, posts, users }) => {
  // Lấy ra cover từ User
  let cover_src = user.cover_photo;
  if (cover_src === "null" || cover_src === null) {
    cover_src = "/default_cover_size1200x400.png";
  }
  // Tách chuỗi từ phần '_size'
  const sizePart = cover_src.split("_size")[1];
  const dimensions = sizePart.split(".")[0].split("x");

  // Lấy width và height
  const width = parseInt(dimensions[0], 10);
  const height = parseInt(dimensions[1], 10);

  // tạo object thông số cho cover_photo
  const coverData = {
    src: cover_src,
    width,
    height,
    offsetX: user.cover_offsetX,
    offsetY: user.cover_offsetY,
  };

  // Lấy ra name, avatar từ user
  let avatar_src = user.avatar;
  let cropWidth = user.ava_width;
  if (avatar_src === "null" || avatar_src === null) {
    avatar_src = "/default-avatar_size200x200.jpg";
    cropWidth = 200;
  }

  // Tách chuỗi từ phần '_size'
  const ava_sizePart = avatar_src.split("_size")[1];
  const ava_dimensions = ava_sizePart.split(".")[0].split("x");

  // Lấy width và height
  const ava_width = parseInt(ava_dimensions[0], 10);
  const ava_height = parseInt(ava_dimensions[1], 10);

  const avaData = {
    src: avatar_src,
    width: ava_width,
    height: ava_height,
    rOffsetX: user.ava_offsetX,
    rOffsetY: user.ava_offsetY,
    cropWidth,
  };

  console.log("User Avatar Data", avaData);

  const userName = user.name;

  return (
    <div className="profile-container">
      <div className="profile-layout">
        <CoverAvatarSection
          avaData={avaData}
          coverData={coverData}
          userName={userName}
        ></CoverAvatarSection>
        <div className="mt-16">
          <ProfileContainer
            userName={userName}
            avaData={avaData}
            posts={posts}
            users={users}
          ></ProfileContainer>
        </div>
      </div>
    </div>
  );
};

export default GuestProfileLayout;
