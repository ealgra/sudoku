export class Cell {
    position: Position;
    originalValue: string;
    values: number[];
    constructor(position: number[], values: number[] = []) {
        this.position = new Position(position);
        this.values = values;
    }

    ApplyInput(val: string, range: number) {
        this.originalValue = val;
        this.values = [];
        if (this.originalValue === '*') {
            for (let i = 1; i <= range; i++) {
                this.values.push(i);
            }
        } else {
            this.values = [Number(this.originalValue)];
        }
    }

    Clone() {
        return new Cell(this.position.position, this.values.slice(0));
    }

    Position() {
        return this.position;
    }

    Id() {
        return this.position.ToString();
    }

    ToString() {
        let asString = this.Id();
        asString += ' ' + this.values;
        return asString;
    }

    ValuesToString() {
        let vString = '[' + this.values.join(',') + ']';
        return vString;
    }

    Min() {
        return this.values.reduce(((a, x) => (a < x) ? a : x), Infinity);
    }

    Max() {
        return this.values.reduce(((a, x) => (a > x) ? a : x), -Infinity);
    }

    ExcludeNumber(aNumber: number): boolean {
        let reduced = false;
        const position = this.values.findIndex(x => x === aNumber);
        if (position >= 0) {
            this.values.splice(position, 1);
            reduced = true;
        }
        if (this.values.length == 0) {
            throw Error('Empty cell error');
        }
        return reduced;
    }

    ExcludeNumbers(numbers: number[]): boolean {
        let reduced = false;
        numbers.forEach(n => reduced = this.ExcludeNumber(n) || reduced);
        return reduced;
    }

    ExcludeLessEqThen(aNumber: number) {
        let reduced = false;
        const reducedList = this.values.filter(x => x > aNumber);
        if (reducedList.length < this.values.length) {
            this.values = reducedList;
            reduced = true;
        }

        if (this.values.length == 0) {
            throw Error('Empty cell error');
        }
        return reduced;
    }

    ExcludeGreaterEqThen(aNumber: number) {
        let reduced = false;
        const reducedList = this.values.filter(x => x < aNumber);
        if (reducedList.length < this.values.length) {
            this.values = reducedList;
            reduced = true;
        }
        if (this.values.length == 0) {
            throw Error('Empty cell error');
        }
        return reduced;
    }

    HasValue(aNumber: number) {
        return (this.values.findIndex(v => v == aNumber) >= 0);
    }

    ExcludeAllBut(aNumber: number): boolean {
        let reduced = false;
        if (!this.HasValue(aNumber)) {
            throw new Error('ExcludeAllBut misses this number: ' + aNumber);
        }
        if ((this.values.length !== 1) || (this.values[0] != aNumber)) { 
            this.values = [aNumber];
            reduced = true;
        }
        return reduced;
    }

    EqualValues(c: Cell): boolean {

        let equalValues = c.values.length == this.values.length;
        if (equalValues) {
            for (let i = 0; i < c.values.length && equalValues; i++) {
                equalValues = (c.values[i] == this.values[i]);
            }
        }
        return equalValues;
    }

    IsResolved(): boolean {
        return this.values.length === 1;
    }

    ResolvedNumber() {
        if (!this.IsResolved) {
            throw Error('Unexpected call to ResolvedNumber on onresolved cell');
        }
        return this.values[0];
    }
}

export class Position {
    position: number[];

    constructor(position: number[]) {
        this.position = position;
    }

    ToLeftPosition() {
        let leftPosition = this.position.slice(0);
        leftPosition[0] = this.position[0] - 1;
        return new Position(leftPosition);
    }

    ToAbovePosition() {
        let abovePosition = this.position.slice(0);
        abovePosition[1] = this.position[1] - 1;
        return new Position(abovePosition);
    }

    ToString() {
        let anId = ''
        this.position.forEach(p => { anId += p; anId += ';'; });
        return anId;
    }

    Equal(pos: Position): boolean {
        return this.ToString() == pos.ToString();
    }

}