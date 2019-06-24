let gridNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var column1 = [
  [0, 0],
  [1, 4, 7]
];
var column2 = [
  [0, 0],
  [2, 5, 8]
];
var column3 = [
  [0, 0],
  [3, 6, 9]
];
var row1 = [
  [0, 0],
  [1, 2, 3]
];
var row2 = [
  [0, 0],
  [4, 5, 6]
];
var row3 = [
  [0, 0],
  [7, 8, 9]
];
var diagonal1 = [
  [0, 0],
  [1, 5, 9]
];
var diagonal2 = [
  [0, 0],
  [3, 5, 7]
];
var gridItem = [
  [0, 0], gridNumbers
];
var allArrays = [column1, column2, column3, row1, row2, row3, diagonal1, diagonal2];
let inputArea = [];
let gridItems = document.getElementsByClassName("gridItem");
let playerScore = 0;
let aiScore = 0;
let draws = 0;
let gameOver = false;
let aiChoice = 0;
var delayInMilliseconds = 1000; //1 second
let canPress = true;
let playerScoreContainer = document.getElementById("playerScore");
let aiScoreContainer = document.getElementById("aiScore");
let drawContainer = document.getElementById("draw");

function remove(arrayToSplice, item) {
  let index = arrayToSplice.indexOf(item);
  if (index > -1) {
    arrayToSplice.splice(index, 1);
  }
}

function userInput() {
  if (this.innerHTML === "" && gameOver === false && canPress) {
    this.innerHTML = "X";
    let removeThis = Number(this.id);
    pushInput(this, 0);
    remove(gridNumbers, removeThis);
    canPress = false;
    setTimeout(function() {
      //your code to be executed after 1 second
      superSmartAiInput();
      canPress = true;
    }, delayInMilliseconds);
    
  }
}

function superSmartAiInput() {
  if (gridNumbers.length > 1 && gameOver === false) {
    aiThinking(allArrays);
    let thisNumber = gridNumbers[aiChoice];
    let thisGridPlace = document.getElementById(thisNumber);
    thisGridPlace.innerHTML = "O";
    pushInput(thisGridPlace, 1);
    remove(gridNumbers, thisNumber);
  }
}

function addListener(element, listenFor, functionToCall) {
  for (var i = 0; i < element.length; i++) {
    element[i].addEventListener(listenFor, functionToCall)
  }
}

function pushInput(element, unit) {
  let arraysToPushTo = Array.from(element.classList);
  for (let i = 1; i < arraysToPushTo.length; i++) {
    let x = arraysToPushTo[i];
    let y = window[x];
    y[0][unit] += 1;
    if (y[0].includes(3)) {
      if (y[0][1] === 3) {
        aiScore += 1;
        aiScoreContainer.innerHTML = aiScore;
        gameOver = true;
      } else if (y[0][0] === 3) {
        playerScore += 1;
        playerScoreContainer.innerHTML = playerScore;
        gameOver = true;
      } 
    } else if (gridNumbers.length <= 1 && !gameOver){
      gameOver = true;
      draws += 1;
      drawContainer.innerHTML = draws;
    }
  }
}

function aiThinking(array) {
  aiChoice = Math.floor((Math.random() * gridNumbers.length));
  for (let i = 0; i < array.length; i++) {
    if (array[i][0][1] === 2 && array[i][0][0] === 0) {
      for (let j = 0; j < array[i][1].length; j++) {
        let k = "" + array[i][1][j];
        let l = document.getElementById(k);
        if (l.innerHTML === "") {
          aiChoice = gridNumbers.indexOf(Number(k));
          break;
        }
      }
    } else if (array[i][0][0] === 2) {
      for (let j = 0; j < array[i][1].length; j++) {
        let k = "" + array[i][1][j];
        let l = document.getElementById(k);
        if (l.innerHTML === "") {
          aiChoice = gridNumbers.indexOf(Number(k));
        }
      }
    } 
    }
  }

  function reset() {
    if(canPress){
    for(let i = 0; i < gridItems.length; i ++){
      gridItems[i].innerHTML = "";
      gridNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      gameOver = false;
    }
    for(let j = 0; j < allArrays.length; j++){
      for(let k = 0; k < allArrays[j][0].length; k++){
        allArrays[j][0][k] = 0;
      } 
    }
  }
  }

window.addEventListener("load", function() {
  addListener(gridItems, "click", userInput);
});
