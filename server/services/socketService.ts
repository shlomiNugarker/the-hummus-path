import { Socket } from 'socket.io'

export default {
  connectSockets,
}

let gIo: any

interface extendSocket extends Socket {
  userId: string
}

function connectSockets(http: any, _session: any) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
      pingTimeout: 60000,
    },
  })
  gIo.on('connection', (socket: extendSocket) => {
    console.log('socket connected, id: ' + socket.id)

    socket.on('login', async (userId: string) => {
      // console.log('user logged in: ' + userId)
      socket.userId = userId
    })

    // when browser disconnected
    socket.on('disconnect', async () => {
      console.log('socket disconnected, id: ' + socket.id)
    })
  })
}

async function emitToSocket<T>({
  type,
  data,
  socketId,
}: {
  type: string
  data: T
  socketId: string
}) {
  const socket = await getSocketById(socketId)
  if (socket) socket.emit(type, data)
  else {
    console.log('socket not found')
  }
}
async function getSocketById(socketId: string) {
  const sockets = await getAllSockets()
  if (!sockets) return
  const socket = sockets.find((s: Socket) => s.id === socketId)
  return socket
}
async function getAllSockets() {
  if (!gIo) return
  const sockets: Socket[] = await gIo.fetchSockets()
  return sockets
}
async function getAllSocketsIds() {
  const sockets: Socket[] = await gIo.fetchSockets()
  const socketsIds: string[] = []

  sockets.forEach((socket) => {
    socketsIds.push(socket.id)
  })
  return socketsIds
}
