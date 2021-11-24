import {TextUnit} from "./TextUnit"

export class Stanza extends TextUnit{
    private readonly lines: string[]

    constructor(lines: string[]) {
        super()
        this.lines = lines
    }

    getLines(lineLength: number): string[] {
        return this.lines
    }
}