import { Board } from "./Board";
import { Cell, Position } from "./Cell";
import { UniqueConstraint, GreaterThanConstraint } from "./Constraint";

export class SdParser {
    lineSeparator = '\n';
    cellSeparator = ' ';
    itemSeparator = ',';
    parsed: string;
    board: Board;
    nrRows = 0;
    Parse(sdText: string, board:Board, sudoku:boolean) {
        this.parsed = '';
        this.board = board;
        const lines = sdText.split(this.lineSeparator);
        this.nrRows = lines.length;
        let lineNumber = 0;
        lines.forEach(line => {
            this.ParseLine(line, lineNumber);
            lineNumber++;
            this.parsed += '\n';
        });
        console.log(this.parsed);
        if (sudoku) {
            //drop existing constraints
            this.board.constraints = [];
            this.board.CreateBlockConstraints(3, 3);
        }
        this.board.CreateLineConstraints();
        if (sudoku) {
        }
        return this.board;
    }

    ParseLine(sdLine: string, row: number) {
        const items = sdLine.split(this.cellSeparator);
        let column = 0;
        items.forEach(item => {
            const cell = this.ParseCell(item, [column, row]);
            column++;
            this.parsed += ';';
        });
    }

    ParseCell(sdItem: string, position: number[]) {
        const elements = sdItem.split(this.itemSeparator);
        const numberStr = elements.shift();
        this.parsed += 'number:' + numberStr;
        const qualifiers = elements;
        // let value: number[];
        // if (numberStr === '*') {
        //     value = [];
        //     for (let i = 1; i <= this.nrRows; i++) {
        //         value.push(i);
        //     }
        // } else {
        //     value = [Number(numberStr)];
        // }
        const cell = new Cell(position);
        cell.ApplyInput(numberStr, this.nrRows);
        this.board.AddCell(cell);

        if (qualifiers.length > 0) {
            this.parsed += '&qualifiers:' + qualifiers;
        }
        qualifiers.forEach(qualifier => {
            const constraint = GreaterThanConstraint.CreateConstraint(cell, this.board, qualifier);
            this.board.AddConstraint(constraint);
        });
        return cell;
    }
}
