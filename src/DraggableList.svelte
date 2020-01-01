<script>
import { onMount } from 'svelte'

export let count

let items = []
let selectedItemIdx = null
let clickY = null

onMount(async () => {
  items = [...Array(parseInt(count)).keys()].map(function(i) {
    return { itemId: i + 1, isSelected: false, yDrag: 0 }
  })
})

function handleMouseUp(ev) {
  for (var i = 0; i < items.length; i++) {
    items[i].isSelected = false
    items[i].yDrag = 0
  }
  selectedItemIdx = null
}

function handleMouseMove(ev) {
  if (!(selectedItemIdx === null)) {
    items[selectedItemIdx].yDrag = ev.clientY - clickY
  }
}

function handleMouseDown (ev) {
  selectedItemIdx = [...this.parentElement.children].indexOf(this)
  items[selectedItemIdx].isSelected = true
  clickY = ev.clientY

  const oldStyle = window.getComputedStyle(this)
  this.style.width = oldStyle.getPropertyValue('width')
  this.style.height = oldStyle.getPropertyValue('height')
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


<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<section>
{#each items as item}
<div class:selected={item.isSelected} on:mousedown={handleMouseDown} style="transform: translate(0px, {item.yDrag}px);">
   Card {item.itemId}
  </div>
{/each}
</section>
