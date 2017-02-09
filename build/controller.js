"use strict";
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
    //starts the game
    Controller.prototype.play = function () {
        this.view.printBoard();
        this.takeTurn();
    };
    Controller.prototype.takeTurn = function () {
        var _this = this;
        this.view.printPrompt();
        io.question('> ', function (input) {
            try {
                var cell = input.split(',');
                //make a move!
                var result = _this.game.makeMove(Number(cell[0]), Number(cell[1]));
                if (result) {
                    _this.view.printBoard();
                    if (_this.game.getWinner() !== undefined) {
                        _this.view.printWinner(_this.game.getWinner());
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
exports.Controller = Controller;
