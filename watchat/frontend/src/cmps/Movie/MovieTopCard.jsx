import React from 'react'

export function MovieTopCard({ movie, idx }) {
  return (
    <div className='top-container'>
      <div key={movie._id} className={`home-top-movie-container`}>
        <div
          className='img-container'
          style={{
            backgroundImage: `url(${movie.coverUrl ? movie.coverUrl : ''})`,
          }}></div>
      </div>
      <div className='top-number'>{idx + 1}</div>
    </div>
  )
}
