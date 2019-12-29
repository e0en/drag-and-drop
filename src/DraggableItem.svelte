<script>
import { createEventDispatcher } from "svelte"

export let itemId
export let isSelected = false
export let xDrag = 0
export let yDrag = 0

const dispatch = createEventDispatcher()
let elem

function mousedown_handler (ev) {
  const oldStyle = window.getComputedStyle(elem)
  elem.style.width = oldStyle.getPropertyValue('width')
  elem.style.height = oldStyle.getPropertyValue('height')
  const msg = {
    itemId: itemId,
    clickX: ev.clientX,
    clickY: ev.clientY
  }
  dispatch("selectItem", msg)
}
</script>

<style>
  div {
    transition-duration: 0.2s;
    box-sizing: border-box;
    border: 1px solid black;
    margin: 1em 0;
    padding: 1em;
    user-select: none;
    background: white;
  }
  .selected {
    position: fixed;
    margin: 0;
    transition-duration: 0s;
    z-index: 9999;
    background: yellow;
  }
</style>

<div
  class:selected={isSelected}
   on:mousedown={mousedown_handler}
   style="transform: translate({xDrag}px, {yDrag}px);"
   bind:this={elem}
   >
   Card {itemId}
</div>
