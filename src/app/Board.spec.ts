import { TestBed, async } from '@angular/core/testing';
import { Board } from "./Board";
import { Cell, Position } from "./Cell";
import { UniqueConstraint, GreaterThanConstraint } from "./Constraint";

describe('Test Cell', function() {
    it('can be constructed with a position', function() {
        let newCell = new Cell([3,7], [1,2,3]);
        expect (newCell.values[0]).toEqual(1);
        expect (newCell.position.position).toEqual([3,7]);
    });
    it('can reduce its values', function() {
        let cell = new Cell([0,0], [1,2,3,4,5]);
        expect (!cell.IsResolved());
        cell.ExcludeGreaterEqThen(5);
        expect(cell.values.length).toEqual(4);
        expect(cell.values).toEqual([1,2,3,4]);
        cell.ExcludeGreaterEqThen(7);
        expect(cell.values).toEqual([1,2,3,4]);
        
        cell.ExcludeLessEqThen(1);
        expect(cell.values.length).toEqual(3);
        expect(cell.values).toEqual([2,3,4]);
        cell.ExcludeLessEqThen(1);
        expect(cell.values).toEqual([2,3,4]);

        cell.ExcludeNumber(3);
        expect(cell.values).toEqual([2,4]);
            
        cell.ExcludeNumber(3);
        expect(cell.values).toEqual([2,4]);

        cell.ExcludeNumber(0);
        expect(cell.values).toEqual([2,4]);

        expect (!cell.IsResolved());
        cell.ExcludeNumber(2);
        expect(cell.values).toEqual([4]);
        expect (cell.IsResolved()).toBeTruthy();
        expect (cell.ResolvedNumber()).toEqual(4);

        cell = new Cell([0,0], [1,2,3,4,5]);
        cell.ExcludeNumbers([1,3,5,7]);
        expect(cell.values).toEqual([2,4]);
        let otherCell = new Cell([1,1], [2,4]);
        expect(cell.EqualValues(otherCell)).toBeTruthy();
        otherCell.ExcludeNumber(2);
        expect(cell.EqualValues(otherCell)).toBeFalsy();

        cell = new Cell([0,0], [1,2,3,4,5]);
        expect(cell.HasValue(1)).toBeTruthy();
        expect(cell.HasValue(99)).toBeFalsy();
        cell.ExcludeAllBut(1);
        expect(cell.values).toEqual([1]);
    });

    describe('test unique constraint', function() {
        it('detects unique positions', function() {
            let cell1 = new Cell([0,0], [1,2,3]);
            let cell2 = new Cell([1,0], [2,3]);
            let cell3 = new Cell([2,0], [2,3]);
            let uConstraint = new UniqueConstraint();
            uConstraint.AddCell(cell1);
            uConstraint.AddCell(cell2);
            uConstraint.AddCell(cell3);
            let foundUnique = uConstraint.IdentifyUnique();
            expect(foundUnique).toBeTruthy();
            expect(cell1.IsResolved()).toBeTruthy();
            expect(cell1.ResolvedNumber()).toEqual(1);
            
            foundUnique = uConstraint.IdentifyUnique();
            expect(foundUnique).toBeFalsy();
        });
    });

    describe('test GT constraint', function () {
        it('applies GT constraint', function () {
            let ltCell = new Cell([0, 0], [2]);
            let gtCell = new Cell([1, 0], [1, 2, 3]);
            let gtConstraint = new GreaterThanConstraint(gtCell, ltCell);
            let applied = gtConstraint.Evaluate();
            expect(applied).toBeTruthy();
            expect(gtCell.values.length).toEqual(1);
            expect(gtCell.ResolvedNumber()).toEqual(3);
        });
    });

    describe('test Boards can be cloned', function() {
        it('can clone a board', function() {
            let cell1 = new Cell([0, 0], [1,2]);
            let cell2 = new Cell([0, 1], [3,4]);
            let board = new Board();
            board.AddCell(cell2);
            board.AddCell(cell1);
            let gtConstraint = new GreaterThanConstraint(cell1, cell2);
            board.AddConstraint(gtConstraint);
            let uniqueConstraint = new UniqueConstraint();
            uniqueConstraint.AddCell(cell1);
            uniqueConstraint.AddCell(cell2);
            expect(board.Resolved()).toBeFalsy();

            let boardClone = board.Clone();
            cell1.ExcludeNumber(1);
            cell2.ExcludeNumber(4);
            expect(board.Resolved()).toBeTruthy();
            expect(boardClone.Resolved()).toBeFalsy();

            boardClone.constraints.forEach(c => expect(c.Evaluate()).toBeFalsy()); // all constraints already applied
        })
    })

});