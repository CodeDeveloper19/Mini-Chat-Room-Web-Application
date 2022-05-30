/**Set of Functions that make the socket.io work on client side**/
import DOMPurify from "dompurify";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");


import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTBTBLAN7gb5osupNwQ2cV1sAW8lxjiHc",
  authDomain: "mini-chat-room-web-application.firebaseapp.com",
  databaseURL: "https://mini-chat-room-web-application-default-rtdb.firebaseio.com",
  projectId: "mini-chat-room-web-application",
  storageBucket: "mini-chat-room-web-application.appspot.com",
  messagingSenderId: "843605418421",
  appId: "1:843605418421:web:923f3375d976e9cecef9fc",
  measurementId: "G-WCEVN0KR2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



socket.on('connect', () =>{
    connection();
    socket.emit("joined-message", socket.id);
})

socket.on("receive-message", (message) => {
    createReceiverMessage(message);
})

/*Informs us that a new user has joined the chat*/
socket.on("message-joined", (Id) =>{
    let connectionMessage = document.createElement("div");
    let connectionMessageContainer = document.createElement("div");
    connectionMessage.className = "connected";
    connectionMessage.id = "connected" + uniquePointer;
    connectionMessageContainer.className = "connectedContainer";
    connectionMessageContainer.id = "connectedContainer" + uniquePointer;
    connectionMessage.innerHTML = `${Id} has connected to the chat room`;
    document.getElementById("body").appendChild(connectionMessageContainer);
    document.getElementById("connectedContainer" + uniquePointer).appendChild(connectionMessage);
    uniquePointer++;
})

socket.on("retrieved-rooms", (allrooms) => {
    createPopularRooms(allrooms);
    createJoinButton(allrooms);
})

socket.on("result-found", (roomname) => {
    found(roomname);
})

socket.on("no-result", () =>{
    notFound();
})

socket.on("retrieved-rooms2", (allrooms) => {
    createRoomList(allrooms);
    createdRoom(allrooms);
})

/***************Handles the sending of messages****************/
var sendButton = document.getElementById("send");
var textArea = document.getElementById("textarea");

textArea.addEventListener('keydown', (event) => {
    let purifiedTextArea = DOMPurify.sanitize(textArea.value);
    if (event.keyCode === 13 && !purifiedTextArea == "") {
        let message = purifiedTextArea;
            createMessage();
            socket.emit("send-message", message);
    }
});

sendButton.addEventListener('click', () => {
    let purifiedTextArea = DOMPurify.sanitize(textArea.value);
    if (!purifiedTextArea == ""){
        let message = purifiedTextArea;
            createMessage();
            socket.emit("send-message", message);
    }
})

/*********Collection of functions called in other functions**********/

let uniquePointer = 0;

let lastSentMessage = "Hey, mummmy said that you should return what you stole from the shop";
let numberOfNotifications = document.getElementsByClassName("wholemessages").length;
let groupImage = "./images/roomimage.jpg";
let numberOfMembers = "1";

const connection = () => {
    let connectionMessage = document.createElement("div");
    let connectionMessageContainer = document.createElement("div");

    connectionMessage.className = "connected";
    connectionMessage.id = "connected" + uniquePointer;
    connectionMessageContainer.className = "connectedContainer";
    connectionMessageContainer.id = "connectedContainer" + uniquePointer;
    connectionMessage.innerHTML = "You have connected to the chat room";

    document.getElementById("body").appendChild(connectionMessageContainer);
    document.getElementById("connectedContainer" + uniquePointer).appendChild(connectionMessage);

    uniquePointer++;
}

const found = (roomname) => {
    document.getElementById("tharoomss").textContent = "";

    let popularRoom = document.createElement("div");

        popularRoom.className = "popularroom";
        popularRoom.id = "popularroom" + uniquePointer;
        popularRoom.innerHTML = `
        <div class="Roomname">
            ${roomname.roomname}
        </div>
        <div id="help">
            ?
        </div>
        <div class="Roomtype">
            Public
        </div>
        <div class="Roomnumber">
            <h4>${numberOfMembers}/50</h4>
        </div>
        <button class="jointhisroom" id="${roomname.roomname}">Join</button>
        `

        document.getElementById("tharoomss").appendChild(popularRoom)

        uniquePointer++;
    
    if (!roomname.connectedOrNot){
        document.getElementById(roomname.roomname).style.backgroundColor = "green";
        document.getElementById(roomname.roomname).addEventListener("click", () => {
            document.getElementById("join").style.display = "none";
            let requiredRoom = roomname.roomname;
            socket.emit("join-room", (requiredRoom));
    })
    } else {
        document.getElementById(roomname.roomname).style.backgroundColor = "gray";
    }
}

const notFound = () => {
    document.getElementById("tharoomss").textContent = "";
    document.getElementById("tharoomss").innerHTML = "<p id='noresult'>No Search Results Found</p>";
}

const createPopularRooms = (allrooms) => {
    let allroomsss = allrooms.allrooms;
    for (let i = 0; i < allroomsss.length; i++){

        let popularRoom = document.createElement("div");

        popularRoom.className = "popularroom";
        popularRoom.id = "popularroom" + uniquePointer;
        popularRoom.innerHTML = `
        <div class="Roomname">
            ${allroomsss[i]}
        </div>
        <div id="help">
            ?
        </div>
        <div class="Roomtype">
            Public
        </div>
        <div class="Roomnumber">
            <h4>${numberOfMembers}/50</h4>
        </div>
        <button class = "jointhisroom" id="${allroomsss[i]}">Join</button>
        `

        document.getElementById("tharoomss").appendChild(popularRoom)

        uniquePointer++;
    }
}

const createRoomList = (allrooms) => {
    let value = allrooms.indexOf(roomName.value);
    if (value == -1 && roomName.value && roomName.value.length != 20) {
        let chatRoom = document.createElement("div");
        chatRoom.id = "chatroom" + uniquePointer;
        chatRoom.className = "chatroomhide";
        chatRoom.innerHTML = `
        <div class="room">
        <img src="${groupImage}" class="chatroomlistimage"> 
        <div class="container2">
            <h2 id="groupname">${document.getElementById("createdroomname").value}</h2>
            <h3 id="groupmessage">${lastSentMessage}</h3>
        </div>
        <div class="container3">
        <div class="numberofnotification">
            ${numberOfNotifications}
        </div>
        <img class="notification" id="notification" src="./images/notifications.svg">
        </div>
        </div>`

        document.getElementById("chatroom").appendChild(chatRoom);

        uniquePointer++;
    } else if (value != -1){
        roomName.style.border = "1px solid red";
        warning1.innerHTML = "This roomname has already been taken";
    }
}

const createMessage = () => {
    let date = new Date();

    let wholeMessages = document.createElement("div");
    let nameTime = document.createElement("div");
    let message = DOMPurify.sanitize(textArea.value);
    let messageDiv = document.createElement("div");


    nameTime.className = "nametime"
    wholeMessages.id = "wholemessages" + uniquePointer;
    wholeMessages.className = "wholemessages"
    messageDiv.className = "messages";

    messageDiv.innerHTML = `<p>${message}</p>`;
    nameTime.innerHTML = `<h4>You,</h4>
    <h4 id='time'>${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}</h4>`


    document.getElementById("body").appendChild(wholeMessages);
    document.getElementById("wholemessages" + uniquePointer).appendChild(nameTime);
    document.getElementById("wholemessages" + uniquePointer).appendChild(messageDiv);
    textArea.value = "";
    uniquePointer++;
}

const createReceiverMessage = (message) => {
    let date = new Date();

    let soundEffect = new Audio("/soundeffects/incoming_message.mp3");
    soundEffect.play(); 

    let messageDiv = document.createElement("div");
    let messageDivContainer = document.createElement("div");
    let nametime2 = document.createElement("div");

    messageDiv.id = "messages" + uniquePointer;
    messageDiv.className = "messages2";
    messageDivContainer.id = "messagesContainer" + uniquePointer;
    messageDivContainer.className = "messagesContainer";
    messageDiv.innerHTML = `<p>${message.message}</p>`;
    nametime2.className = "nametime2";
    nametime2.innerHTML = `<h4>${message.Id},</h4>
    <h4 id='time'>${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}</h4>`

    document.getElementById("body").appendChild(messageDivContainer);
    document.getElementById("messagesContainer" + uniquePointer).appendChild(nametime2);
    document.getElementById("messagesContainer" + uniquePointer).appendChild(messageDiv);

    uniquePointer++;
}

const createdRoom = (allrooms) => {
    let value = allrooms.indexOf(roomName.value);
    let RoomName = DOMPurify.sanitize(roomName.value);
    if (roomName.value){
        if (value == -1 && RoomName.length != 20) {
            create.style.display = "none";
            socket.emit("create", RoomName);
        } else if (RoomName.length == 20){
            roomName.style.border = "1px solid red";
            warning1.innerHTML = "A roomname cannot be exactly 20 characters";
        }
    } 
}

const leaveRoom = () => {
    let RoomName = DOMPurify.sanitize(roomName.value);
    socket.emit("leave-room", (RoomName))
}

const createJoinButton = (allrooms) => {
    let allroomsss = allrooms.allrooms;
    let connectedOrNotArray = allrooms.connectedOrNotArray;

    for (let i = 0; i < allroomsss.length; i++){
        if (!connectedOrNotArray[i]){
            document.getElementById(allroomsss[i]).style.backgroundColor = "green";
            document.getElementById(allroomsss[i]).addEventListener("click", () => {
                document.getElementById("join").style.display = "none";
                let requiredRoom = allroomsss[i];
                socket.emit("join-room", (requiredRoom));
            })
        } else {
            document.getElementById(allroomsss[i]).style.backgroundColor = "gray";
        }
    }
}

/*************************Other Functionalities*************************/

var back = document.getElementById("back");
var chatRooms = document.getElementById("chatrooms");
var messagingArea = document.getElementById("messagingarea");
var header2 = document.getElementById("header2");
var header = document.getElementById("header");
var footer = document.getElementById("footer");
var search = document.getElementById("search");
var searchArea = document.getElementById("searcharea");
var chatRoomHide = document.getElementsByClassName("chatroomhide");

back.addEventListener('click', () => {
    if (back.getAttribute('src') === "./images/box move left.png"){
        chatRooms.style.width = "0";
        search.style.width = "0";
        header2.style.width = "0";
        searchArea.style.padding = "0";
        messagingArea.style.width = "100%";
        header.style.width = "100%";
        footer.style.width = "100%";
        for (let x = 0; x < chatRoomHide.length; x++){
            document.getElementsByClassName("chatroomhide")[x].style.display = "none";
        }
        back.src = "./images/box move right.png";
    } else if (back.getAttribute('src') === "./images/box move right.png"){
        chatRooms.style.width = "40%";
        search.style.width = "100%";
        header2.style.width = "40%";
        searchArea.style.paddingLeft = "10px";
        searchArea.style.paddingRight = "10px";
        messagingArea.style.width = "60%";
        header.style.width = "60%";
        footer.style.width = "60%";
        for (let x = 0; x < chatRoomHide.length; x++){
            document.getElementsByClassName("chatroomhide")[x].style.display = "flex";
        }
        back.src = "./images/box move left.png";
    }
})

/************Creating a new room functonalities***********************/

let privacySwitch = document.getElementById("privacyswitch");
let Switch = document.getElementById("switch");
let indicate;
let createdRoomPassword = document.getElementById("createdroompassword");
let Private = document.getElementById("private");
let Public = document.getElementById("public");

let roomName = document.getElementById("createdroomname");
let warning1 = document.getElementById("warning1");

privacySwitch.addEventListener("click", () => {
    if (!indicate){
        privacySwitch.style.backgroundColor = "rgb(154, 154, 255)";
        Switch.style.left = "55%";
        createdRoomPassword.disabled = false;
        createdRoomPassword.style.border = "1px solid rgba(0, 0, 0, 1)";
        Private.style.color = "rgba(0, 0, 0, 1)";
        Public.style.color = "rgba(0, 0, 0, 0.4)";
        indicate = 1;
    } else if (indicate){
        privacySwitch.style.backgroundColor = "rgb(205, 205, 255)";
        Switch.style.left = "0%";
        createdRoomPassword.disabled = true;
        createdRoomPassword.style.border = "1px solid rgba(0, 0, 0, 0.2)";
        createdRoomPassword.value = "";
        Private.style.color = "rgba(0, 0, 0, 0.4)";
        Public.style.color = "rgba(0, 0, 0, 1)";
        indicate = 0;
    }
})

document.getElementById("cancel").addEventListener("click", () =>{
    document.getElementById("create").style.display = "none";
})

document.getElementById("createroom").addEventListener("click", () => {
    document.getElementById("create").style.display = "flex";
    roomName.value = ""
})

document.getElementById("created").addEventListener("click", () => {
    if (roomName.value){
    socket.emit("retrieve-rooms2");
    }

    const db = getDatabase();
    set(ref(db, 'servers/'), {
      server: roomName.value
    });
})

document.getElementById("createdroomname").addEventListener("click", () => {
    roomName.style.border = "1px solid black";
    warning1.innerHTML = "";
})


/******************Joining Room Functionalities**********************************/

document.getElementById("joinroom").addEventListener("click", () => {
    document.getElementById("tharoomss").textContent = "";
    document.getElementById("join").style.display = "flex";
    socket.emit("retrieve-rooms", (socket.id));
})

document.getElementById("close").addEventListener("click", () => {
    document.getElementById("join").style.display = "none";
})

/*******************************************************************/

document.getElementById("stay").addEventListener("click", () => {
    document.getElementById("leaveroom").style.display = "none";
})

document.getElementById("exitroom").addEventListener("click", () => {
    document.getElementById("leaveroom").style.display = "flex";
})

document.getElementById("leave").addEventListener("click", () => {
    leaveRoom();
    document.getElementById("leaveroom").style.display = "none";
})

/*******************Searching for a room*************************/
document.getElementById("searchforroom").addEventListener("click", () => {
    document.getElementById("tharoomss").textContent = "";
    let roomname = DOMPurify.sanitize(document.getElementById("lookforrooms").value);
    socket.emit("lookforroom", (roomname));
})
