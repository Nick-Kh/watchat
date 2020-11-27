import React from 'react'
import { MovieHeroPreview } from './MovieHeroPreview'

export function MovieHeroList() {
  const heroMovies = [
    {
      title: 'Wrath of Titans',
      genres: ['Action', 'Adventure', 'Fantasy'],
      isDarkBack: false,
      isDarkGenres: true,
    },
    {
      title: 'Guardians of the Galaxy',
      genres: ['Action', 'Adventure', 'Comedy'],
      isDarkBack: false,
      isDarkGenres: false,
    },
    {
      title: 'Avengers: Endgame',
      genres: ['Action', 'Adventure', 'Drama'],
      isDarkBack: false,
      isDarkGenres: false,
    },
    {
      title: 'IT',
      genres: ['Horror'],
      isDarkBack: false,
      isDarkGenres: false,
    },
  ]
  return (
    <div className='hero-slider'>
      {heroMovies.map((movie, idx) => (
        <MovieHeroPreview movie={movie} idx={idx} />
      ))}
    </div>
  )
}
