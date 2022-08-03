import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ArtWorkThumbnail from "../ArtWorkThumbnail/ArtWorkThumbnail";

const GallaryList = () => {

  const [artWorks, setArtWorks] = useState([])
  const [currentPage, setCurrentPage] = useState(3)

  let iiif_url = useRef('')

  useEffect(() => {
    const url = `https://api.artic.edu/api/v1/artworks?page=${currentPage}&fields=id,title,image_id,artist_title`

    fetch(url)
      .then(respsonse => respsonse.json())
      .then(
        jsonData => {
          console.log(jsonData)

          iiif_url.current = jsonData.config.iiif_url
          setArtWorks(jsonData.data)
        }
      )

    //   return () => {
    //     second
    //   }
  }, [currentPage])


  return (
    <>
      {
        artWorks.map(artwork => (
          <ArtWorkThumbnail key={artwork.id} artwork={artwork} iiif_url={iiif_url.current} />
        ))
      }
    </>
  )
}

export default GallaryList