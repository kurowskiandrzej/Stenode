import {TextUnit} from "./TextUnit"

/**
 * Class represents one paragraph of text
 * */
export class Paragraph extends TextUnit{
    private text: string

    /**
     * @param {string} text content of paragraph
     * */
    constructor(text: string) {
        super()
        this.text = text
    }

    /**
     * Generates text lines of desired length
     * */
    public getLines(lineLength:number): string[] {
        let lines: string[] = []
        let words: string[] = this.text.split(' ')

        let newLine: string = ''
        for (const i in words) {
            if (newLine.length + words[i].length <= lineLength) {
                newLine += words[i] + ' '
            } else {
                lines.push(newLine)
                newLine = words[i] + ' '
            }
        }

        newLine.trimEnd()
        if (newLine.length > 0) lines.push(newLine)

        return lines
    }
}