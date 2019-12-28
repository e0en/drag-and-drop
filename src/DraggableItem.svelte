<script>
import { createEventDispatcher } from 'svelte'

export let itemId
export let isSelected = false

const dispatch = createEventDispatcher()

function mousedown_handler (ev) {
    dispatch('selectItem', {itemId: itemId})
}

function mouseup_handler (ev) {
    isSelected = false
}

</script>

<div class:selected="{isSelected}"
    on:mousedown={mousedown_handler}
    on:mouseup={mouseup_handler}>
    Card {itemId} {isSelected}
</div>

<style>
    div {
        box-sizing: border-box;
        border: 1px solid black;
        margin: 1em;
        padding: 1em;
    }

    .selected {
        border: 2px solid red;
    }
</style>
