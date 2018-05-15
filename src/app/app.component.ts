import { Component } from '@angular/core';
import { SdParser } from './Parser';
import { Board } from './Board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: Board;
  constructor(board: Board) {
    this.board = board;
  }
  title = 'Egberts Puzzle Solver';
  //inputText = '1 2 3\n4 5 6\n7 * *,<';
  /*
  inputText = 
'* * * 6,> * 1 * * *,>\n\
* *,^ 7,^ * *,< 4 2 6 3\n\
* 9 * 1 *,^ * 4,< *,>,^ 5\n\
* * *,^ 3,< 5,v 8 *,v 4,> *\n\
*,^ 5,<,v * *,V *,> *,< 8 *,^ *\n\
* *,> 4,<,^ *,> *,v,< *,> * * *\n\
*,v *,> 6,> * 4 *,< 7,^ 9 *\n\
*,^ * *,>,v 4,>,v *,> * *,> * *\n\
* *,v 8,^ *,< * *,^ * *,< *'
 
*/ 
inputText = 
'* * * 6,> * 1 * * *,>\n\
* *,^ 7,^ * *,< 4 2 6 3\n\
* 9 * 1 *,^ * 4,< *,>,^ 5\n\
* * *,^ 3,< 5,v 8 *,v 4,> *\n\
*,^ 5,<,v * *,V *,> *,< 8 *,^ *\n\
* *,> 4,<,^ *,> *,v,< *,> * * *\n\
*,v *,> 6,> * 4 *,< 7,^ 9 *\n\
*,^ * *,>,v 4,>,v *,> * *,> * *\n\
* *,v 8,^ *,< * *,^ * *,< *'
// inputText =
// '1 2 3\n\
// * * *\n\
// 3 1 2';

ngAfterViewInit() {
  this.LoadPuzzle();
}
  LoadPuzzle() {
    this.board.Clear();
    const parser = new SdParser();
    parser.Parse(this.inputText, this.board);
    console.log('Loaded board as string:');
    console.log(this.board.ToString());
    console.log(this.board.ConstraintsToString());    
    const isResolved = this.board.Resolve();
    console.log('board is ' + (isResolved ? '' : 'NOT ') + 'resolved');
    console.log(this.board.PrettyPrint());
  }

}
