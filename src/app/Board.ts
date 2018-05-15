import { equal } from "assert";
import { Injectable } from '@angular/core';
import { Cell, Position } from './Cell';
import { Constraint, UniqueConstraint, GreaterThanConstraint } from './Constraint';

@Injectable()
export class Board {
    cells: Array<Cell>;
    cellsDict: Object;
    constraints: Array<Constraint>;
    constructor() {
        this.Clear();
    }

    Clear() {
        this.cells = new Array<Cell>();
        this.cellsDict = new Object;
        this.constraints = new Array<Constraint>();
    }

    Clone(): Board {
        let clone = new Board();
        this.cells.forEach(c => clone.AddCell(c.Clone()));
        this.constraints.forEach(c => clone.AddConstraint(c.Clone(clone)));
        return clone;
    }

    Assign(b: Board) {
        this.cells.forEach(c => {
            // take the position of each cell of the other board.
            // Assumes dup board.
            let bc = b.CellAt(c.Position());
            c.values = bc.values.slice(0);
        })
    }

    Dimension(): number {
        return Math.sqrt(this.cells.length);
    }

    AddCell(cell: Cell) {
        this.cells.push(cell);
        this.cellsDict[cell.Id()] = cell;
    }

    CellAt(position: Position): Cell {
        const id = position.ToString();
        return this.cellsDict[id]; 
    }

    AddConstraint(constraint: Constraint) {
        this.constraints.push(constraint);
    }

    CreateLineConstraints(rows: number, columns: number) {
        for (let r = 0; r < columns; r++) {
            let columnConstraint = new UniqueConstraint();
            for (let c = 0; c < rows; c++) {
                columnConstraint.AddCell(this.CellAt(new Position([c, r])))
            }
            this.AddConstraint(columnConstraint);
        }
        for (let c = 0; c < rows; c++) {
            let rowConstraint = new UniqueConstraint();
            for (let r = 0; r < columns; r++) {
                rowConstraint.AddCell(this.CellAt(new Position([c, r])))
            }
            this.AddConstraint(rowConstraint);
        }    
    }

    Resolve(): boolean {
        try {
            let progress = true;
            while (progress) {
                progress = false;
                this.constraints.forEach(c => { progress = c.Evaluate() || progress; });
                let consistent = true;
                this.constraints.forEach(c => consistent = c.CheckConsistency() && consistent);
                if (!consistent) {
                    console.log('ERROR: inconsistency found');
                    break;
                }
            }
            if (!this.Resolved()) {
                this.ResolveBacktrack();
            }
        } finally {}
        return this.Resolved();
    }

    ResolveBacktrack(): boolean {
        if (!this.Resolved()) {
            let backtrackUnresolved = true;
            let unresolvedCells = this.cells.filter(c => !c.IsResolved());
            for (let c = 0; c < unresolvedCells.length && backtrackUnresolved; c++) {
                let cell = unresolvedCells[c];
                for (let i = 0; i < cell.values.length && backtrackUnresolved; i++) {
                    let boardClone = this.Clone();
                    let tryCell = boardClone.CellAt(cell.Position());
                    tryCell.ExcludeNumber(cell.values[i]);
                    console.log('Start a backtrack board by eliminating value ' + cell.values[i] + ' from position ' + cell.Position().ToString());
                    try {
                      if (boardClone.Resolve()) {
                          // found a solution!
                        backtrackUnresolved = false;
                        this.Assign(boardClone);
                      }
                    } catch {} finally { }
                }
            }

        }
        return this.Resolved();
    }

    Resolved(): boolean {
        return this.cells.reduce((b, c) => b && c.IsResolved(), true);
    }

    ToString() {
        let asString = '';
        this.cells.forEach(cell => { asString += cell.ToString(); asString += '\n'; });
        return asString;
    }

    PrettyPrint() {
        let pp = '';
        let rows = Math.sqrt(this.cells.length);
        let longestUnresolved = this.cells.reduce((l, c) => l = Math.max(l, c.values.length), 0);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < rows; c++) {
                pp += '[';
                let cell = this.CellAt(new Position([c,r]));
                for (let lur = 0; lur < longestUnresolved; lur++) {
                    pp += (lur < cell.values.length) ? cell.values[lur] + ',' : '  ';
                }
                pp += '] ';
            }
            pp += '\n';
        }
        return pp;
    }

    ConstraintsToString() {
        let str = '';
        this.constraints.forEach(c => str += c.ToString() + '\n');
        return str;
    }
}



