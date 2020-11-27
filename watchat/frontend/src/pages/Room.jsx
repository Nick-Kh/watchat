import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { movieService } from '../services/movieService'
import { socketService } from '../services/socketService'
import { Chat } from '../cmps/Room/Chat'
import { VideoControls } from '../cmps/Room/VideoControls'
import { MovieLoader } from '../cmps/Room/MovieLoader'
import { connect } from 'react-redux'

export class _Room extends Component {
  state = {
    movie: null,
    showVideo: false,
    volume: 0.2,
    currTime: null,
    timeSet: false,
    currUser: null,
  }

  playerRef = React.createRef()

  componentDidMount() {
    this.loadMovie()
    this.setState({ currUser: this.props.loggedInUser })
    socketService.setup()
    socketService.on('timestamp', (currTime) => {
      console.log('RECEIVED CURRTIME from BACKEND: ', currTime)
      currTime += 6
      this.setState({ currTime })
    })
  }

  componentWillUnmount() {
    this.setState({ currTime: 0 })
    this.setState({ interval: null })
  }

  async loadMovie() {
    const movieId = this.props.match.params.id
    const movie = await movieService.getById(movieId)
    this.setState({ movie })
  }

  onVolumeChange = (newVolume) => {
    this.setState({ volume: newVolume })
  }

  onMovieReady = () => {
    if (!this.state.showVideo) {
      setTimeout(() => {
        this.setState({ showVideo: true })
      }, 6500)
    }
    let player = this.playerRef.current
    if (player && !this.state.timeSet) {
      player.seekTo(this.state.currTime, 'seconds')
      this.setState({ timeSet: true })
    }
  }

  updateCurrTime = () => {
    socketService.emit('timestamp', 0)
  }

  render() {
    // console.log('CURRENT TIME', this.state.currTime)
    // console.log('CURRENT USER: ', this.state.currUser)
    if (!this.state.movie) return <div>Loading....</div>
    return (
      <div className='watch-room'>
        <div className='room-window'>
          <Chat
            roomId={this.state.movie._id}
            currUser={this.state.currUser}
            movie={this.state.movie}
          />
          <section className='frame'>
            {!this.state.showVideo && <MovieLoader />}
            <div
              className={`video disabled ${
                this.state.showVideo ? '' : 'hide-video'
              }`}>
              <ReactPlayer
                ref={this.playerRef}
                url={this.state.movie.videoUrl}
                width='100%'
                height='100%'
                playing={true}
                onProgress={this.updateCurrTime}
                muted={!this.state.showVideo}
                onReady={this.onMovieReady()}
                volume={this.state.volume}
              />
            </div>
            <VideoControls
              onVolumeChange={this.onVolumeChange}
              volume={this.state.volume}
            />
            <div className='reaction'></div>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  }
}

export const Room = connect(mapStateToProps)(_Room)
