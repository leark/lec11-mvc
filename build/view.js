"use strict";
var View = (function () {
    function View(game) {
        this.game = game;
        this.playerSymbols = [' ', 'X', 'O']; //for display
    }
    View.prototype.printBoard = function () {
        //print the board
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
    View.prototype.printPrompt = function () {
        var player = this.playerSymbols[this.game.getCurrentPlayer() + 1];
        console.log(player + "'s turn. Pick a spot [row, col]");
    };
    View.prototype.printWinner = function (winner) {
        var player = this.playerSymbols[winner + 1];
        console.log(player + " is the winner!");
    };
    return View;
}());
exports.View = View;
