import React from "react";
import { Link } from "react-router-dom";
import './ArtWorkThumbnail.css'

const ArtWorkThumbnail = (props) => {

  const { title, artist_title, image_id, id } = props.artwork
  const { imgBaseUrl } = props

  return (
    <div className="item" >
      {/* TODO: when image_id is null */}
      <Link to={`/artwork/${id}`} >
        <img src={`${imgBaseUrl}/${image_id}/full/843,/0/default.jpg`} style={{ width: 336 + 'px' }} alt={title}></img>
      </Link>
      <h4>{title}</h4>
      <h5 className="grey">{artist_title}</h5>
    </div>
  )
}

export default ArtWorkThumbnail