document.getElementById("emojis").addEventListener("click", () => {
    if (!document.getElementById("emojicontainer").style.display){
        document.getElementById("emojicontainer").style.display = "flex";
    } else {
        document.getElementById("emojicontainer").style.display = "";
    }
})

let frequent = document.getElementById("frequent");
let smileys = document.getElementById("smileys");
let clothes = document.getElementById("clothes");
let animals = document.getElementById("animals");
let foods = document.getElementById("foods");
let sports = document.getElementById("sports");
let transports = document.getElementById("transports");
let objects = document.getElementById("objects");
let hearts = document.getElementById("hearts");
let flags = document.getElementById("flags");
let drawerContainer = document.getElementById("drawercontainer");
let row1 = document.getElementById("row1");
let emojiArray = [];

let listOfSwitches = [frequent, smileys, clothes, animals, foods, sports, transports, objects, hearts, flags];

const notSelected = () => {
    for (let i = 0; i < listOfSwitches.length; i++){
        listOfSwitches[i].style.backgroundColor = "transparent";
    }
}

const addEmoji = (emoji) => {
    row1.innerHTML = [];
    document.getElementById("textarea").value += emoji;
    console.log(emojiArray.length)
    if (!emojiArray.includes(emoji)){
        if (emojiArray.length < 20 || emojiArray.length == undefined){
            emojiArray.push(emoji);
        } else if (emojiArray.length == 20){
            emojiArray.splice(0, 1);
            emojiArray.push(emoji);
        }    
        }
        row1.innerHTML = emojiArray.join("");
}

frequent.addEventListener("click", () => {
    notSelected();
    frequent.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "0";
})

smileys.addEventListener("click", () => {
    notSelected();
    smileys.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "420px";
})
clothes.addEventListener("click", () => {
    notSelected();
    clothes.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "840px";
})
animals.addEventListener("click", () => {
    notSelected();
    animals.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "1260px";
})
foods.addEventListener("click", () => {
    notSelected();
    foods.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "1680px";
})
sports.addEventListener("click", () => {
    notSelected();
    sports.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "2100px";
})
transports.addEventListener("click", () => {
    notSelected();
    transports.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "2520px";
})
objects.addEventListener("click", () => {
    notSelected();
    objects.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "2940px";
})
hearts.addEventListener("click", () => {
    notSelected();
    hearts.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "3360px";
})
flags.addEventListener("click", () => {
    notSelected();
    flags.style.backgroundColor = "#E6E6FA";
    drawerContainer.style.right = "3780px";
})