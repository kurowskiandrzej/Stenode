<script lang="ts">
    import {Paragraph} from "../models/Paragraph.ts"
    import Line from "./LineDisplay.svelte"
    import TypingStore from "../stores/TypingStore.ts"

    const returnKey = '\u23CE'
    export let sourceText: string = ''

    let isInitialized: boolean = false

    let numberOfLines = 12

    let paragraphText = 'I am forced into speech because men of science have refused to follow my advice without knowing why. It is altogether against my will that I tell my reasons for opposing this contemplated invasion of the antarctic-with its vast fossil-hunt and its wholesale boring and melting of the ancient ice-cap-and I am the more reluctant because my warning may be in vain. Doubt of the real facts, as I must reveal them, is inevitable; yet if I suppressed what will seem extravagant and incredible there would be nothing left. The hitherto withheld photographs, both ordinary and aërial, will count in my favour; for they are damnably vivid and graphic. Still, they will be doubted because of the great lengths to which clever fakery can be carried. The ink drawings, of course, will be jeered at as obvious impostures; notwithstanding a strangeness of technique which art experts ought to remark and puzzle over.'
    let paragraph = new Paragraph(paragraphText)

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