import React, { Component } from "react";
import Slider from "react-slick";

export class WideSlider extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 5,
      speed: 500
    };
    const { movies } = this.props
    if (!movies.length) return <div></div>
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          {movies.map((movie, idx) => <div style={{ backgroundImage: `url(${movie.coverUrl})` }} > <h3>1</h3></div>
          )}

        </Slider>
      </div>
    );
  }
}
// export class WideSlider extends Component {
//   render() {
//     const settings =  {
//       centerMode: true,
//       pauseOnHover: false,
//       slidesToShow: 6,
//     };
//     const { movies } = this.props
//     console.log('movies from slider',movies)
//     if(!movies.length) return <div></div>
//     return (

//       <div>
//         <span>CustomSlider</span>

//         <Slider { ...settings }>
//           {movies.map((movie,idx)=>
//                 <div style={{backgroundImage: `url(${movie.coverUrl? movie.coverUrl:""})`}} > <h3>1</h3></div>
//             )}

//         </Slider>

//       </div>
//     );
//   }
// }