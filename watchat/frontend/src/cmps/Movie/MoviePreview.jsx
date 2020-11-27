// import React from 'react'
// import StarRatings from 'react-star-ratings'
// import { IoMdPlay, IoIosTime, IoMdEye } from 'react-icons/io'

// export function MoviePreview({ movie }) {
//   const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }
//   return (
//     <div className='movie-preview'>
//       <div className='play-button'>
//         <IoMdPlay size='40px' />
//       </div>
//       <div className='movie-img'>
//         <img src={movie.coverUrl} alt='' />
//       </div>
//       <div className='card-details'>
//         <div className='movie-title'>{movie.title}</div>
//         <div className='movie-genre'>{movie.genres.join(',')}</div>
//         <div className='reviews'>
//           <StarRatings
//             rating={getRandomNumber(3, 5)}
//             starRatedColor='maroon'
//             numberOfStars={5}
//             name='rating'
//             starDimension='18px'
//           />
//         </div>
//         <div className='reviews-num'>({movie.Reviews.length} reviews)</div>
//         <div className='movie-icons'>
//           <div className='icon'>
//             <div>
//               <IoIosTime size='20px' color='darkred' />
//             </div>
//             <div className='icon-details'>{movie.duration}</div>
//           </div>
//           <div className='icon'>
//             <div>
//               <IoMdEye size='20px' color='darkred' />
//             </div>
//             <div className='icon-details'>{getRandomNumber(1, 1000)}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Link } from 'react-router-dom'

export function MoviePreview({ movie }) {
  return (
    <React.Fragment>
      {/* <div className='movie-img-container' style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} ></div> */}
    

          <div className='genres-movie-img-container' style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} ></div>

          <div className="info-continer-movie-card">
              <div className={`title ${movie.title.length>11?"ellipsis":""}`}>{movie.title}</div>

              <div className="genres-container">
                {movie.genres.map(genre=>
                  <div className='genre'>{genre}</div>
                )}
              </div>
              <div className="btns-container">
                <span className="movie-btn movie-btn-details" ><Link to={`/movie/${movie._id}`} ><i class="fas fa-info-circle"></i></Link></span>
                             {/* <span className="movie-btn"><Link><i class="far fa-eye"></i></Link></ span> */}
                <span className="movie-btn"><Link  to={`/room/${movie._id}`}><i class="far fa-play-circle"></i></Link></ span>
                <span className="movie-btn"><Link><i class="fas fa-plus"></i></Link></ span>
              </div>

              <div className="rate-container">
                <div><i class="far fa-eye"></i>{movie.viewersNumber?movie.viewersNumber: Math.floor(Math.random() * (200 - 50) + 50)}</div>
                ⭐ 8/10
              </div>

         

      </div>
    </React.Fragment>
  )
}
