<script lang="ts">
    import {Constants} from "../utils/Constants.ts"
    import TypingStore from "../stores/TypingStore.ts"

    export let isFirst: boolean = false
    export let isCurrentLine: boolean = false
    export let addSeparator: boolean = false
    export let addBreakLineSign: boolean = false
    export let lineIndex: number = 0
    export let userInput: string = ''

    let isLineInitialized: boolean = false

    let lineText: string = ''
    let correctlyWritten: string = ''
    let currentCharacter: string = ''
    let mistake: string = ''
    let remainingText: string = ''

    let currentLineIndex: number = 0

    TypingStore.subscribe(it => {
        currentLineIndex = it.lineManager.currentLineIndex
        lineText = it.lineManager.getDisplayedLineBYIndex(lineIndex)
        if (!isLineInitialized) {
            remainingText = it.lineManager.getDisplayedLineBYIndex(lineIndex)
            isLineInitialized = true
        }

        userInput = it.lineManager.userInputOnCurrentLine
        currentLineIndex = it.lineManager.currentLineIndex
        processInput()
    })


    let cursorPulseSuspensionTimer = 3_000
    let isCursorPulsating = true

    function processInput() {
        if (currentLineIndex === lineIndex) {
            currentCharacter = lineText.substring(userInput.length, userInput.length + 1)
            remainingText = lineText.substring(userInput.length + 1, lineText.length)
            searchForMistakes()
        }
    }

    function searchForMistakes() {
        let mistakeIndex: number | null = null
        for (const i in userInput) {
            if (userInput[i] !== lineText[i]) {
                mistakeIndex = parseInt(i)
                break
            } else {
                mistakeIndex = null
                mistake = ''
            }
        }

        if (mistakeIndex === null) {
            correctlyWritten = lineText.substring(0, userInput.length)
            mistake = ''
        } else {
            correctlyWritten = lineText.substring(0, mistakeIndex)
            mistake = lineText.substring(mistakeIndex, userInput.length)
            console.log('mistake: ' + mistake)
        }
    }

    function suspensePulse() {
        isCursorPulsating = false
    }


</script>

<style type="text/scss">
    @import "src/sass/main";

    $source-text-size: 30px;
    $cursor-background-color: #575757;

    .line {
        /* @include non-selectable;*/
        white-space: pre;
    }

    .pulse {
        animation-name: color;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    .current {
        color: white;
        background-color: $cursor-background-color;
        border-radius: 6px;
        font-size: $source-text-size;
    }

    .correct {
        color: greenyellow;
        font-size: $source-text-size;
    }

    .incorrect {
        color: rgb(255, 0, 0);
        background-color: rgba(217, 103, 103, 0.29);
        font-size: $source-text-size;
        border-radius: 6px;
    }

    .remaining-text {
        color: #d2d2d2;
        font-size: $source-text-size;
    }

    .tabulator {
        &::before {
            content: 'tab';
            color: #4285f4;
            font-size: $source-text-size;
        }
    }

    .end-line-space {
        &::after {
            background-color: $cursor-background-color;
            border-radius: 6px;
            font-size: $source-text-size;

            color: transparent;
            content: '_';
            animation-name: color;
            animation-duration: 2s;
            animation-iteration-count: infinite;
        }
    }

    @keyframes color {
        0% {
            background-color: $cursor-background-color;
        }
        50% {
            background-color: #4285f4;
        }
        100% {
            background-color: $cursor-background-color;
        }
    }

</style>

<div class="line {isFirst ? 'tabulator' : ''}">

  <span class="correct">{correctlyWritten}</span>

  <span class="incorrect">{mistake}</span>

  {#if currentLineIndex === lineIndex}
    <span class="current {isCursorPulsating ? 'pulse' : ''}">{currentCharacter}</span>
  {:else if currentLineIndex !== lineIndex && currentCharacter.length > 0}
    <!--In case of going back to previous line - this prevents from disappearing of first letter-->
    <span class="remaining-text">{currentCharacter}</span>
  {/if}

  <span
    class="remaining-text {userInput.length === lineText.length && currentLineIndex === lineIndex ? 'end-line-space' : ''}">{remainingText}</span>
  <!--  {addBreakLineSign ? Constants.returnKey : ''}

      {#if addSeparator}
        <div class="special-sign">
          <br><br>
        </div>
      {/if}-->


</div>



