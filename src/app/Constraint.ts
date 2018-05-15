import {Cell, Position} from './Cell'
import {Board} from './Board'

export class Constraint {
    label: string = "";
    cells = new Array<Cell>();
    AddCell(cell: Cell) {
        this.cells.push(cell);
    }
    Cells(): Cell[] {
        return this.cells;
    }
    Evaluate(): boolean {
        return false;
    }
    ToString(): string {
        return '';
    }
    CheckConsistency(): boolean {
        return true;
    }
    Clone(board: Board) {
        let original = this;
        let clone = new (<any>this.constructor);
        original.cells.forEach(c => {
            const boardCell = board.CellAt(c.position);
            clone.AddCell(boardCell);
        });
        return clone;
    }
}

export class UniqueConstraint extends Constraint {
    Evaluate() {
        let effect = false;
        effect = this.RemoveResolves() || effect;
        effect = this.RemoveMultiResolves() || effect;
        effect = this.IdentifyUnique() || effect;
        return effect;
    }

    RemoveResolves(): boolean {
        let effect = false;
        const resolvedCells = this.cells.filter(c => c.IsResolved());
        resolvedCells.forEach(resolved => {
            this.cells.forEach(c => { 
                if (c !== resolved) {
                    const newEffect = c.ExcludeNumber(resolved.ResolvedNumber());
                    if (newEffect) {
                        console.log('Remove value ' + resolved.ResolvedNumber() + ' from cell '+ c.position.ToString() + ' because of ' + resolved.position.ToString() + ' remaining values: ' + c.ValuesToString() + ' from constraint ' + this.ToString());
                        effect = true;
                    }
                }
            });
        });
        return effect;
    }

    RemoveMultiResolves() {
        let effect = false;
        this.cells.forEach(cell => {
            if (!cell.IsResolved()) {
                const identicalCells = this.cells.filter(c => c.EqualValues(cell));
                if (identicalCells.length == cell.values.length) {
                    // found multi-resolves
                    const otherCells = this.cells.filter(c => !c.EqualValues(cell));
                    let newEffect = false;
                    otherCells.forEach(c => newEffect = c.ExcludeNumbers(cell.values) || newEffect);
                    if (newEffect) {
                        console.log('Multi constraint from cell ' + cell.position.ToString() + ' with values ' + cell.values + ' from constraint ' + this.ToString());
                        effect = true;
                    }
                }
            }
        });
        return effect;
    }

    IdentifyUnique(): boolean {
        let effect = false;
        for (let val = 1; val <= this.cells.length; val++) {
            var containsValCells = this.cells.filter(c => c.HasValue(val));
            if (containsValCells.length == 1) {
                const uniqueCell = containsValCells[0];
                const newEffect = uniqueCell.ExcludeAllBut(val);
                if (newEffect) {
                    effect = true;
                    console.log('Apply unique on cell ' + uniqueCell.position.ToString() + ' with value ' + val + ' from constraint ' + this.ToString());
                }
            }
        }
        return effect;
    }

    CheckConsistency(): boolean {
        let consistent = true;
        let val = 1;
        for (val = 1; val <= this.cells.length && consistent; val++) {
            var hasNumber = false;
            consistent = this.cells.findIndex(c => c.HasValue(val)) >= 0;
        }
        return consistent;
    }
    

    ToString() {
        let cells = '';
        this.cells.forEach(c => cells += c.position.ToString()+ '; ');
        return ('Unique constraint on cells ' + cells);
    }
}

export class GreaterThanConstraint extends Constraint {
    constructor(cellGt: Cell, cellLt: Cell) {
        super();
        if (cellGt) {
            this.AddCell(cellGt);
        }
        if (cellLt) {
            this.AddCell(cellLt);
        }
    }

    CellGt() {
        return this.cells[0];
    }

    CellLt() {
        return this.cells[1];
    }

    Evaluate() {
    //    return false;
        let effect = false;
        const minVal = this.CellLt().Min();
        const ltEffect = this.CellGt().ExcludeLessEqThen(minVal);
        if (ltEffect) {
            console.log('Apply LE on cell ' + this.CellGt().Position().ToString() + ' from cell ' + this.CellLt().position.ToString() + ' with > ' + minVal + ' remaining values: ' + this.CellGt().ValuesToString());
            effect = true;
        } 
        const maxVal = this.CellGt().Max();
        const gtEffect = this.CellLt().ExcludeGreaterEqThen(maxVal);
        if (gtEffect) {
            console.log('Apply GE on cell ' + this.CellLt().Position().ToString() + ' from cell ' + this.CellGt().position.ToString() + ' with < ' + maxVal + ' remaining values: ' + this.CellLt().ValuesToString());
            effect = true;
        }
        return effect;
    }

    static CreateConstraint(cell: Cell, board: Board, comparer: string) {
        let otherCellPosition: Position = null;
        let isGT = false;
        switch (comparer) {
            case '>':
                isGT = true;
            case '<':
                otherCellPosition = cell.Position().ToLeftPosition();
                break;
            case '^':
                isGT = true;
            case 'v':
            case 'V':
                otherCellPosition = cell.Position().ToAbovePosition();
                break;
        }
        const otherCell = board.CellAt(otherCellPosition);
        return isGT ? new GreaterThanConstraint(cell, otherCell) : new GreaterThanConstraint(otherCell, cell);
    }

    ToString() {
        return ('GreaterThan constraint with lt cell ' + this.CellLt().Position().ToString() + ' and gt cell ' + this.CellGt().Position().ToString());
    }
}
