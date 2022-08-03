import React, { useRef } from "react";
import { useEffect, useState } from "react";
import ArtWorkThumbnail from "../ArtWorkThumbnail/ArtWorkThumbnail";

const GallaryList = () => {

  const [artWorks, setArtWorks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')

  let iiif_url = useRef('')

  const dummy = () => {
    setCurrentPage(1)
  }

  useEffect(() => {
    const url = `https://api.artic.edu/api/v1/artworks?page=${currentPage}&fields=id,title,image_id,artist_title&limit=40`
    fetchArtWorks(url)

  }, [currentPage])

  const fetchArtWorks = (url) => {
    fetch(url)
      .then(respsonse => respsonse.json())
      .then(
        jsonData => {
          console.log(jsonData)

          iiif_url.current = jsonData.config.iiif_url
          setArtWorks(jsonData.data)
        }
      )
  }

  const onSearchClick = () => {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id,artist_title`
    fetchArtWorks(url)
  }

  const onQueryChange = (e) => {
    // if (e.target.value === 'Enter') {
    //   onSearchClick()
    //   return
    // }

    setQuery(e.target.value)
  }

  return (
    <>
      <div>
        <input onChange={onQueryChange}></input>
        <button onClick={onSearchClick}>Search</button>
      </div>

      {
        artWorks.map(artwork => (
          <ArtWorkThumbnail key={artwork.id} artwork={artwork} iiif_url={iiif_url.current} />
        ))
      }
    </>
  )
}

export default GallaryList