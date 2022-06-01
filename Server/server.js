const { instrument } = require("@socket.io/admin-ui"); 

const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"], 
        credentials: true
    }
});


io.on('connection', socket => {
    // Executed during the start of the server
    let all = Array.from(io.sockets.adapter.rooms.keys());
    let allrooms = [];
            
    for (let i = 0; i < all.length; i++){
        if (all[i].length != 20){
            allrooms.push(all[i]);  //This helps limit the client ids which are always 20 digits
        }
    }

    if (allrooms.length == 0){
        socket.emit("server-start")
    }
    /********************************************/
    
    socket.on("send-message",(message) => {
        let Id = socket.id;
        socket.broadcast.emit("receive-message", {message, Id}); // the broadcast makes the message to be sent to all others aside from you.
    })

    socket.on("joined-message", () =>{
        let Id = socket.id; 
        socket.broadcast.emit("message-joined", Id);
    })

    socket.on("retrieve-rooms", () => {
        let all = Array.from(io.sockets.adapter.rooms.keys());
        let allrooms = [];
        let usersConnectedToRooms = [];
        let connectedOrNotArray = [];
        
        for (let i = 0; i < all.length; i++){
            if (all[i].length != 20){
                allrooms.push(all[i]);  //This helps limit the client ids which are always 20 digits
            }
        }

        for (let i = 0; i < allrooms.length; i++){
            usersConnectedToRooms.push(io.sockets.adapter.rooms.get(allrooms[i])); //creates an array that contains the values(clients) of all the rooms only
        }

        for (let i = 0; i < usersConnectedToRooms.length; i++){
            connectedOrNotArray.push(usersConnectedToRooms[i].has(socket.id)); //creates an array that contains the boolean values of whether the user is in a room already 
        }

        socket.emit("retrieved-rooms", {allrooms, connectedOrNotArray});
    })

    socket.on("retrieve-rooms2", () => {
        let all = Array.from(io.sockets.adapter.rooms.keys());
        let allrooms = [];
        
        for (let i = 0; i < all.length; i++){
            if (all[i].length != 20){
                allrooms.push(all[i]);  //This helps limit the client ids which are always 20 digits
            }
        }
        socket.emit("retrieved-rooms2", (allrooms));
    })

    socket.on("lookforroom", (roomname) => {
        let all = io.sockets.adapter.rooms;
        if (all.has(roomname)){
            let usersConnectedToRoom;
            let connectedOrNot;

            usersConnectedToRoom = io.sockets.adapter.rooms.get(roomname);

            connectedOrNot = usersConnectedToRoom.has(socket.id);
            
            socket.emit("result-found", {roomname, connectedOrNot})
        } else {
            socket.emit("no-result");
        }
    })

    socket.on("create", (RoomName) => {
        socket.join(RoomName);
    })

    socket.on("leave-room", (RoomName) => {
        socket.leave(RoomName);
    })

    socket.on("join-room", (requiredRoom) => {
        socket.join(requiredRoom);
    })

    socket.on("create-servers", (returnedServerDatabase) => {
        for (let i = 0; i < returnedServerDatabase.length; i++){
            socket.join(returnedServerDatabase[i])
        }
    })
})

instrument(io, { auth: false });



