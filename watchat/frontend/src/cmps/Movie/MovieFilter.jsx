import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, withRouter } from 'react-router-dom'

export function MovieFilter({setGenre, filterBy, setSearch}) {

  const genres = [
    'All',
    'Action',
    'Comedy',
    'Crime',
    'Drama',
    'Fantasy',
    'Adventure',
    'Horror',
    'Sci-Fi',
    'Thriller',
  ]
  return (
    <div className='movies-side-nav'>
      <div className={`movies-sidenav`}>
        <div className='side-nav-search'>
          <FaSearch style={{color:'darkgray', position:'absolute'}} />
          <input type='text' placeholder='Search for a movie...' value={filterBy.search} onChange={setSearch} />
        </div>
        {genres.map((genre) => (
          <Link onClick={() =>{setGenre(genre)}} className={`side-navlink-btn ${genre === filterBy.genre ? 'selected' : ''}`}>{genre}</Link>
        ))}
      </div>
    </div>
  )
}
