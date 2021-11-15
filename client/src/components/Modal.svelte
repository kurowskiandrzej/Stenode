<script lang="ts">
    let isShown: boolean = false

    export function show() {
        isShown = true
    }

    export function hide() {
        isShown = false
    }
</script>

<style type="text/scss">
    @import "../sass/main";

    .modal-wrapper {
        background-color: rgba(0, 0, 0, .2);
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
    }

    .modal {
        background-color: $color-background-primary;
        max-width: 50vh;
        padding: 1rem;
        margin: 15% auto;
    }


</style>

<svelte:window on:keydown={e => {if (e.code === 27) {hide()}}} />

{#if isShown}
  <div class="modal-wrapper">
    <div class="modal">
      <slot/>
    </div>
  </div>
{/if}