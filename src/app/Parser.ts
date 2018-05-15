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
    nrColumns = 0;
    Parse(sdText: string, board:Board) {
        this.parsed = '';
        this.board = board;
        const lines = sdText.split(this.lineSeparator);
        let lineNumber = 0;
        this.nrColumns = lines[0].split(this.cellSeparator).length;
        this.nrRows = lines.length;
        lines.forEach(line => {
            this.ParseLine(line, lineNumber);
            lineNumber++;
            this.parsed += '\n';
        });
        console.log(this.parsed);
        this.board.CreateLineConstraints(this.nrRows, this.nrColumns);
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
