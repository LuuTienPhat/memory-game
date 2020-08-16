const memoryGame = document.querySelector(".memory-game");

const path = "./src/svg/";
const format = ".svg";

const data = [
    {imageName: "003-kitty-45"},
    {imageName: "035-kitty-15"},
    {imageName: "036-kitty-14"},
    {imageName: "015-kitty-34"},
    {imageName: "034-kitty-16"},
    {imageName: "042-kitty-8"}
];

(function renderGame(){
    const content = data.map((item) => {
        return (
            `<div class="memory-card" data-name="${item.imageName}">
                <img class="font-face" src="${path + item.imageName + format}" />
                <img class="back-face" src="./src/svg/027-kitty-23.svg" />
            </div>
            <div class="memory-card" data-name="${item.imageName}">
                <img class="font-face" src="${path + item.imageName + format}" />
                <img class="back-face" src="./src/svg/027-kitty-23.svg" />
            </div>`
        )
    })
    memoryGame.innerHTML = content.join('');

})();

