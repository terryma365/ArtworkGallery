import React from "react";
import { Link } from "react-router-dom";

const ArtWorkThumbnail = (props) => {

  const { title, artist_title, image_id, id } = props.artwork
  const { iiif_url } = props

  return (
    <>
      {/* TODO: when image_id is null */}
      <Link to={`/artwork/${id}`} >
        <img src={`${iiif_url}/${image_id}/full/843,/0/default.jpg`} style={{ height: 282 + 'px' }} alt={title}></img>
      </Link>
      <h2>{title}, {artist_title}</h2>
    </>
  )
}

export default ArtWorkThumbnail