<script>
import { onMount } from 'svelte'
import DraggableItem from "./DraggableItem.svelte"

export let count

let items = []

onMount(async () => {
  items = [...Array(parseInt(count)).keys()].map(function(i) {
    return { itemId: i + 1, isSelected: false }
  })
})

function handleSelect(ev) {
  for (var i = 0; i < items.length; i++) {
    items[i].isSelected = items[i].itemId == ev.detail.itemId
  }
}

function handleMouseUp(ev) {
  for (var i = 0; i < items.length; i++) {
    items[i].isSelected = false
  }
}
</script>

<style>
</style>

<svelte:window on:mouseup={handleMouseUp} />

<section>
  {#each items as item}
    <DraggableItem
      itemId={item.itemId}
      isSelected={item.isSelected}
      on:selectItem={handleSelect} />
  {/each}
</section>
