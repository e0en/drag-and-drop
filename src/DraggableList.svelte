<script>
import { onMount } from 'svelte'
import DraggableItem from "./DraggableItem.svelte"

export let count

let items = []
let selectedItemIdx = null
let clickY = null

onMount(async () => {
  items = [...Array(parseInt(count)).keys()].map(function(i) {
    return { itemId: i + 1, isSelected: false, yDrag: 0 }
  })
})

function handleSelect(ev) {
  const chosenItemId = ev.detail.itemId
  for (var i = 0; i < items.length; i++) {
    if (items[i].itemId == chosenItemId) {
      items[i].isSelected = true
      selectedItemIdx = i
      clickY = ev.detail.clickY
    }
  }
}

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
</script>

<style>
</style>

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<section>
  {#each items as item}
    <DraggableItem
      itemId={item.itemId}
      isSelected={item.isSelected}
      yDrag={item.yDrag}
      on:selectItem={handleSelect} />
  {/each}
</section>
