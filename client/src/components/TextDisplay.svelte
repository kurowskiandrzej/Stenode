<script lang="ts">
    import {Paragraph} from "../models/Paragraph.ts"
    import Line from "./LineDisplay.svelte"
    import TypingStore from "../stores/TypingStore.ts"

    const returnKey = '\u23CE'
    export let sourceText: string = ''

    let isInitialized: boolean = false

    let lineLength = 20
    let numberOfLines = 6

    let paragraph = new Paragraph('So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up', lineLength)

    let userInput: string = ''

    TypingStore.subscribe(it => {
        isInitialized = it.lineManager.isInitialized
    })

    function inputKeyListener(event) {
   		if (event.keyCode === 8) {
   		    if (userInput.length === 0) {
   		        TypingStore.update(it => {
   		            it.lineManager.goToPreviousLine(resetInputToPreviousLine)
                  return it
              })
          }
      }
   	}

   	function resetInputToPreviousLine(previousLine: string) {
        userInput = previousLine
    }

    function updateInput() {
        TypingStore.update(it => {
            it.lineManager.updateUserInput(userInput, clearUserInput)
            return it
        })
    }

    function clearUserInput() {
        userInput = ''
    }

    function initialize() {
        TypingStore.update(it => {
            it.lineManager.initialize(paragraph)
            return it
        })
    }

</script>

<style type="text/scss">
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
        overflow: auto;
    }


</style>

<label id="text-source" for="user-input">
  {#if isInitialized}
    {#each Array(numberOfLines) as _, index}
      <Line isFirst={false} addSeparator={false} addBreakLineSign={false} lineIndex={index}/>
    {/each}
  {/if}
</label>

<input id="user-input" bind:value={userInput} on:input={updateInput} on:keydown={inputKeyListener}>
<button on:click={initialize}>Initialize</button>