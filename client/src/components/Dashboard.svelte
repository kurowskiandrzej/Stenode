<script lang="ts">

</script>

<style type="text/scss">
    .container {
        display: grid;
        grid-template-columns: repeat(3, auto);

        &__speed {
            border: #4285f4 solid 2px;
        }

        &__time {
            border: green solid 3px;
        }

        &__progress {
            border: pink dashed 3px;
        }
    }
</style>

<div class="container">
  <div class="container__speed">speed</div>
  <div class="container__time">time</div>
  <div class="container__progress">progress</div>
</div>