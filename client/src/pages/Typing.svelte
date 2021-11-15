<script lang="ts">
    import Dashboard from "../components/Dashboard.svelte"

    const returnKey = '\u23CE'
    const sourceText: string = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”

    So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

    There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.

    In another moment down went Alice after it, never once considering how in the world she was to get out again.

    The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.

    Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled “ORANGE MARMALADE”, but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody underneath, so managed to put it into one of the cupboards as she fell past it.`

    let pulseSuspensionTimer = 3_000
    let isCursorPulsating = true

    let correctlyWritten: string = ''
    let currentCharacter: string = sourceText[0]
    let mistake: string = ''
    let remaining: string = sourceText.substring(1, sourceText.length - 1)

    let userInput: string = ''

    let isSourceTextJustified: boolean = false

    function updateInput() {
        if (userInput.length === sourceText.length) userInput = userInput.substring(0, userInput.length - 1)
        correctlyWritten = userInput
        currentCharacter = sourceText[userInput.length]
        remaining = sourceText.substring(userInput.length + 1, sourceText.length - 1)
    }

    function reset() {
        userInput = ''
        correctlyWritten = ''
        currentCharacter = sourceText[0]
        mistake = ''
        remaining = sourceText.substring(1, sourceText.length - 1)
    }

    function toggleJustifyOnSourceText() {
        isSourceTextJustified = !isSourceTextJustified
        console.log(isSourceTextJustified)
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

    .justified {
        text-align: justify;
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


<Dashboard />
<label id="text-source" for="user-input" class="{isSourceTextJustified ? 'justified' : ''}">
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
<input type="checkbox" id="justify-source-text" checked={isSourceTextJustified} on:click|preventDefault={toggleJustifyOnSourceText}>
<button on:click={reset}>RESET</button>