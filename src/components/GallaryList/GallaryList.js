import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from 'react-infinite-scroll-component';


import ArtWorkThumbnail from "../ArtWorkThumbnail/ArtWorkThumbnail";
import FilterButton from "../FilterButton/FilterButton";
import './GallaryList.css'

const categories = [
  {
    name: 'cityscapes',
    type: 'subject_ids',
    id: 'TM-8762'
  },
  {
    name: 'Impressionism',
    type: 'style_ids',
    id: 'TM-7543'
  },
  {
    name: 'animal',
    type: 'subject_ids',
    id: 'TM-12218'
  },
  {
    name: 'fashion',
    type: 'subject_ids',
    id: 'TM-8663'
  },
  {
    name: 'pop art',
    type: 'style_ids',
    id: 'TM-7221'
  },
  {
    name: 'mythology',
    type: 'subject_ids',
    id: 'TM-8766'
  },
  {
    name: 'portraits',
    type: 'subject_ids',
    id: 'TM-8658'
  },
  {
    name: 'furniture',
    type: 'subject_ids',
    id: 'TM-9132'
  },
  {
    name: 'landscapes',
    type: 'subject_ids',
    id: 'TM-8657'
  },
  {
    name: 'ancient',
    type: 'style_ids',
    id: 'TM-8542'
  },
  {
    name: 'woodblock print',
    type: 'classification_ids',
    id: 'TM-402'
  }
]

const GallaryList = () => {

  const [artWorks, setArtWorks] = useState([])
  const [imgBaseUrl, setImgBaseUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // let currentPage = 1
  const url_suffix = 'fields=id,title,image_id,artist_title,subject_ids&limit=40'
  const [query, setQuery] = useState('')
  const [currentCategories, setCurrentCategories] = useState(categories)

  useEffect(() => {
    const url = `https://api.artic.edu/api/v1/artworks?${url_suffix}&page=${currentPage}`
    fetchArtWorks(url)

  }, [currentPage])

  const fetchArtWorks = (url) => {
    console.log("url", url)

    fetch(url)
      .then(respsonse => respsonse.json())
      .then(
        jsonData => {
          console.log(jsonData)

          setImgBaseUrl(jsonData.config.iiif_url)

          let currentSet = new Set(artWorks.map(el => el.id))
          console.log(currentSet)

          let set = jsonData.data.filter(el => {
            const isDuplicate = currentSet.has(el.id)
            currentSet.add(el.id)

            return !isDuplicate
          })

          let newArtWorks = [...artWorks, ...set]
          console.log(newArtWorks)
          setArtWorks(newArtWorks)
        }
      )
  }

  const onSearchClick = () => {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&${url_suffix}`
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

  const onFilterButtonClick = (categoryId) => {
    if (currentCategories.length === 1) {
      setCurrentCategories(categories)
      onSearchClick()
      return
    }

    let filteredCategory = categories.find(category => category.id === categoryId)
    setCurrentCategories([filteredCategory])

    const url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&${url_suffix}&query[term][${filteredCategory.type}]=${filteredCategory.id}`
    fetchArtWorks(url)
  }

  const fetchData = () => {
    let newCurrentPage = currentPage + 1
    setCurrentPage(newCurrentPage)
  }

  return (
    <>
      <div className="searchBar">
        <input onChange={onQueryChange} onKeyDown={onKeyDown} value={query} className="searchInput" placeholder="Search by keyword, artist, or reference"></input>
        <button onClick={onSearchClick} className="searchIcon">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="category-container">
        {
          currentCategories.map(category => (
            <FilterButton key={category.id} category={category} setCurrentCategories={(id) => onFilterButtonClick(id)} />
          ))
        }
      </div>
      <InfiniteScroll className="list-container"
        dataLength={artWorks.length}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}>
        {
          artWorks.map(artwork => (
            <ArtWorkThumbnail key={artwork.id} artwork={artwork} imgBaseUrl={imgBaseUrl} className="item" />
          ))
        }
      </InfiniteScroll>

    </>
  )
}

export default GallaryList