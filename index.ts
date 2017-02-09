import {Model} from './model';
import {View} from './view';
import {Controller} from './controller';

let game:Model = new Model();
let view:View = new View(game);
let ctrl:Controller = new Controller(game, view);

console.log("starting game...");
ctrl.play();
