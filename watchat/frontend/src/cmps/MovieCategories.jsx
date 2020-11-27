import React from 'react'
import { MovieList } from './Movie/MovieList'

export function MovieCategories({ movies, filterBy }) {
  let genres = [
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
  console.log('movies in categories: ', movies)
  if (!movies) return <div>Loading....</div>
  genres = filterBy.search !== '' ? genres = [filterBy.search] : filterBy.genre !== 'All' ? genres.filter(genre => genre===filterBy.genre) : genres
  return (
    <React.Fragment>
      <div className='movie-list'>
        {genres.map((genre) => (
          <div className='movie-category'>
            <div className='category-title'>
              <h4 className='category-name'>{genre}</h4>
              <h4 className='all-btn'>
                See All{' '}
                {movies.filter((movie) => movie.genres.includes(genre)).length}
              </h4>
            </div>
            <div className='category-movies'>
              <MovieList
                movies={movies
                  .filter((movie) => movie.genres.includes(genre) || movie.title.toLowerCase().includes(genres[0].toLowerCase()))
                  .slice(0, 5)}
                type='movie-big'
              />

            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
