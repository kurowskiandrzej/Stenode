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
        console.log(this.lineLength)

        let newLine: string = ''
        for (const i in words) {
            if (newLine.length + words[i].length <= this.lineLength) {
                newLine += words[i] + ' '
                console.log(words[i])
            } else {
                lines.push(newLine)
                newLine = words[i] + ' '
                console.log('works')
            }
        }

        if (newLine.length > 0) lines.push(newLine)
        lines[lines.length - 1] = lines[lines.length - 1].trimEnd()

        return lines
    }
}