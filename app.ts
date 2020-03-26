import * as express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { Message } from "./Message";

class App {
    public app: express.Application;
    public server: Server;
    private io: SocketIO.Server;
    public PORT: number = 8100;
    private users: number[] = [];

    constructor() {
        this.routes();
        this.sockets();
        this.listen();
    }

    routes() {
        this.app = express();
        this.app.route("/").get((req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
    }

    private sockets(): void {
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private listen(): void {

        this.io.on('connection', (socket: any) => {
            let userId = this.users.length + 1;
            this.users.push(userId);
            console.log(`a user connected with id ${userId}`);

            socket.on('chat message', (m: any) => {
                let msg = new Message(userId, m);
                console.log(`${userId} says: ${m}`);
                socket.broadcast.emit('chat message', msg);
            });
            

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

export default new App();