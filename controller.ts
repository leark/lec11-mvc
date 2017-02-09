import {Model} from './model';
import {View} from './view';

//for CLI interactiv
const readline = require('readline');
const io = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout
});

export class Controller {
  constructor(private game:Model, private view:View){}

  //starts the game
  play() {
    this.view.printBoard();
    this.takeTurn();    
  }

  takeTurn() {
    this.view.printPrompt();
    io.question('> ', (input) => {
      try {
        let cell = input.split(',');
        //make a move!
        let result = this.game.makeMove(Number(cell[0]),Number(cell[1]));
        if(result){ //legal move
          this.view.printBoard();
          if(this.game.getWinner() !== undefined){
            this.view.printWinner(this.game.getWinner());
            io.close();
            return; //end
          }
        }
      } catch(e) {} //for parsing errors

      this.takeTurn(); //recurse!
    })
  }  
}
