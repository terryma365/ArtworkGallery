import React from "react";
import { useState, useEffect, useRef } from "react";
import {useParams} from "react-router-dom"


const ArtWorkDetails = () => {
  const [artWork, setArtWork] = useState({})

  let params = useParams()
  let artWorkId = params.artWorkId
  let iiif_url = useRef('')

  useEffect(() => {
    const url = `https://api.artic.edu/api/v1/artworks/${artWorkId}`

    fetch(url)
      .then(respsonse => respsonse.json())
      .then(
        jsonData => {
          console.log(jsonData)

          iiif_url.current = jsonData.config.iiif_url
          setArtWork(jsonData.data)
        }
      )

    // return () => {
    //   second
    // }
  }, [artWorkId])


  return (
    <>
    <img src={`${iiif_url.current}/${artWork.image_id}/full/843,/0/default.jpg`} style={{ height: 843 + 'px' }} alt={artWork.title}></img>
    <h1>{artWork.title}</h1>
    <h2>{artWork.artist_title}</h2>
    {/* <p>{artWork.dimensions}</p> */}
    <p>{artWork.artist_display}</p>
    <p>{artWork.classification_titles ? (artWork.classification_titles.length > 0 ? artWork.classification_titles.join(', '): '') : ''}</p>
    </>
  )
}

export default ArtWorkDetails