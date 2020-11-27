import httpService from './httpService'

export const movieService = {
    query,
    getById,
    save
}



function query(filterBy) {
    // console.log("movieService",filterBy)
    // const queryParams
    // return httpService.get('movie', filterBy)
    const queryStr = `?search=${filterBy.search}&minYear=${filterBy.minYear}&maxYear=${filterBy.maxYear}&type=${filterBy.type}`;
    // console.log('movie${queryStr}', `movie${queryStr}`)
    return httpService.get(`movie${queryStr}`);
}

function getById(movieId) {
    return httpService.get(`movie/${movieId}`)
}

function save(movie) {
    // console.log('new review is saved',movie)
    // movie.updatedAt = Date.now()
    // console.log(movie,'new movie')
    return httpService.put(`movie/${movie._id}`, movie)
    
}
