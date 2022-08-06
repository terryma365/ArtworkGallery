import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import "./ArtWorkDetails.css"


const ArtWorkDetails = () => {
  const [artWork, setArtWork] = useState({})
  const [imageURL, setimageURL] = useState('')
  const [descriptions, setDescriptions] = useState([])
  let params = useParams()
  let artWorkId = params.artWorkId


  useEffect(() => {
    const url = `https://api.artic.edu/api/v1/artworks/${artWorkId}`

    fetch(url)
      .then(respsonse => respsonse.json())
      .then(
        jsonData => {
          // console.log(jsonData)

          setimageURL(jsonData.config.iiif_url)
          setArtWork(jsonData.data)

          document.title = jsonData.data.title
        }
      )

    const manifestUrl = `https://api.artic.edu/api/v1/artworks/${artWorkId}/manifest.json`

    fetch(manifestUrl)
    .then(respsonse => respsonse.json())
    .then(
      jsonData => {

        let descriptions = jsonData.description[0].value.split('\n')
        setDescriptions(descriptions)
      }
    )

  }, [artWorkId])


  return (
    <>
      <div>
        <div className="imageSector">
          <img src={`${imageURL}/${artWork.image_id}/full/843,/0/default.jpg`} style={{ height: 843 + 'px' }} alt={artWork.title}></img>
        </div>
        <div className="title">

          <h2 className="blog-post-title artworktitle mb-1">{artWork.title}</h2>
          <p className="blog-post-meta author"><i>{artWork.date_display} by {artWork.artist_title}</i></p>
        </div>
        <hr></hr>

        {
          descriptions.map(description => (
            <p>{description}</p>
          ))
        }

        <table className="mytable">

          <tbody className="tablesector">
            <tr className="eachtable">

              <td><i>Place of Origin:</i></td>
              <td>{artWork.place_of_origin}</td>

            </tr>
            <tr className="eachtable">

              <td><i>Dimensions:</i></td>
              <td>{artWork.dimensions}</td>

            </tr>
            <tr className="eachtable">

              <td><i>Classification:</i></td>
              <td>{artWork.classification_titles ? (artWork.classification_titles.length > 0 ? artWork.classification_titles.join(', ') : '') : ''}</td>

            </tr>
            <tr className="eachtable">
              <td><i>Rank in search results:</i></td>
              <td>{artWork.boost_rank}</td>
            </tr>

          </tbody>
        </table>





      </div>
    </>
  )
}

export default ArtWorkDetails