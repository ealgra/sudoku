import { Component, Input } from '@angular/core';

import { Cell, Position } from './Cell'

@Component({
    selector: 'board-cell',
    templateUrl: './CellComponent.html',
    styleUrls: ['./CellComponent.css']
  })

  
export class CellComponent {
    @Input() cell: Cell;
    constructor() { }
}