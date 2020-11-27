import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadMovies } from '../store/actions/movieActions'

class _Search extends Component {

    state = {
        filterBy: {
            search: '',
            minYear: -Infinity,
            maxYear: Infinity,
            type: 'All'
        },
    }

    componentDidMount() {
        this.props.loadMovies(this.state.filterBy)
    }
    

    handleInputs = (ev) => {
        const field = ev.target.name
        let value = ev.target.value
        // let value = (field === "inStock") ? ev.target.checked : ev.target.value
        this.setState({ ...this.state, filterBy: { ...this.state.filterBy, [field]: value } }, () => {
                this.props.loadMovies(this.state.filterBy)
        })
    }


    render() {
        return (
            <React.Fragment> 
               <form className="navlink-search">
                    {/* <div className="input-icons"> 
                        <input  className="input-field" placeholder="Search Movie" name="search" autoComplete="off" onChange={ this.handleInputs} type="search" />
                    </div>  */}
                    <div className="search-input-container">
                        <input placeholder="Search Movie" name="search" autoComplete="off" onChange={ this.handleInputs} type="search"/>
                        <div className="search"></div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        movies: state.movie.movies,
        loggedInUser: state.user.loggedInUser,
    }
}
const mapDispatchToProps = {
    loadMovies,
}
export const Search = connect(mapStateToProps,mapDispatchToProps)(_Search)