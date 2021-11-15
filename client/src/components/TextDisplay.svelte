<script lang="ts">
    import {Paragraph} from "../models/Paragraph.ts"

    const returnKey = '\u23CE'
    export let sourceText: string = ''

    let lineLength = 40
    let numberOfLines = 10

    let paragraph = new Paragraph('So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up', 30)

    let pulseSuspensionTimer = 3_000
    let isCursorPulsating = true

    let correctlyWritten: string = ''
    let currentCharacter: string = sourceText[0]
    let mistake: string = ''
    let remaining: string = sourceText.substring(1, sourceText.length - 1)

    let userLines: string[] = []
    let userInput: string = ''

    function updateInput() {
        if (userInput.length === sourceText.length) userInput = userInput.substring(0, userInput.length - 1)
        correctlyWritten = userInput
        currentCharacter = sourceText[userInput.length]
        remaining = sourceText.substring(userInput.length + 1, sourceText.length - 1)
        if (userInput.length % 10 === 0) {
            userLines.push(userInput.substring(userInput.length - 10, userInput.length - 1))
            console.log(userLines)
        }
    }

    function reset() {
        userInput = ''
        correctlyWritten = ''
        currentCharacter = sourceText[0]
        mistake = ''
        remaining = sourceText.substring(1, sourceText.length - 1)
    }

    function suspensePulse() {
        isCursorPulsating = false
    }

</script>

<style type="text/scss">
    $source-text-size: 30px;
    $cursor-background-color: #575757;

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
        color: red;
        font-size: $source-text-size;
    }

    .remaining-text {
        color: #d2d2d2;
        font-size: $source-text-size;
    }

    #user-input {
        height: 0;
        width: 0;
        border: none;

        &:focus {
            border: 0 none white;
        }
    }

    #text-source {
        background-color: #333333;
        font-size: 0;
        padding: 20px;

        span {
            white-space: pre-wrap;
        }
    }

    .pulse {
        animation-name: color;
        animation-duration: 2s;
        animation-iteration-count: infinite;
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

<label id="text-source" for="user-input">
  <span class="correct">
    {correctlyWritten}
  </span>
  <span class="incorrect">
    {mistake}
  </span>
  <span class="current {isCursorPulsating ? 'pulse' : ''}">
    {currentCharacter}
  </span>
  <span class="remaining-text">
    {remaining + returnKey}
  </span>
</label>

<input id="user-input" bind:value={userInput} on:input={updateInput}>