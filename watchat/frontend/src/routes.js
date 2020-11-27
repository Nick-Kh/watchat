import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { MovieDetails } from './pages/MovieDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { Room } from './pages/Room.jsx'
import { Movies } from './pages/Movies.jsx'

export default [
  {
    path: '/about',
    component: About,
  },
  {
    path: '/movie',
    component: Movies,
  },
  {
    path: '/Movie/:id',
    component: MovieDetails,
  },
  {
    path: '/user',
    component: UserDetails,
  },
  {
    path: '/room/:id',
    component: Room,
  },
  {
    path: '/',
    component: Home,
  },
]
