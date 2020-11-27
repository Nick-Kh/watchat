import React from 'react'
import { Link } from "react-router-dom"



export function MovieSlider({ movies }) {
    
    return (
        <React.Fragment>
        <div className="home-movie-slide-container">
            { 
            movies.map((movie,idx) => 
            <div key={ movie._id }  className={`home-movie-slide slide-${idx+1}`} style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}}>
                {/* <div className='home-movie-slide-img' style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} ></div> */}
                 {/* <div className="home-btns-container">
                    <span className="movie-btn movie-btn-details"><Link to={`/movie/${movie._id}`} >Details</Link></span>
                </div> */}
            </div>)
            }


        </div>
            <div class="content">
                <div class="background">
                  <div class="left">left</div>
                  <div class="right">right</div>
                </div>
                <div class="content-container">content here...</div>
        </div>


        </React.Fragment>
)
}

