import React from "react";

const ArtWorkThumbnail = (props) => {

  const { title, artist_title, image_id } = props.artwork
  const { iiif_url } = props

  return (
    <>
    {/* TODO: when image_id is null */}
      <img src={`${iiif_url}/${image_id}/full/843,/0/default.jpg`} style={{height: 382 + 'px'}}></img>
      <h2>{title}, {artist_title}</h2>
    </>
  )
}

export default ArtWorkThumbnail