<script>
  import DraggableItem from "./DraggableItem.svelte"

  export let count

  // a dummy data
  const items = [...Array(count).keys()].map(function(i) {
    return { itemId: i + 1, isSelected: false }
  });

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
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main on:mouseup={handleMouseUp}>
  <h1>Drag and drop test</h1>
  <section>
    {#each items as item}
      <DraggableItem
        itemId={item.itemId}
        isSelected={item.isSelected}
        on:selectItem={handleSelect} />
    {/each}
  </section>
</main>
