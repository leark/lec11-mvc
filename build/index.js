"use strict";
var model_1 = require("./model");
var $ = require("jquery");
var View = (function () {
    function View(game, ctrl) {
        this.game = game;
        this.ctrl = ctrl;
        this.playerSymbols = [' ', 'X', 'O'];
    }
    View.prototype.display = function () {
        var _this = this;
        console.log("displaying...");
        var gamebox = $('#game-box');
        gamebox.empty(); //clear old display
        var _loop_1 = function (i) {
            var row = $('<div>'); //a row for the button
            var _loop_2 = function (j) {
                var player = this_1.game.getPiece(i, j);
                if (player === undefined)
                    player = -1;
                var button = $('<button class="btn btn-default">' + this_1.playerSymbols[player + 1] + '</button>');
                button.click(function (e) { return _this.handleClick(i, j); }); //closure!!
                row.append(button);
            };
            for (var j = 0; j < this_1.game.size; j++) {
                _loop_2(j);
            }
            gamebox.append(row);
        };
        var this_1 = this;
        // make grid of buttons
        for (var i = 0; i < this.game.size; i++) {
            _loop_1(i);
        }
        //show winner, if any
        var winner = game.getWinner();
        if (winner !== undefined) {
            this.showWinner(winner);
            $('button').attr('disabled', 'disabled'); //disable all the buttons
        }
        else {
            this.showPrompt(); //show prompt for next move
        }
    };
    //callback for clicking
    View.prototype.handleClick = function (row, col) {
        this.ctrl.takeTurn(row, col); //tell controller what to do
    };
    View.prototype.showPrompt = function () {
        var player = this.playerSymbols[game.getCurrentPlayer() + 1];
        $('#message').html('<p class="lead">' + player + "'s turn. Pick a spot!" + '</p>');
    };
    View.prototype.showWinner = function (winner) {
        var player = this.playerSymbols[winner + 1];
        $('#message').html('<p class="lead">' + player + " is the winner!" + '</p>');
    };
    //observer
    View.prototype.notify = function () {
        this.display();
    };
    return View;
}());
var Controller = (function () {
    function Controller(game) {
        this.game = game;
        this.view = new View(game, this);
        this.game.register(this.view); //connect game and view
        this.view.display(); //show the initial view
    }
    //when told what to do, pass it along to the game
    Controller.prototype.takeTurn = function (row, col) {
        if (this.game.getWinner() === undefined)
            this.game.makeMove(row, col);
    };
    return Controller;
}());
//run the program!
var game = new model_1.TTTGame();
// game.makeMove(0,0); //x //debugging
// game.makeMove(0,1); //o
// game.makeMove(1,0); //x
// game.makeMove(1,1); //o
// game.makeMove(2,0); //x
var ctrl = new Controller(game); //will create the View
