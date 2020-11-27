// const uuid = require('uuid')

module.exports = connectSockets

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let currTime = 0

setInterval(() => {
  currTime++
}, 1000)

let users = [
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'George',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405764/watchat/user32_sombxr.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'David123',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405764/watchat/user30_yr462l.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Angela',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405762/watchat/user14_pbwv25.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'M.Jackson',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405762/watchat/user34_se0jt3.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Tom',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405762/watchat/user11_ghw6qh.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Christy',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405761/watchat/user26_zhxse8.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'David',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405761/watchat/user23_x3yrkg.png',
  },
  {
    _id: getRandomNumber(100, 999999).toString(),
    username: 'Rachel',
    room: '5f711660f739d8b9f62c21d7',
    avatar:
      'https://res.cloudinary.com/dl5mlxukz/image/upload/v1601405761/watchat/user17_ouqjam.png',
  },
]
const reactions = ['sad', 'like', 'lol', 'angry', 'heart', 'wow']

function connectSockets(io) {
  io.on('connection', (socket) => {
    setInterval(() => {
      let id = getRandomNumber(1000, 10000).toString()
      io.to(socket.roomId).emit('reactions', {
        id: id,
        type: reactions[getRandomNumber(0, 5)],
        posX: getRandomNumber(10, 50),
      })
      setTimeout(() => {
        io.to(socket.roomId).emit('reaction-delete', id)
      }, 2000)
    }, 3000)

    socket.on('chat', (msg) => {
      console.log('RECEIVED MSG')
      io.to(socket.roomId).emit('chat', msg)
    })

    socket.on('chat room', (data) => {
      console.log('RECEIVED LOGGED IN USER IN BACKEND: ', data.user)
      if (socket.roomId) {
        socket.leave(socket.roomId)
      }
      let newUser
      if (!data.user) {
        newUser = {
          _id: getRandomNumber(1000, 9999).toString(),
          username: 'Guest' + '#' + getRandomNumber(100, 999),
          room: data.roomId,
        }
      } else {
        newUser = { ...data.user, room: data.roomId }
      }
      users.unshift(newUser)
      socket.join(data.roomId)
      socket.roomId = data.roomId
      const roomUsers = users.filter((user) => user.room === data.roomId)
      console.log('NEW USER IN BACKEND: ', newUser)
      io.to(socket.roomId).emit('chat room', roomUsers, newUser)
    })

    socket.on('remove-user', (data) => {
      console.log('BACKEND REMOVE USER WITH ID: ', data.userId)
      console.log('IN ROOM: ', data.userRoom)
      users = users.filter((user) => user._id !== data.userId)
      const roomUsers = users.filter((user) => user.room === data.userRoom)
      io.to(socket.roomId).emit('remove-user', roomUsers)
    })

    socket.on('reactions', (reaction) => {
      console.log('RECEIVED REACTION')
      io.to(socket.roomId).emit('reactions', reaction)
    })

    socket.on('reaction-delete', (id) => {
      console.log('deleting reaction')
      io.to(socket.roomId).emit('reaction-delete', id)
    })

    socket.on('timestamp', (data) => {
      io.to(socket.roomId).emit('timestamp', currTime)
    })
  })
}
