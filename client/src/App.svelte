<script lang="ts">
    import Nav from './components/Nav.svelte'
    import NavStore from './stores/NavStore.ts'
    import Typing from './pages/Typing.svelte'

    let page = Typing
    NavStore.subscribe(it => {
        page = it.currentPage
    })

</script>

<style type="text/scss">
    $app-margin: 30rem;

    .wrapper {
        margin-left: $app-margin;
        margin-right: $app-margin;
    }
</style>

<Nav />
<div class="wrapper">
  <svelte:component this="{page}"/>
</div>
