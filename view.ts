import {Model} from './model';

export class View {
  private playerSymbols = [' ','X','O']; //for display

  constructor(private game:Model) {}

  printBoard() {
    //print the board
    console.log("    0   1   2")
    for(let i=0; i<this.game.size; i++) {
      let row = i+"   ";
      for(let j=0; j<this.game.size; j++) {

        let player = this.game.getPiece(i,j);
        if(player === undefined) player = -1;
        row += this.playerSymbols[player+1];

        if(j < this.game.size - 1) 
          row += " | ";
      }
      console.log(row);
      if(i < this.game.size -1)
        console.log("   -----------");
    }
    console.log("");
  }

  printPrompt() {
    let player = this.playerSymbols[this.game.getCurrentPlayer()+1]
    console.log(player+"'s turn. Pick a spot [row, col]");
  }

  printWinner(winner:number):void {
    let player = this.playerSymbols[winner+1]
    console.log(player+" is the winner!");
  }

}
