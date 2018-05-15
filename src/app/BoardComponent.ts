import { Component, Injectable, ViewChildren, QueryList } from '@angular/core';
import { Board } from './Board'
import { Cell } from './Cell'
import { CellComponent } from './CellComponent'
import { MatGridListModule } from '@angular/material/grid-list'

@Component({
    selector: 'board',
    templateUrl: './BoardComponent.html',
    styleUrls: ['./BoardComponent.css']
  })

@Injectable({
// we declare that this service should be created
// by any injector that includes HeroModule.

providedIn: Board,
})

export class BoardComponent {
    @ViewChildren(CellComponent) viewCells: QueryList<CellComponent>;

    cellComponents = [1,2];
    board: Board;
    boardDimensions = new Object({x: 1, y: 1});
    constructor(board: Board) {
        this.board = board;
        //this.boardDimensions[x] = this.boardDimensions[y] = board.Dimension();
        // this.board.cellsChanged.subscribe(cell => {
        //     //this.cells.push(cell);
        //     this.cells = board.cells;
        //    });
    }
}