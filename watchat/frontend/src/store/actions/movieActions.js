import { movieService } from '../../services/movieService'
import { loading, doneLoading } from './systemActions';

export function loadMovies(filterBy) {
  
    return async dispatch => {
        try{
            // console.log('filterBy from action',filterBy)
            dispatch(loading());
            const movies = await movieService.query(filterBy);
            // console.log("recived movies from backened")
            // console.log(movies);
            dispatch({ type: 'SET_MOVIES', movies })
        }catch(err){
            console.log('MovieActions: err in loadMovies', err);
        }finally{
            dispatch(doneLoading());
        }
    }
}

export function addMovie(movie) {
    // console.log("movie actions")
    // console.log("added movie:", movie)
    return async dispatch => {
        try{
            await movieService.save(movie)
            dispatch({ type: 'ADD_MOVIE', movie})
        }catch(err){
            console.log('MovieActions: err in addMovie', err); 
        }
    }
}
