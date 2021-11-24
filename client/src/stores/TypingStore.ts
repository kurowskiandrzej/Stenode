import {writable} from 'svelte/store'
import type {Paragraph} from "../models/Paragraph"

class LineManager {
    static isInitialized: boolean = false
    static lines: string[] = []
    static displayedLines: string[] = []
    static userLines: string[] = []
    static userInputOnCurrentLine: string = ''
    static currentLineIndex: number = 0

    static getDisplayedLineBYIndex(index: number): string {
        return this.displayedLines[index]
    }

    static goToNextLine() {
        if (this.displayedLines.length !== 0) {
            if (this.currentLineIndex === this.displayedLines.length - 1) this.currentLineIndex = 0
            else this.currentLineIndex++

            this.userLines.push(this.userInputOnCurrentLine)
            console.log(this.userLines)
        }
    }

    static goToPreviousLine(resetUserInputToPreviousLine: (line: string) => void | null) {
        if (this.userLines.length < 1) return
        if (this.displayedLines.length !== 0) {
            if (this.currentLineIndex > 0) this.currentLineIndex--
            else this.currentLineIndex = this.displayedLines.length - 1
        }

        if (this.userInputOnCurrentLine.length === 0 && this.userLines.length > 0) {
            console.log('pre pop' + this.userInputOnCurrentLine)
            // @ts-ignore
            this.userInputOnCurrentLine = this.userLines.pop()
            if (resetUserInputToPreviousLine !== null) resetUserInputToPreviousLine(this.userInputOnCurrentLine)
            console.log('after pop' + this.userInputOnCurrentLine)
        }
    }

    static updateUserInput(input: string, clearUserInput: () => void) {
        this.userInputOnCurrentLine = input
        if (input.length > this.displayedLines[this.currentLineIndex].length - 1) {
            this.goToNextLine()
            this.userInputOnCurrentLine = ''
            clearUserInput()
        }
    }

    static initialize(paragraph: Paragraph) {
        paragraph.getLines(60).forEach(line => {
            this.displayedLines.push(line)
        })
        this.isInitialized = true
    }
}

const TypingStore = writable({
    lineManager: LineManager
})

export default TypingStore