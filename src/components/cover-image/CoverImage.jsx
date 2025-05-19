import '../../styles/cover-image.css'
import { FaCamera } from 'react-icons/fa'

export default function CoverImage() {
  return (
    <div className="cover-container">
      <img
        className="cover-image"
        src="https://images.unsplash.com/photo-1747372248943-33e9064aefab"
      ></img>

      <button className="btn-edit-cover">
        <FaCamera className="camera-icon" />
        <div className="btn-edit-cover-text"> Edit Cover </div>
      </button>
    </div>
  )
}
