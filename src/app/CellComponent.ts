import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Cell, Position } from './Cell';
import { Constraint, GreaterThanConstraint } from './Constraint';

@Component({
    selector: 'board-cell',
    templateUrl: './CellComponent.html',
    styleUrls: ['./CellComponent.css']
  })

  
export class CellComponent {
    @Input() cell: Cell;
    @Input() constraints: Array<Constraint>;
    backgroundColor: string = '#FFFFFF';
    constructor() { }

    GtConstraints(): Array<GreaterThanConstraint> {
        return this.constraints.filter(c => c instanceof GreaterThanConstraint) as Array<GreaterThanConstraint>;
    }

    ConstraintWithPosition(pos: Position): GreaterThanConstraint {
        let constraintsForPos = 
            this.GtConstraints().filter(gtc => 
                gtc.cells.find(c => c.Position().Equal(pos))
            );
        return (constraintsForPos.shift());
    }

    LeftConstraint() : string {
        let constraint = ' ';
        let leftCellPosition = this.cell.position.ToLeftPosition();
        let leftConstraint = this.ConstraintWithPosition(leftCellPosition);
        if (leftConstraint) {
            if (leftConstraint.CellGt() == this.cell) {
                constraint = '<';
            } else {
                constraint = '>';
            }
        }
        return constraint;
    }
    UpConstraint() : string {
        let constraint = ' ';
        let aboveCellPosition = this.cell.position.ToAbovePosition();
        let upConstraint = this.ConstraintWithPosition(aboveCellPosition);
        if (upConstraint) {
            if (upConstraint.CellGt() == this.cell) {
                constraint = '^';
            } else {
                constraint = 'v';
            }
        }
        return constraint;
    }
}