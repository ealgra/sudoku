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
    backgroundColor: number = 0xffffff;

    cellComponents = [1,2];
    boardDimensions = new Object({x: 1, y: 1});


    GetNextColor(): string {
        this.backgroundColor = this.backgroundColor - 0x050505;
        if (this.backgroundColor < 0x1f1f1f) {
            this.backgroundColor = 0xffffff;
        }
        return '#' + this.backgroundColor.toString(16);
    }

    ngAfterViewChecked() {
        let cellViews = this.viewCells.toArray();
        let colorIndex = 0;
        let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'grey', 'white', 'pink', 'purple'];
        this.board.constraints.forEach(constr => {
            if (constr.label == "block") {
                let background = colors[colorIndex % colors.length]; 
                colorIndex++;
                constr.cells.forEach(c => {
                    let viewCell = cellViews.find(vc => (vc.cell.position.Equal(c.position)));
                    viewCell.backgroundColor = background;
                })
            }
        });
    }
}