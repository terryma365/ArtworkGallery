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
  const url_suffix = 'fields=id,title,image_id,artist_title,subject_ids&limit=40'
  const [query, setQuery] = useState('')
  const [currentCategories, setCurrentCategories] = useState(categories)
  const [inputValue, setInputValue] = useState('')
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    let url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&${url_suffix}&page=${currentPage}`

    let mergeData = currentPage !== 1

    if (currentCategories.length === 1) {
      let filteredCategory = currentCategories[0]
      url = `https://api.artic.edu/api/v1/artworks/search?q=${query}&${url_suffix}&query[term][${filteredCategory.type}]=${filteredCategory.id}&page=${currentPage}`

    }

    fetchArtWorks(url, mergeData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage,currentCategories, query])

  const fetchArtWorks = (url, mergeData = true) => {
    console.log("url", url)

    fetch(url)
      .then(respsonse => respsonse.json())
      .then(
        jsonData => {
          // console.log(jsonData)

          setImgBaseUrl(jsonData.config.iiif_url)
          setHasMore(jsonData.data.length !== 0)

          let newArtWorks = [...jsonData.data]

          if (mergeData) {
            let currentSet = new Set(artWorks.map(el => el.id))

            let newData = jsonData.data.filter(el => {
              const isDuplicate = currentSet.has(el.id)
              currentSet.add(el.id)

              return !isDuplicate
            })

            newArtWorks = [...artWorks, ...newData]
          }

          console.log(newArtWorks.length)
          setArtWorks(newArtWorks)
        }
      )
  }

  const onSearchClick = () => {
    setQuery(inputValue)
    setCurrentPage(1)
  }

  const onInputValueChange = (e) => {
    setInputValue(e.target.value)
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
    setCurrentPage(1)
  }

  const fetchData = () => {
    let newCurrentPage = currentPage + 1
    setCurrentPage(newCurrentPage)
  }

  return (
    <>
      <div className="searchBar">
        <input onChange={onInputValueChange} onKeyDown={onKeyDown} value={inputValue} className="searchInput" placeholder="Search by keyword, artist, or reference"></input>
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
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}>
        {
          artWorks.map(artwork => (
            <ArtWorkThumbnail key={artwork.id} artwork={artwork} imgBaseUrl={imgBaseUrl} />
          ))
        }
      </InfiniteScroll>

    </>
  )
}

export default GallaryList