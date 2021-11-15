<script lang="ts">

</script>

<style type="text/scss">
    @import "src/sass/main";

    .container {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 2rem;
        margin-bottom: 1rem;

        div {
            height: 10rem;
            background-color: $color-background-dark;
        }

        &__speed {
        }

        &__time {
        }

        &__progress {
        }
    }
</style>

<div class="container">
  <div class="container__speed">speed</div>
  <div class="container__time">time</div>
  <div class="container__progress">progress</div>
</div>