import { Component, Input } from '@angular/core';
import { SdParser } from '../Parser';
import { Board } from '../Board';

@Component({
  selector: 'sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {
  // 
  @Input() applySudokuRules: boolean;
  board: Board;
  ngOnInit() {
    this.board = new Board();
    if (this.applySudokuRules) {
      this.inputText = this.inputTextSudoku;
      this.LoadPuzzle();
    }}
  inputText =
'\
* * * 6,> * 1 * * *,>\n\
* *,^ 7,^ * *,< 4 2 6 3\n\
* 9 * 1 *,^ * 4,< *,>,^ 5\n\
* * *,^ 3,< 5,v 8 *,v 4,> *\n\
*,^ 5,<,v * *,V *,> *,< 8 *,^ *\n\
* *,> 4,<,^ *,> *,v,< *,> * * *\n\
*,v *,> 6,> * 4 *,< 7,^ 9 *\n\
*,^ * *,>,v 4,>,v *,> * *,> * *\n\
* *,v 8,^ *,< * *,^ * *,< *'
inputTextSudoku =
'\
* * 4 * * * 1 * *\n\
* 8 * 6 * 7 * 5 *\n\
1 * * * 3 * * * 8\n\
* 1 * 9 * 8 * 4 *\n\
* * 8 * * * 6 * *\n\
* 2 * 1 * 5 * 7 *\n\
2 * * * 9 * * * 5\n\
* 5 * 4 * 6 * 8 *\n\
* * 1 * * * 9 * *'
            

  LoadPuzzle() {
    this.board.Clear();
    const parser = new SdParser();
    parser.Parse(this.inputText, this.board, this.applySudokuRules);
    console.log('Loaded board as string:');
    console.log(this.board.ToString());
    console.log(this.board.ConstraintsToString());    
    const isResolved = this.board.Resolve();
    console.log('board is ' + (isResolved ? '' : 'NOT ') + 'resolved');
    console.log(this.board.PrettyPrint());
  }
}
