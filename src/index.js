const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/user')
// new web server//
const server = http.createServer(app)
//-- new instance of socket ios to work with given raw http server
const io = socketio(server)
const port = process.env.PORT || 3000
const public = path.join(__dirname, '../public')

app.use(express.static(public))

// server(emits)-> client(receive)-- acknoledement -->server

// client(emits)->server(receive)--acknowledgement->client









//socket is object that contain info about the new connection//
io.on('connection', (socket) => {
    console.log('New WebScoket connection ')
    //sending data to connceted client//
    socket.emit('message', generateMessage('Welcome'))
    //broadcast sends everybody except perticualr//
    socket.on('join', ({ username, room },callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message', generateMessage('Welcome !'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has Joined! `))
        callback()
    })
   // socket.broadcast.emit('message', generateMessage('A new user has joined the ChAt'))

    socket.on('sendMessage', (message, callback) => {
        //checking bad words
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('profanity is not allowed')
        }

        io.emit('message', generateMessage(message))
        // when server emits it means receiver receives so call the callback
        callback()
    })
    // IF A CLIENT DISCONNECTED built in event
    socket.on('disconnect', () => {
        const user= removeUser(socket.id)
        if(user)
        {
            io.to(user.room).emit('message', generateMessage(` ${user.username} left the chat room`))
        }

    })
    socket.on('sendLocation', (location, callback) => {
        console.log(location.longitude)
        io.emit('LocationMessage', generateLocationMessage(location))
        callback('hi there location shared')
    })

})







server.listen(port, () => {
    console.log(`server is up on port ${port} `)
})





















// first argumnet-event name
/*------------------------------*/
//___ server(emits) ---client(receive) --CountUpdated-----------//
// client(emits) server(receive)---incement
// socket.emit('countUpdated',count)
// socket.on('incement',()=>{
//     count++
//     // ---------for only one perticular connected client
//    // socket.emit('countUpdated',count)
//    //----------for emitting to all connection
//    io.emit('countUpdated',count)
// })
// const Message='welcome to my website'

