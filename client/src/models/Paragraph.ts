/**
 * Class represents one paragraph of text
 * */
export class Paragraph {
    private text: string
    private readonly lineLength: number

    /**
     * @param {string} text content of paragraph
     * @param {number} lineLength number of characters in one line
     * */
    constructor(text: string, lineLength: number) {
        this.text = text
        this.lineLength = lineLength
    }

    /**
     * Generates text lines of desired length
     * */
    public getLines(): string[] {
        let lines: string[] = []
        let words: string[] = this.text.split(' ')

        let newLine: string = ''
        for (const i in words) {
            if (newLine.length + words[i].length <= this.lineLength) {
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