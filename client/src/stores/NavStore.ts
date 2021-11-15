import {writable} from 'svelte/store'
import Typing from '../pages/Typing.svelte'

const NavStore = writable({
    currentPage: Typing
})

export default NavStore