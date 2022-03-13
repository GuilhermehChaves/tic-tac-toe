class TicTacToe {
    constructor() {
        console.log("constructing");
        this.board = [
            [ [], [], [] ],
            [ [], [], [] ],
            [ [], [], [] ],
        ];
        this.isInProgress = false;
        this.round = 0;
        this.currentPlayer = {
            id: undefined,
            moves: false,
            marker: {
                content: '',
                name: ''
            },
        };
        this.fillBoard();
        console.log(this.board)
    }

    setup() {
        this.isInProgress = true;
        this.currentPlayer.id = 1;
        this.currentPlayer.marker.content = 'X';
        this.currentPlayer.marker.name = "marker-x"
        console.log(`Player ${this.currentPlayer.id} is your time`);
    }

    fillBoard() {
        for(let line = 0; line < 3; line++) {
            for(let column = 0; column < 3; column++) {
                const square = document.querySelector(`#square-${column}-${line}`);
                this.board[line][column] = square;
                square.line = line;
                square.column = column;
            }
        }
    }

    choosePlayer() {
        if (this.currentPlayer.id === 1) {
            this.currentPlayer.marker.content = 'O';
            this.currentPlayer.marker.name = 'marker-circle'
            this.currentPlayer.id++;
            return;
        }

        this.currentPlayer.marker.content = 'X';
        this.currentPlayer.marker.name = 'marker-x'
        this.currentPlayer.id--;
    }

    isFinished() {
        //Diagonals
        let primaryDiagonal = 0;
        let secodaryDiagonal = 0;

        for (let i = 0; i < 3; i++) {
            primaryDiagonal += this.board[i][i].player;
            secodaryDiagonal += this.board[2 - i][i].player;
        }

        if (primaryDiagonal == 3) {
            alert("Player 1 won the game!");
            this.isInProgress = false;
            return;
        }

        if (primaryDiagonal == 6) {
            alert("Player 2 won the game!");
            this.isInProgress = false;
            return;
        }

        if (secodaryDiagonal == 3) {
            alert("Player 1 won the game!");
            this.isInProgress = false;
            return;
        }

        if (secodaryDiagonal == 6) {
            alert("Player 2 won the game!");
            this.isInProgress = false;
            return;
        }

        //Lines
        let firstLine = 0;
        let secondLine = 0;
        let thirtyLine = 0;
    }

    move(element) {
        if (!this.isInProgress) {
            console.log("O jogo terminou, por favor reset para jogar de novo");
            return;
        }

        if (element.isMarked) {
            console.log("Campo invalido tente um vazio");
            return;
        }

        element.innerHTML = `<span id="${this.currentPlayer.marker.name}" class="marker"> ${this.currentPlayer.marker.content} </span>`;
        element.isMarked = true;
        element.player = this.currentPlayer.id;
        
        this.choosePlayer();
        console.log(`Player ${this.currentPlayer.id} is your time`);
        this.isFinished();
    }
}
