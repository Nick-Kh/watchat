import React from 'react'

export function MovieHeroPreview(props) {
  const { movie, idx } = props
  return (
    <div className={`slide${idx + 1}`}>
      {/* movie details */}
      <div className='text-inside-slide'>
        <div className='slide-upper-text-container'>
          <div className='slide-title'>{movie.title}</div>
          <div className={`slide-genres`}>
            {movie.genres.map((genre, idx) => (
              <div key={movie._id} className={`genre${idx + 1}`}>
                {genre}
              </div>
            ))}
          </div>
          <div className='slide-btns'>
            <div className='slide-btn1 slide-btn'>watch movie</div>
            <div className={`slide-btn2 slide-btn`}>view info</div>
            <div className={`slide-btn3 slide-btn`}>+ add to favorite</div>
          </div>
        </div>
        <div className='slide-rate'>
          <i class='fas fa-star star-color'></i>
          <i class='fas fa-star star-color'></i>
          <i class='fas fa-star star-color'></i>
          <i class='fas fa-star-half-alt star-color'></i>
          <i class='far fa-star star-color'></i>
        </div>
      </div>
      {/* and of movie details */}
      {/* doubled the movie details */}
      <div className='text-inside-slide'>
        <div className='slide-upper-text-container'>
          <div className='slide-title'>{movie.title}</div>
          <div className='slide-genres'>
            {movie.genres.map((genre, idx) => (
              <div className={`genre${idx + 1}`}>{genre}</div>
            ))}
            {/* <div className="duration">Duration: 1h 52m</div> */}
          </div>
          <div className='slide-btns'>
            <div className='slide-btn1 slide-btn'>watch movie</div>
            <div className={`slide-btn2 slide-btn`}>view info</div>
            <div className={`slide-btn3 slide-btn`}>+ add to favorite</div>
          </div>
        </div>
        <div className='slide-rate'>
          <i class='fas fa-star star-color'></i>
          <i class='fas fa-star star-color'></i>
          <i class='fas fa-star star-color'></i>
          <i class='fas fa-star-half-alt star-color'></i>
          <i class='far fa-star star-color'></i>
        </div>
      </div>
      {/* atart of information about the app - text */}
      <div className='text-inside-slide2'>
        <div className='info-in-slide'>
          {/* <div>
                        Watch movies with your friends with interactive chat and live reactions
                      </div> */}
        </div>
      </div>
      {/* end of information about the app */}
    </div>
  )
}
