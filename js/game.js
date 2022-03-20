/* eslint-disable no-undef */
const game = new TicTacToe();

document.querySelectorAll(".square").forEach((element) => {
    element.addEventListener("click", function () {
        game.move(this);
    });
});

game.setup();
