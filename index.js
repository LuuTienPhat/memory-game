import shuffle from "./Card.js";

const startButton = document.getElementById("start-btn");
const overlay = document.querySelector(".overlay");
const welcomeBox = document.querySelector(".welcome-box");
const summaryBox = document.querySelector(".summary-box");
const showTime = document.querySelector("#show-time");
const table = document.getElementById("table");
const restartButton = document.getElementById("restart-btn");

let interval; 
let count;
let currentData;
let historyResults = [];


startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", function () {
  window.location.reload();
});

function startGame() {
  hideWelcomebox();
  counter();
}

function hideWelcomebox() {
  overlay.style.display = "none";
  welcomeBox.style.display = "none";
}





function showSummaryBox() {
  setTimeout(() => {
    stopCount();
    loadfromLocalStorage();
    saveDataGame();
    displayTime();
    renderHistoryTable();
    storeToLocalStorage();

    console.log(historyResults);

    overlay.style.display = "flex";
    summaryBox.style.display = "flex";
  }, 1000);
}

function displayTime() {
  showTime.innerHTML = `Your time: ${count}s`;
}





function handleTableData(historyResults) {
  historyResults.sort((a, b) => {
    return a.time - b.time;
  });
  historyResults = [...historyResults.splice(0, 3)];
  return historyResults;
}

function renderHistoryTable() {
  handleTableData(historyResults);
  let content = historyResults.map((result, index) => {
    return `<tr class="${currentData === result ? "active" : ""}">
          <th scope="row">${index + 1}</th>
          <td>${result.date}</td>
          <td>${result.time}s</td>
        </tr>`;
  });
  table.innerHTML = `<tbody>${content.join("")}</tbody>`;
}

function checkTime(num) {
  return num < 10 ? "0" + num : num;
}

function saveDataGame() {
  let d = new Date();

  const day = checkTime(d.getDate());
  const month = checkTime(d.getMonth() + 1);
  const year = d.getFullYear();
  const hour = checkTime(d.getHours());
  const minute = checkTime(d.getMinutes());
  const data = `${day}/${month}/${year} ${hour}:${minute}`;

  currentData = {
    date: data,
    time: count
  };

  historyResults.push(currentData);
}

function loadfromLocalStorage() {
  if (!localStorage.history) return;

  historyResults = JSON.parse(localStorage.getItem("history"));
}

function storeToLocalStorage() {
  const dataString = JSON.stringify(historyResults);
  localStorage.setItem("history", dataString);
}

export default showSummaryBox;



function counter(){
    let second = 0;
    interval = setInterval(() => {
      second += 1;
      count = second;
    }, 1000);
  }

function stopCount() {
    clearInterval(interval);
  }