class TicTacToe {
    constructor() {
        this.board = [
            [ [], [], [] ],
            [ [], [], [] ],
            [ [], [], [] ],
        ];
        this.winsPossible = [
            //row
            parseInt('000000111', 2),
            parseInt('000111000', 2),
            parseInt('111000000', 2),
            //column
            parseInt('100100100', 2),
            parseInt('010010010', 2),
            parseInt('001001001', 2),
            //diagonal
            parseInt('100010001', 2),
            parseInt('001010100', 2)
        ];
        this.isInProgress = false;
        this.round = 0;
        this.currentPlayer = {
            id: null,
            moves: false,
            marker: {
                content: null,
                name: null
            },
            color: null,
        };
        this.statusElement = document.querySelector('.status');
        this.fillBoard();
    }

    setup() {
        this.isInProgress = true;
        this.setPLayerOneConfigs();
        this.changeStatus(`Jogador ${this.currentPlayer.id}`);
    }

    fillBoard() {
        for (let line = 0; line < 3; line++) {
            for (let column = 0; column < 3; column++) {
                const square = document.querySelector(`#square-${column}-${line}`);
                this.board[line][column] = square;
                square.line = line;
                square.column = column;
            }
        }
    }

    setPLayerOneConfigs() {
        this.currentPlayer.marker.content = 'X';
        this.currentPlayer.color = '#0db7bd';
        this.currentPlayer.marker.name = 'marker-x'
        this.currentPlayer.id = 1;
    }

    setPlayerTwoConfigs() {
        this.currentPlayer.marker.content = 'O';
        this.currentPlayer.color = '#c93964';
        this.currentPlayer.marker.name = 'marker-circle'
        this.currentPlayer.id = 2;
    }

    choosePlayer() {
        if (this.currentPlayer.id === 1) {
            this.setPlayerTwoConfigs();
            return;
        }

        this.setPLayerOneConfigs();
    }

    isFinished(playerPossible) {
        const binaryPossible = parseInt(playerPossible, 2)
        return this.isWinner(binaryPossible);
    }

    isWinner(possible) {
        const index = this.winsPossible.indexOf(possible);
        return index > -1;
    }

    changeStatus(text) {
        this.statusElement.style.color = this.currentPlayer.color;
        this.statusElement.innerHTML = text;
    }

    getPlayerPossible() {
        let possible = '';

        this.board.forEach(element => {
            element.forEach(component => {
                if (component.childNodes.length > 0 && component.childNodes[0].innerHTML.trim() == this.currentPlayer.marker.content.trim()) {
                   possible = possible.concat('1');
                } else {
                  possible = possible.concat('0');
                }
            });
        });

       return possible;
    }

    updateBoard(element) {
        element.innerHTML = `<span id="${this.currentPlayer.marker.name}" class="marker"> ${this.currentPlayer.marker.content} </span>`;
        element.isMarked = true;
        element.player = this.currentPlayer.id;
    }

    move(element) {
        if (!this.isInProgress) {
            this.changeStatus('O jogo terminou, por favor reset para jogar de novo');
            return;
        }

        if (element.isMarked) {
            this.changeStatus('Campo invalido tente um vazio');
            return;
        }

        this.updateBoard(element);

        const playerPossible = this.getPlayerPossible();
        const isFinished = this.isFinished(playerPossible);
        
        if (isFinished) {
            this.changeStatus(`Jogador ${this.currentPlayer.id} ganhou o jogo`);
            this.isInProgress = false;
            return;
        }

        this.choosePlayer();
        this.changeStatus(`Jogador ${this.currentPlayer.id}`);
    }
}
