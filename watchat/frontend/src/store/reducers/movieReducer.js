const initialState = {
    movies: []
}

export function movieReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.movies
            }
        case 'ADD_MOVIE':
            const movies = [...state.movies, action.savedMovie]
            return {...state, movies}
        default:
            return state
    }
}