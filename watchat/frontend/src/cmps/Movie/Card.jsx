import React from 'react'
import { CinemaCard } from './CinemaCard'
import { MovieBigCard } from './MovieBigCard'
import { MovieSmallCard } from './MovieSmallCard'
import { MovieTopCard } from './MovieTopCard'
import { MoviePreview } from './MoviePreview'

export const Card = ({ movie, type, idx }) => {
  switch (type) {
    case 'cinema':
      return <CinemaCard movie={movie} />
    case 'movie-big':
      return <MovieBigCard movie={movie} />
    case 'movie-small':
      return <MovieSmallCard movie={movie} />
    case 'movie-top':
      return <MovieTopCard movie={movie} idx={idx} />
    case 'movie-preview':
      return <MoviePreview movie={movie} />
  }
}
