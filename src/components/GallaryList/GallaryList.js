import React from "react";
import { useEffect, useState } from "react";
import ArtWorkThumbnail from "../ArtWorkThumbnail/ArtWorkThumbnail";

const GallaryList = () => {

  const [artWorks, setArtWorks] = useState([])
  const [imgBaseUrl, setImgBaseUrl] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  let currentPage = 1
  const [query, setQuery] = useState('')

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

          setImgBaseUrl(jsonData.config.iiif_url)
          setArtWorks(jsonData.data)
        }
      )
  }

  const onSearchClick = () => {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id,artist_title`
    fetchArtWorks(url)
  }

  const onQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSearchClick()
      return
    }
  }

  return (

    <>
      <div>
        <input onChange={onQueryChange} onKeyDown={onKeyDown} value={query}></input>
        <button onClick={onSearchClick}>Search</button>
      </div>

      {
        artWorks.map(artwork => (
          <ArtWorkThumbnail key={artwork.id} artwork={artwork} imgBaseUrl={imgBaseUrl} />
        ))
      }
    </>
  )
}

export default GallaryList