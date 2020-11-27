import React from 'react'
import { Card } from './Card'

export const MovieCategory = ({ movies, type }) => {
  return (
    <div className='movie-category'>
      {/*<div className='category-name'></div>*/}
      {movies.map((movie) => (
        <Card movie={movie} type={type} />
      ))}
    </div>
  )
}
