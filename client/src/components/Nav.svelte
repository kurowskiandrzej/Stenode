<script lang="ts">
    import router from 'page'
    import Home from '../pages/Home.svelte'
    import Typing from '../pages/Typing.svelte'
    import NavStore from '../stores/NavStore.ts'


    router('/', () => navigateTo(Typing))
    router('/Stenode', () => navigateTo(Typing))

    router.start()

    function navigateTo(page) {
        NavStore.update(data => {
            data.currentPage = page
            return data
        })
    }

    function logout() {
        fetch('/api/logout').then(res => {
            if (!res.ok) {
                throw new Error("Failed")
            }
            // prevents from accessing login only content while logged off
            history.replaceState({}, '', '/')
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }


    function openDropdownMenu() {
        isDropDownOpen = true
    }

    function closeDropdownMenu() {
        isDropDownOpen = false
    }

    let isDropDownOpen = false

</script>

<style type="text/scss">
    @import "../sass/main";

    $navbar-bottom-margin: 2rem;

    nav {
        @include non-selectable;
        background-color: $color-background-dark;
        box-shadow: $ui-element-shadow;
        font-size: 2.4rem;
        display: flex;
        padding-top: .3rem;
        padding-bottom: .3rem;
        margin-bottom: $navbar-bottom-margin;

        &__title {
            text-transform: uppercase;
        }
    }

    nav a {
        color: $color-text-light;
        padding: .5rem;
        margin-right: .5rem;
        cursor: pointer;
        border: none;
        position: relative;
        overflow: hidden;


        /* Animation related */
        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: .1rem;
            background-color: $color-text-light;
            transition: all .5s;
        }

        &:after {
            content: "";
            position: absolute;
            bottom: 0;
            right: -100%;
            width: 100%;
            height: .1rem;
            background-color: $color-text-light;
            transition: all .5s;
        }

        span:before {
            content: "";
            position: absolute;
            top: -100%;
            right: 0;
            width: .1rem;
            height: 100%;
            background-color: $color-text-light;
            transition: all .5s;
        }

        span:after {
            content: "";
            position: absolute;
            bottom: -100%;
            left: 0;
            width: .1rem;
            height: 100%;
            background-color: $color-text-light;
            transition: all .5s;
        }

        &:hover {
            &:before {
                left: 0;
            }

            &:after {
                right: 0;
            }

            span:before {
                top: 0;
            }

            span:after {
                bottom: 0;
            }
        }

        /* Special cases */
        &:first-child {
            letter-spacing: .4rem;
            margin-left: $page-horizontal-margin;
        }

        &:last-child {
            margin-right: $page-horizontal-margin;
            margin-left: auto;
            position: relative;
        }

        &:nth-child(2) {
            border: none;
            cursor: default;
            pointer-events: none;
        }
    }

    .dropdown-content {
        position: absolute;
        background-color: $color-background-primary;
        color: $color-text-dark;
        text-align: left;

        right: -.2rem;
        top: 4.1rem;
        min-width: 16rem;
        box-shadow: $ui-element-shadow;
        z-index: 1;

        padding-left: .2rem;
        padding-right: .2rem;

        button {
            box-shadow: none;
        }
    }

</style>

<nav>
  <a href="/">STENODE<span></span></a>
  <a>|<span></span></a>
  <a href="/typing">Type<span></span></a>
  <a>Account<span></span>
    <div class="dropdown-content">
      {#if isDropDownOpen}
        <div>test</div>
        <div>test</div>
        <div>
          <button class="btn--negative">Log out</button>
        </div>
      {/if}
    </div>
  </a>
</nav>
<!--  <div
    class="navbar__account-tab"
    on:mouseenter={openDropdownMenu}
    on:mouseleave={closeDropdownMenu}
  >
    Account
    <div class="navbar__dropdown-content">
      {#if isDropDownOpen}
        <div>test</div>
        <div>test</div>
        <div>
          <button on:click={logout}>Log out</button>
        </div>
      {/if}
    </div>
  </div>-->