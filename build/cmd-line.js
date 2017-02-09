"use strict";
var Model_1 = require("./Model");
//for CLI interactiv
var readline = require('readline');
var io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Controller = (function () {
    function Controller(game, view) {
        this.game = game;
        this.view = view;
    }
    Controller.prototype.start = function () {
        this.view.display();
        this.takeTurn();
    };
    Controller.prototype.takeTurn = function () {
        var _this = this;
        this.view.showPrompt();
        io.question('> ', function (input) {
            try {
                var cell = input.split(',');
                //make a move!
                var result = game.makeMove(Number(cell[0]), Number(cell[1]));
                if (result) {
                    _this.view.display();
                    if (game.getWinner() !== undefined) {
                        _this.view.showWinner(game.getWinner());
                        io.close();
                        return; //end
                    }
                }
            }
            catch (e) { } //for parsing errors
            _this.takeTurn(); //recurse!
        });
    };
    return Controller;
}());
var View = (function () {
    function View(game) {
        this.game = game;
        this.playerSymbols = [' ', 'X', 'O'];
    }
    //draw the game board
    View.prototype.display = function () {
        console.log("    0   1   2");
        for (var i = 0; i < this.game.size; i++) {
            var row = i + "   ";
            for (var j = 0; j < this.game.size; j++) {
                var player = this.game.getPiece(i, j);
                if (player === undefined)
                    player = -1;
                row += this.playerSymbols[player + 1];
                if (j < this.game.size - 1)
                    row += " | ";
            }
            console.log(row);
            if (i < this.game.size - 1)
                console.log("   -----------");
        }
        console.log("");
    };
    View.prototype.showPrompt = function () {
        var player = this.playerSymbols[game.getCurrentPlayer() + 1];
        console.log(player + "'s turn. Pick a spot [row, col]");
    };
    View.prototype.showWinner = function (winner) {
        var player = this.playerSymbols[winner + 1];
        console.log(player + " is the winner!");
    };
    return View;
}());
//run the program!
var game = new Model_1.TTTGame();
var view = new View(game);
var ctrl = new Controller(game, view);
ctrl.start();
