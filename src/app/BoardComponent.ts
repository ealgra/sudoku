import { Component, Injectable, ViewChildren, QueryList, Input } from '@angular/core';
import { Board } from './Board'
import { Cell } from './Cell'
import { CellComponent } from './CellComponent'
import { MatGridListModule } from '@angular/material/grid-list'

@Component({
    selector: 'board-component',
    templateUrl: './BoardComponent.html',
    styleUrls: ['./BoardComponent.css']
  })

export class BoardComponent {
    @Input() board: Board;
    @ViewChildren(CellComponent) viewCells: QueryList<CellComponent>;

    cellComponents = [1,2];
    boardDimensions = new Object({x: 1, y: 1});
}