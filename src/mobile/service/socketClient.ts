import { io, Socket } from 'socket.io-client'

export default class SocketClient {
  static client: SocketClient = new SocketClient()

  private connectSocket!: Socket

  private constructor() {
    const socket = SocketClient.init()
    this.connect(socket, (socketParams: Socket) => {
      this.connectSocket = socketParams
      console.log(socketParams)
    })
  }

  private static init(): Socket {
    return io(<string>process.env.BROWSER_SOCKET_ADDRESS)
  }

  private connect(socket: Socket, callBack: Function) {
    socket.on('connect', () => {
      console.log(socket.id)
      callBack(socket)
    })
  }

  public createRoom(browserWSEndpoint: string, url: string, currentTableNumber: number) {
    this.connectSocket.emit('create room', browserWSEndpoint, url, currentTableNumber, (response: string) => {
      console.log(response)
    })
  }

  public ping(message: string) {
    this.connectSocket.emit('ping', message, (response: string) => {
      console.log(response)
    })
  }
}
