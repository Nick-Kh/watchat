import React from 'react'
import { Card } from './Card'

export function MovieList({ movies, type }) {
  console.log('MOVIES IN MOVIELIST: ', movies)
  if (!movies) return
  return (
    <React.Fragment>
      {movies.map((movie, idx) => (
        <Card type={type} movie={movie} idx={idx} />
      ))}
    </React.Fragment>
  )
}
