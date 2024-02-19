// ==UserScript==
// @name        Save Editor For Infinite Craft
// @namespace   DMRD
// @match       https://neal.fun/infinite-craft/*
// @grant       none
// @version     1.0
// @author      DMRD
// @description Adds a simple save file editor directly into the game
// @run-at      document-idle
// ==/UserScript==



const css = `
    :root {
        --font-family: 'Fira Sans', sans-serif;
        --white: #fff;
        --black: #000;
        --grey: #18181b;
    }

    a:link,
    a:visited,
    a:hover,
    a:active {
        text-decoration: none;
    }

    a {
        color: #2b76f0;
    }

    .save-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    #saveFile {
        height: 400px;
        border: 2px solid var(--black);
        background-color: var(--grey);
        margin-top: 50px;
        color: var(--white);
        border-radius: 8px;
        font-size: 14px;
        resize: none;
        font-family: var(--font-family);
        scrollbar-color: #525252 #262626;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    #saveFile:focus-visible {
        outline: none;
    }

    #credit {
        font-family: var(--font-family);
        color: #737373;
        font-size: 14px;
        text-align: center;
        padding: 5px;
    }

    #saveGame {
        padding: 8px 8px 7px;
        border-radius: 5px;
        background-color: var(--grey);
        color: var(--white);
        border: 2px solid var(--black);
        cursor: pointer;
        font-size: 15.4px;
        font-family: var(--font-family);
    }

    #saveGame:hover {
    background: linear-gradient(0deg,#3b0764,#18181b 90%);
    transition: background 1s linear;
    }


`;

// Function to add styles to the document head
function addStyles(css) {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(css.trim()));
    document.getElementsByTagName('head')[0].appendChild(styleElement);
}

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600&display=swap';
document.head.appendChild(link);

let container = document.querySelector('.container');

let saveContainer = document.createElement('div');
saveContainer.classList.add('save-container');
container.appendChild(saveContainer);

let saveTxt = document.createElement('textarea');
saveTxt.id = 'saveFile';
saveTxt.classList.add('save-file');
saveContainer.appendChild(saveTxt);

let rawData = localStorage.getItem("infinite-craft-data");
let saveData = JSON.stringify(JSON.parse(rawData), null, 2);
saveTxt.innerHTML = saveData;

let credit = document.createElement('div');
credit.innerHTML = "Made by @dmrd on the <a href='https://discord.gg/NSMut3Wx3Y' target='_blank'>discord</a>";
credit.id = "credit";
credit.classList.add('credit');
saveContainer.appendChild(credit);

let saveBtn = document.createElement('button');
saveBtn.id = 'saveGame';
saveBtn.innerHTML = "Save";
saveBtn.classList.add('save-btn');
saveContainer.appendChild(saveBtn);

saveBtn.addEventListener('click', function() {
    const isConfirmed = confirm("This will override your current save. Are you sure you want to continue?");
    if (isConfirmed) {
        let saveTxtContent = document.getElementById('saveFile').value;
        localStorage.setItem("infinite-craft-data", saveTxtContent);
        alert("Data saved successfully!");
        window.location.reload();
    } else {
        return;
    }
});
addStyles(css);
