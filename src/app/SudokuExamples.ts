import { Component, Injectable, ViewChildren, QueryList, Input } from '@angular/core';

@Injectable()
export class SudokuExamples {
    //http://elmo.sbs.arizona.edu/sandiway/sudoku/examples.html
    simple: 
'\
1 * * 4 8 9 * * 6\n\
7 3 * * * * * * *\n\
* * * * * * * * *\n\
* * * * * 1 2 9 5\n\
* * 7 1 2 * 6 * *\n\
5 * * 7 * 3 * * 8\n\
* * 6 * 7 9 5 * *\n\
9 1 4 6 * * * * *\n\
* 2 * * * * * 3 7\n\
8 * * 5 1 2 * * 4\n\
';
  intermediate:
'\
* 2 * 6 * 8 * * *\n\
5 8 * * * 9 7 * *\n\
* * * * 4 * * * *\n\
3 7 * * * * 5 * *\n\
6 * * * * * * * 4\n\
* * 8 * * * * 1 3\n\
* * * * 2 * * * *\n\
* * 9 8 * * * 3 6\n\
* * * 3 * 6 * 9 *\n\
';

  difficult:
'\
* * * 6 * * 4 * *\n\
7 * * * * 3 6 * *\n\
* * * * 9 1 * 8 *\n\
* * * * * * * * *\n\
* 5 1 8 * * * * 3\n\
* * * 3 * 6 * 4 5\n\
* 4 * 2 * * * 6 *\n\
9 * 3 * * * * * *\n\
* 2 * * * * 1 * *\n\
';

  not_fun:
'\
* 2 * * * * * * *\n\
* * * 6 * * * * 3\n\
* 4 7 * 8 * * * *\n\
* * * * * 3 * * 2\n\
* 8 * * 4 * * 1 *\n\
6 * * 5 * * * * *\n\
* * * * 1 * 7 8 *\n\
5 * * * * 9 * * *\n\
* * * * * * * 4 *\n\
';
}