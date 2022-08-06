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
      <div className="pageDiv">
        <div className="imageSector">
          <img src={`${imageURL}/${artWork.image_id}/full/843,/0/default.jpg`} style={{ width: 443 + 'px' }} alt={artWork.title}></img>
        </div>

        <div>
          <div className="titleDiv">
            <h2 className="artworkTitle mb-1">{artWork.title}</h2>
            <p className="authorLine"><i>{artWork.date_display} by {artWork.artist_display}</i></p>
          </div>
          <hr></hr>

          {
            descriptions.map((description, index) => (
              <p className="artworkDescription" key={index}>{description}</p>
            ))
          }

          <table className="manifestTable">

            <tbody>
              <tr className="tableRow">

                <td><i>Place of Origin:</i></td>
                <td className="valueCell">{artWork.place_of_origin}</td>

              </tr>
              <tr className="tableRow">

                <td><i>Dimensions:</i></td>
                <td className="valueCell">{artWork.dimensions}</td>

              </tr>
              <tr className="tableRow">

                <td><i>Classification:</i></td>
                <td className="valueCell">{artWork.classification_titles ? (artWork.classification_titles.length > 0 ? artWork.classification_titles.join(', ') : '') : ''}</td>

              </tr>
              <tr className="tableRow">

                <td><i>Rank in search results:</i></td>
                <td className="valueCell">{artWork.boost_rank}</td>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ArtWorkDetails